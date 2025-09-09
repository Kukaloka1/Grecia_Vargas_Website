import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import DeferSection from './components/DeferSection';
import { enableSmoothAnchors } from './lib/scroll';

export default function App() {
  // Cleanup de AOS devuelto por initAOS()
  const aosCleanupRef = useRef<(() => void) | null>(null);
  // Handler del setTimeout de prefetch (compatible node/browser)
  const prefetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inicializa AOS con limpieza y fallback de idle
  useEffect(() => {
    let mounted = true;
    let idleId: number | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const init = () => {
      import('./lib/aos')
        .then(({ initAOS }) => {
          if (!mounted) return;
          // ✅ initAOS devuelve () => void y acepta 'smart'
          aosCleanupRef.current = initAOS('smart');
        })
        .catch((err) => {
          console.warn('Error inicializando AOS:', err);
        });
    };

    const w = window as any;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(init, { timeout: 1500 });
    } else {
      timerId = setTimeout(init, 600);
    }

    return () => {
      mounted = false;
      if (idleId !== null && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
      aosCleanupRef.current?.();
      aosCleanupRef.current = null;
    };
  }, []);

  // Inicializa smooth scrolling (devuelve cleanup)
  useEffect(() => {
    const cleanup = enableSmoothAnchors();
    return cleanup;
  }, []);

  // Prefetching optimizado (conexiones lentas -> omitir)
  useEffect(() => {
    const importers: Array<() => Promise<unknown>> = [
      () => import('./sections/About'),
      () => import('./sections/Experiences'),
      () => import('./sections/SampleMenu'),
      () => import('./sections/HowItWorks'),
      () => import('./sections/Services'),
      () => import('./sections/Gallery'),
      () => import('./sections/CTA'),
      () => import('./sections/Footer'),
    ];

    const isSlow =
      (navigator as any).connection?.saveData ||
      ['2g', 'slow-2g'].includes((navigator as any).connection?.effectiveType);

    const run = () => {
      if (isSlow) {
        console.log('Prefetching omitido por conexión lenta');
        return;
      }
      let i = 0;
      const step = () => {
        if (i >= importers.length) return;
        importers[i++]().catch((err) =>
          console.warn(`Error prefetching sección ${i}:`, err)
        );
        prefetchTimeoutRef.current = setTimeout(step, 300);
      };
      step();
    };

    const w = window as any;
    let idleId: number | null = null;
    let bootTimeout: ReturnType<typeof setTimeout> | null = null;

    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(run, { timeout: 2500 });
    } else {
      bootTimeout = setTimeout(run, 1000);
    }

    return () => {
      if (idleId !== null && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId);
      }
      if (bootTimeout) clearTimeout(bootTimeout);
      if (prefetchTimeoutRef.current) {
        clearTimeout(prefetchTimeoutRef.current);
        prefetchTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <DeferSection loader={() => import('./sections/About')}         minHeight="80vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/Experiences')}   minHeight="80vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/SampleMenu')}    minHeight="70vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/HowItWorks')}    minHeight="70vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/Services')}      minHeight="80vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/Gallery')}       minHeight="80vh" rootMargin="600px 0px" />
        <DeferSection loader={() => import('./sections/CTA')}           minHeight="50vh" rootMargin="500px 0px" />
      </main>
      <DeferSection loader={() => import('./sections/Footer')} minHeight="320px" rootMargin="500px 0px" />
    </>
  );
}
