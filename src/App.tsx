import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import DeferSection from './components/DeferSection';

export default function App() {
  const aosCleanupRef = useRef<(() => void) | null>(null);
  const prefetchTimeoutRef = useRef<number | null>(null); // Cambiado de NodeJS.Timeout a number

  // Inicializa AOS con limpieza
  useEffect(() => {
    let mounted = true;

    const init = () => {
      import('./lib/aos')
        .then((m) => {
          if (mounted) {
            aosCleanupRef.current = m.initAOS('smart');
          }
        })
        .catch((err) => {
          console.warn('Error inicializando AOS:', err);
        });
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(init, { timeout: 1500 });
      return () => {
        mounted = false;
        window.cancelIdleCallback(idleId);
        aosCleanupRef.current?.();
      };
    } else {
      const t = setTimeout(init, 600);
      return () => {
        mounted = false;
        clearTimeout(t);
        aosCleanupRef.current?.();
      };
    }
  }, []);

  // Prefetching optimizado
  useEffect(() => {
    const importers = [
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
        importers[i++]().catch((err) => console.warn(`Error prefetching sección ${i}:`, err));
        prefetchTimeoutRef.current = setTimeout(step, 300); // Aumentado para menos presión
      };
      step();
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(run, { timeout: 2500 }); // Aumentado
      return () => {
        window.cancelIdleCallback(idleId);
        if (prefetchTimeoutRef.current) {
          clearTimeout(prefetchTimeoutRef.current);
        }
      };
    } else {
      const t = setTimeout(run, 1000); // Aumentado
      return () => {
        clearTimeout(t);
        if (prefetchTimeoutRef.current) {
          clearTimeout(t);
        }
      };
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <DeferSection loader={() => import('./sections/About')} minHeight="80vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/Experiences')} minHeight="80vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/SampleMenu')} minHeight="70vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/HowItWorks')} minHeight="70vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/Services')} minHeight="80vh" rootMargin="500px 0px" />
        <DeferSection loader={() => import('./sections/Gallery')} minHeight="80vh" rootMargin="600px 0px" />
        <DeferSection loader={() => import('./sections/CTA')} minHeight="50vh" rootMargin="500px 0px" />
      </main>
      <DeferSection loader={() => import('./sections/Footer')} minHeight="320px" rootMargin="500px 0px" />
    </>
  );
}