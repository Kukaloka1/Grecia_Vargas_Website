// src/App.tsx
import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './sections/Hero'
import DeferSection from './components/DeferSection'

export default function App() {
  // Inicializa AOS en idle, pero en modo “smart”
  useEffect(() => {
    const init = () => {
      import('./lib/aos')
        .then((m) => m.initAOS('smart')) // ⬅️ aquí el cambio
        .catch(() => {})
    }
    if ((window as any).requestIdleCallback) {
      ;(window as any).requestIdleCallback(init, { timeout: 1200 })
    } else {
      const t = setTimeout(init, 500)
      return () => clearTimeout(t)
    }
  }, [])

  // Prefetch extra y ordenado de secciones (código), sin bloquear
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
    ]
    const isSlow =
      (navigator as any).connection?.saveData ||
      (navigator as any).connection?.effectiveType === '2g' ||
      (navigator as any).connection?.effectiveType === 'slow-2g'

    const run = () => {
      if (isSlow) return
      // Prefetch secuencial con pequeñas pausas para no saturar
      let i = 0
      const step = () => {
        importers[i++]?.().catch(() => {})
        if (i < importers.length) setTimeout(step, 140)
      }
      step()
    }

    if ((window as any).requestIdleCallback) {
      ;(window as any).requestIdleCallback(run, { timeout: 2000 })
    } else {
      const t = setTimeout(run, 800)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Secciones diferidas con altura de reserva para evitar “jumps” */}
        <DeferSection loader={() => import('./sections/About')} minHeight="80vh" />
        <DeferSection loader={() => import('./sections/Experiences')} minHeight="80vh" />
        <DeferSection loader={() => import('./sections/SampleMenu')} minHeight="70vh" />
        <DeferSection loader={() => import('./sections/HowItWorks')} minHeight="70vh" />
        <DeferSection loader={() => import('./sections/Services')} minHeight="80vh" />
        <DeferSection loader={() => import('./sections/Gallery')} minHeight="80vh" />
        <DeferSection loader={() => import('./sections/CTA')} minHeight="50vh" />
      </main>

      {/* El Footer también diferido (entra cuando te acercas al final) */}
      <DeferSection loader={() => import('./sections/Footer')} minHeight="320px" />
    </>
  )
}
