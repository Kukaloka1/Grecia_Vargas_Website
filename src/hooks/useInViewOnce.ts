import { useEffect, useRef, useState } from 'react'

export function useInViewOnce<T extends HTMLElement>(
  opts?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeta usuarios que piden menos movimiento
    if (typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    // Observa una vez y desuscribe
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.unobserve(entry.target)
          io.disconnect()
        }
      },
      { root: null, threshold: 0.1, rootMargin: '0px 0px -10% 0px', ...opts }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [opts])

  return { ref, inView }
}
