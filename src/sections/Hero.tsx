// src/sections/Hero.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang, t } from '../lib/i18n';
import Button from '../components/Button';
import { Instagram } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import { preloadImages, predecodeImages } from '@/lib/images';
import type { CSSProperties } from 'react'; // ✅ Agregado pa typing estricto de style

export default function Hero() {
  const lang = useLang();
  const imageRef = useRef<HTMLDivElement>(null);
  const [heroAnimated, setHeroAnimated] = useState(false);

  // Preload/Pre-decode de la imagen del hero (optimizado como en Gallery)
  useEffect(() => {
    const urls = ['/images/grecia/1.webp'];
    const cleanup = preloadImages(urls, 1);
    predecodeImages(urls, 'high'); // ↑ a 'high' pa mejor calidad y menos jank
    return cleanup;
  }, []);

  // Observer para fade-in elegante UNA VEZ (misma dinámica que Gallery)
  useEffect(() => {
    if (!imageRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !heroAnimated) {
            setHeroAnimated(true);
            io.unobserve(entry.target); // Solo una vez
          }
        }
      },
      {
        root: null,
        threshold: 0.1, // Trigger temprano
        rootMargin: '0px 0px -100px 0px' // Anticipa desde abajo pa scroll inicial
      }
    );

    io.observe(imageRef.current);

    return () => io.disconnect();
  }, [heroAnimated]);

  // Estilo GPU pinning FIJO para la imagen (suave forever, sin jank en scrolls)
  const gpuPinStyle: CSSProperties = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
  };

  return (
    <section
      id="home"
      className={[
        'grid grid-cols-1',
        'md:grid-cols-[0.42fr_1fr]',
        'lg:grid-cols-[0.38fr_1fr]',
        'xl:grid-cols-[0.36fr_1fr]',
        '-mt-[var(--header-h)]',
        'md:min-h-[calc(100svh-var(--header-h))]',
        'py-0 md:overflow-hidden',
      ].join(' ')}
    >
      {/* Panel izquierdo (texto) */}
      <div
        className={[
          'hero-left',
          'flex flex-col',                 // layout seguro
          'justify-start md:!justify-center', // centrado vertical SOLO en desktop
          'gap-y-6 sm:gap-y-8',
          'pt-24 sm:pt-28 md:pt-0',        // móvil con respiro; desktop sin empuje
          'pb-10 md:pb-0 lg:pb-0',
        ].join(' ')}
      >
        <div className="md:-mt-35"> {/* ✅ -mt-25 como pediste */}
          <div
            className="uppercase tracking-[0.14em] text-[0.72rem]/relaxed opacity-80 whitespace-pre-line" // ✅ FIX: Agregado 'whitespace-pre-line' (Tailwind class para white-space: pre-line) — SIN inline styles
            data-aos="fade-up"
          >
            {t('brand.role', lang)}
          </div>

          <h1
            className={[
              'hero-h1',
              'mt-10 sm:mt-14 md:mt-0', // margen superior solo en mobile/tablet
              'text-2xl sm:text-8xl md:text-9xl lg:text-8xl',
              'xl:text-[clamp(4.75rem,5vw,7.25rem)]',
              'leading-[1.3] tracking-tight font-extrabold',
              'max-w-[18ch]',
            ].join(' ')}
            data-aos="fade-up"
            data-aos-delay="60"
          >
            {lang === 'en' ? (
              <>
                <span className="block">{t('hero.title.top', lang)}</span>
                <span className="block">{t('hero.title.bottom', lang)}</span>
              </>
            ) : (
              t('hero.title', lang)
            )}
          </h1>

          <p
            className="mt-6 md:mt-7 text-base md:text-xl opacity-90 max-w-[42ch]"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {t('hero.subtitle', lang)}
          </p>
        </div>

        {/* CTAs en texto */}
        <div className="hidden md:flex gap-3 pt-8 lg:pt-10" data-aos="fade-up" data-aos-delay="180">
          <Button href="#contact">{t('hero.cta.availability', lang)}</Button>
          <Button variant="ghost" href="https://wa.me/34611619968">
            {t('hero.cta.whatsapp', lang)}
          </Button>
          <Button
            variant="ghost"
            href="https://instagram.com/chefgreciavargas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" />
            <span>@chefgreciavargas</span>
          </Button>
        </div>
      </div>

      {/* Foto (fade elegante con observer + pinning GPU, sin AOS) */}
      <div
        ref={imageRef}
        className={`hero-center relative min-h-[300px] bg-black transition-all duration-700 ease-out // ✅ Agregado 'bg-black' pa eliminar flash blanco en refresh (el contenedor cubre antes de que cargue la img)
          ${heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <SmartImage
          src="/images/grecia/1.webp"
          alt="Grecia plating"
          width={1200}
          height={800}
          className="h-full w-full object-cover hero-bw transition-opacity duration-700 ease-out"
          eager={true}
          priority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          responsive={false}
          onError={(event) =>
            console.error('Error cargando imagen hero:', event, 'Ruta:', '/images/grecia/1.webp')
          }
          // ✅ Pinning SIEMPRE activo pa fixed/suave en scrolls (misma dinámica que Gallery)
          style={gpuPinStyle}
        />
      </div>

      {/* CTAs móviles */}
      <div className="md:hidden px-4 pb-8">
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          <Button
            href="#contact"
            className="!bg-black !text-white !border-transparent hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex-1 min-w-[140px]"
          >
            {t('hero.cta.availability', lang)}
          </Button>
          <Button
            variant="ghost"
            href="https://wa.me/34611619968"
            className="!bg-black !text-white !border-transparent hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex-1 min-w-[140px]"
          >
            {t('hero.cta.whatsapp', lang)}
          </Button>
          <Button
            variant="ghost"
            href="https://instagram.com/chefgreciavargas"
            target="_blank"
            rel="noopener noreferrer"
            className="!bg-black !text-white !border-transparent hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 inline-flex items-center gap-2 flex-1 min-w-[140px]"
          >
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </Button>
        </div>
      </div>
    </section>
  );
}