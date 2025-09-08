import { useEffect, useMemo, useState, useRef } from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import SmartImage from '@/components/SmartImage';
import { calcEagerCount, DEFAULT_SIZES } from '@/lib/images';

const IMAGES = Array.from({ length: 16 }, (_, i) => `/images/gallery/ph-${i + 1}.webp`);
const PLACEHOLDER_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='; // Placeholder transparente

export default function Gallery() {
  const images = useMemo(() => IMAGES, []);
  const [eagerCount, setEagerCount] = useState(4);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null); // Referencia al contenedor de la galería

  // Ajusta eager por breakpoint con debounce
  useEffect(() => {
    const updateEagerCount = () => {
      setEagerCount(calcEagerCount(window.innerWidth));
    };

    updateEagerCount();
    let timeoutId: number | undefined;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateEagerCount, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Intersection Observer para cargar imágenes
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              console.log('Cargando imagen:', src); // Para depuración
              img.src = src;
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '300px', threshold: 0.01 }
    );

    const imageElements = galleryRef.current?.querySelectorAll('.lazy-image');
    if (imageElements) {
      imageElements.forEach((el) => {
        if (el instanceof HTMLImageElement && el.dataset.src) {
          console.log('Observando imagen:', el.dataset.src); // Para depuración
          observerRef.current?.observe(el);
        }
      });
    } else {
      console.warn('No se encontraron imágenes lazy para observar'); // Para depuración
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [eagerCount]);

  // Fallback para navegadores sin IntersectionObserver
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver no soportado, cargando todas las imágenes');
      const lazyImages = galleryRef.current?.querySelectorAll('.lazy-image');
      lazyImages?.forEach((img) => {
        if (img instanceof HTMLImageElement && img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    }
  }, [eagerCount]);

  return (
    <section id="gallery" className="section">
      <Container>
        <SectionTitle title="Gallery" subtitle="A glimpse of plates, table styling and ambience." />

        <div ref={galleryRef} className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => {
            const isEager = i < eagerCount;
            const priority = isEager ? (i < 4 ? 'high' : 'auto') : 'low';
            return (
              <div
                key={src}
                className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900"
              >
                <SmartImage
                  src={isEager ? src : PLACEHOLDER_SRC}
                  dataSrc={!isEager ? src : undefined}
                  alt={`Grecia Vargas · gallery ${i + 1}`}
                  width={800}
                  height={1000}
                  className={`h-full w-full object-cover ${!isEager ? 'lazy-image' : ''}`}
                  eager={isEager}
                  priority={priority}
                  sizes={DEFAULT_SIZES}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}