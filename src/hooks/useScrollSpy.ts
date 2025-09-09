// src/hooks/useScrollSpy.ts
import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], offset = 0){
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (sections.length === 0) return

    // Check inicial robusto al load para forzar active (arregla delay en refresh)
    const checkInitial = () => {
      const scrollPos = window.scrollY
      const visible = sections.find(s => {
        const rect = s.getBoundingClientRect()
        const top = rect.top + scrollPos - offset
        const bottom = rect.bottom + scrollPos - offset
        return top <= 0 && bottom >= 0 // Sección visible en viewport
      })
      if (visible?.id) setActive(visible.id)
    }

    // Forzar check inicial después de mount
    setTimeout(checkInitial, 100) // Aumentado a 100ms para estabilidad

    // Observer para cambios en scroll
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        root: null,
        rootMargin: `-${Math.max(0, offset)}px 0px -50% 0px`,
        threshold: [0, 0.1, 0.5, 1], // Threshold simple para respuesta inmediata
      }
    )

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [ids, offset])

  return active
}