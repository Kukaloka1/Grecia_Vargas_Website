// src/hooks/useScrollSpy.ts
import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], offset = 0){
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (sections.length === 0) return

    // Observa SIN desmontar nada. Marca la sección más visible.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        root: null,
        // Compensa el header fijo para que el activo coincida con lo que ves
        rootMargin: `-${Math.max(0, offset)}px 0px -55% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [ids, offset])

  return active
}
