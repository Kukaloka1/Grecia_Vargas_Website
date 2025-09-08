import { useEffect, useMemo } from 'react'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

const IMAGES = Array.from({ length: 16 }, (_, i) => `/images/gallery/ph-${i + 1}.webp`)

export default function Gallery(){
  // Preload educado para acelerar el primer pintado (sin lazy)
  const images = useMemo(() => IMAGES, [])
  useEffect(() => {
    const links = images.map(src => {
      const l = document.createElement('link')
      l.rel = 'preload'
      l.as = 'image'
      l.href = src
      document.head.appendChild(l)
      return l
    })
    return () => { links.forEach(l => document.head.removeChild(l)) }
  }, [images])

  return (
    <section id="gallery" className="section">
      <Container>
        <SectionTitle
          title="Gallery"
          subtitle="A glimpse of plates, table styling and ambience."
        />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <div
              key={src} /* clave estable para evitar remounts */
              className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900"
            >
              <img
                src={src}
                alt={`Grecia Vargas · gallery ${i + 1}`}
                loading="eager"          /* sin lazy */
                decoding="async"
                fetchPriority="high"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}



