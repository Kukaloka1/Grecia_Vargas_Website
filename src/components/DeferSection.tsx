import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';

type DeferSectionProps<P = any> = {
  loader: () => Promise<{ default: React.ComponentType<P> }>;
  props?: P;
  minHeight?: string;
  rootMargin?: string;
  className?: string;
};

export default function DeferSection<P>({
  loader,
  props: compProps,
  minHeight = '60vh',
  rootMargin = '400px 0px',
  className = '',
}: DeferSectionProps<P>) {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const idleCallbackRef = useRef<number | null>(null); // Tipado explícito

  // Lazy component
  const LazyComp = useMemo(() => React.lazy(loader), [loader]);

  // Prefetching optimizado
  useEffect(() => {
    let mounted = true;

    const isSlow =
      (navigator as any).connection?.saveData ||
      ['2g', 'slow-2g'].includes((navigator as any).connection?.effectiveType);

    const run = () => {
      if (!mounted || isSlow) {
        if (isSlow) console.log('Prefetching omitido por conexión lenta');
        return;
      }
      loader().catch((err) => console.warn('Error prefetching sección:', err));
    };

    if ('requestIdleCallback' in window) {
      idleCallbackRef.current = window.requestIdleCallback(run, { timeout: 1500 });
    } else {
      idleCallbackRef.current = setTimeout(run, 600); // Eliminamos window. porque setTimeout está en el ámbito global
    }

    return () => {
      mounted = false;
      if (idleCallbackRef.current !== null) {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleCallbackRef.current);
        } else {
          clearTimeout(idleCallbackRef.current);
        }
      }
    };
  }, [loader]);

  // IntersectionObserver para montar la sección
  useEffect(() => {
    if (visible || !holderRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Cargando sección:', loader.toString());
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.1 }
    );

    io.observe(holderRef.current);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  // Placeholder
  if (!visible) {
    return (
      <div
        ref={holderRef}
        className={['w-full', className].join(' ')}
        style={{ minHeight, contain: 'layout' }}
        aria-hidden
      />
    );
  }

  // Fallback con skeleton visual
  return (
    <Suspense
      fallback={
        <div
          className={['w-full animate-pulse bg-neutral-100 dark:bg-neutral-900', className].join(' ')}
          style={{ minHeight }}
          aria-hidden
        />
      }
    >
      <LazyComp {...((compProps as any) || {})} />
    </Suspense>
  );
}