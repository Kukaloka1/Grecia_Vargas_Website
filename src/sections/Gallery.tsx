// src/sections/Gallery.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import SmartImage from '@/components/SmartImage';
import { preloadImages, predecodeImages, DEFAULT_SIZES } from '@/lib/images';
import type { CSSProperties } from 'react'; // ✅ Agregado pa typing estricto de style

const IMAGES = Array.from({ length: 16 }, (_, i) => `/images/gallery/ph-${i + 1}.webp`);

export default function Gallery() {
  const images = useMemo(() => IMAGES, []);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState<Set<number>>(new Set());

  // Preload + pre-decode de TODAS agresivamente (pa que estén listas y decodificadas antes de scrollear)
  useEffect(() => {
    const cleanup = preloadImages(images, 16); // Alta concurrency pa todo rápido
    predecodeImages(images, 'high'); // Cambié a 'high' si tu lib lo soporta (mejor calidad y menos jank en decodificación)
    return cleanup;
  }, [images]);

  // Solo usamos observer para fade-in elegante (una vez por imagen)
  // Pinning GPU lo aplicamos SIEMPRE a todas desde el inicio (evita cualquier jank en scrolls rápidos/lentos)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setAnimated((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            const idxAttr = el.getAttribute('data-index');
            if (!idxAttr) continue;
            const idx = Number(idxAttr);
            if (!Number.isFinite(idx)) continue;
            if (next.has(idx)) continue;
            next.add(idx);
          }
          return next;
        });
        // Unobserve pa no re-trigger
        for (const entry of entries) {
          if (entry.isIntersecting) io.unobserve(entry.target);
        }
      },
      { 
        root: null, 
        threshold: 0.1, // Bajé a 0.1 pa trigger más temprano (menos chance de skip en scroll rápido)
        rootMargin: '100px' // Anticipa 100px antes de entrar en vista pa animar proactivamente
      }
    );

    itemRefs.current.forEach((el) => el && io.observe(el));

    return () => io.disconnect();
  }, []);

  // Estilo GPU pinning FIJO para TODAS las imágenes (suaves forever, sin condicionales en scroll)
  // ✅ Typing estricto con CSSProperties pa evitar TS error en backfaceVisibility (debe ser 'hidden' literal, no string genérico)
  const gpuPinStyle: CSSProperties = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
  };

  return (
    <section id="gallery" className="section">
      <Container>
        <SectionTitle
          title="Gallery"
          subtitle="A glimpse de plates, table styling and ambience."
        />

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => {
            const priority = i < 4 ? 'high' : 'auto';
            const animate = animated.has(i);

            return (
              <div
                key={src}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                className={`aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 transition-all duration-700 ease-out
                  ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <SmartImage
                  src={src}
                  alt={`Grecia Vargas · gallery ${i + 1}`}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-opacity duration-700 ease-out" // Agregué transición suave extra en la imagen misma
                  eager={true}
                  priority={priority}
                  sizes={DEFAULT_SIZES}
                  draggable={false}
                  // Pinning SIEMPRE activo (no condicional) pa zero jank en scrolls rápidos
                  style={gpuPinStyle}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}







