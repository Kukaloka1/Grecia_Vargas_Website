// src/components/DeferSection.tsx
import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react'

type DeferSectionProps<P = any> = {
  /** Import dinámico: () => import('...') */
  loader: () => Promise<{ default: React.ComponentType<P> }>
  /** Props que van a la sección cuando se monte */
  props?: P
  /** Altura mínima del placeholder para evitar saltos de layout */
  minHeight?: string // ej. "70vh" | "50vh" | "600px"
  /** rootMargin para disparar antes de entrar al viewport */
  rootMargin?: string // ej. "200px 0px"
  /** Clase opcional para el placeholder */
  className?: string
}

export default function DeferSection<P>({
  loader,
  props: compProps,               // ⬅️ renombrado correcto
  minHeight = '60vh',
  rootMargin = '200px 0px',
  className = '',
}: DeferSectionProps<P>) {
  const holderRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  // Lazy component: no descarga el chunk hasta que se renderiza
  const LazyComp = useMemo(() => React.lazy(loader), [loader])

  // Prefetch del chunk en idle (si la conexión no es lenta)
  useEffect(() => {
    const isSlow =
      (navigator as any).connection?.saveData ||
      (navigator as any).connection?.effectiveType === '2g' ||
      (navigator as any).connection?.effectiveType === 'slow-2g'

    const run = () => { if (!isSlow) loader().catch(() => {}) }
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(run, { timeout: 1000 })
    } else {
      const t = setTimeout(run, 400)
      return () => clearTimeout(t)
    }
  }, [loader])

  // Monta la sección cuando se acerca al viewport
  useEffect(() => {
    if (visible) return
    const el = holderRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
            break
          }
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible, rootMargin])

  // Placeholder sin animaciones/transiciones
  if (!visible) {
    return (
      <div
        ref={holderRef}
        className={['w-full', className].join(' ')}
        style={{ minHeight, contain: 'layout', willChange: 'auto' as any }}
        aria-hidden
      />
    )
  }

  return (
    <Suspense
      fallback={
        <div
          className={['w-full', className].join(' ')}
          style={{ minHeight, contain: 'layout' as any }}
          aria-hidden
        />
      }
    >
      {/* spread seguro incluso si no hay props */}
      
      <LazyComp {...((compProps as any) || {})} />
    </Suspense>
  )
}
