// src/App.tsx
import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Experiences from './sections/Experiences';
import SampleMenu from './sections/SampleMenu';
import HowItWorks from './sections/HowItWorks';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import { enableSmoothAnchors } from './lib/scroll';

export default function App() {
  const aosCleanupRef = useRef<(() => void) | null>(null);

  // AOS global (simple y con cleanup)
  useEffect(() => {
    let mounted = true;
    import('./lib/aos')
      .then(({ initAOS }) => {
        if (!mounted) return;
        aosCleanupRef.current = initAOS();
      })
      .catch((err) => {
        console.warn('AOS init error:', err);
      });

    return () => {
      mounted = false;
      aosCleanupRef.current?.();
      aosCleanupRef.current = null;
    };
  }, []);

  // Smooth anchors básico
  useEffect(() => {
    return enableSmoothAnchors();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experiences />
        <SampleMenu />
        <HowItWorks />
        <Services />
        {/* Gallery SIN data-aos internamente */}
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
