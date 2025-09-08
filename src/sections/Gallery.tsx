// src/sections/Gallery.tsx
import { useEffect, useMemo, useState } from 'react'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '@/components/SmartImage'
import { calcEagerCount, preloadImages, predecodeImages, DEFAULT_SIZES } from '@/lib/images'

const IMAGES = Array.from({ length: 16 }, (_, i) => `/images/gallery/ph-${i + 1}.webp`)

export default function Gallery(){
  const images = useMemo(() => IMAGES, [])
  const [eagerCount, setEagerCount] = useState(4)

  // Ajusta eager por breakpoint (2 filas)
  useEffect(()=>{
    const update = () => setEagerCount(calcEagerCount(window.innerWidth))
    update()
    let t: number | undefined
    const onResize = () => { clearTimeout(t); t = window.setTimeout(update, 140) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t) }
  },[])

  // Preload SOLO primeras filas visibles
  useEffect(()=>{
    const cleanup = preloadImages(images.slice(0, eagerCount), 4)
    return cleanup
  }, [images, eagerCount])

  // Pre-decode en idle del resto (para que no "se monten" al volver a verlas)
  useEffect(()=>{
    predecodeImages(images.slice(eagerCount), 'low')
  }, [images, eagerCount])

  return (
    <section id="gallery" className="section">
      <Container>
        <SectionTitle title="Gallery" subtitle="A glimpse of plates, table styling and ambience." />

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => {
            const eager = i < eagerCount
            const priority = eager ? (i < 4 ? 'high' : 'auto') : 'low'
            return (
              <div
                key={src}
                className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900"
              >
                <SmartImage
                  src={src}
                  alt={`Grecia Vargas · gallery ${i + 1}`}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                  eager={eager}
                  priority={priority}
                  sizes={DEFAULT_SIZES}
                  draggable={false}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}





