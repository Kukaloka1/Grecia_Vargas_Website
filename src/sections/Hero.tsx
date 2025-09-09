// src/sections/Hero.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang, t } from '../lib/i18n'
import Button from '../components/Button'
import { Instagram } from 'lucide-react'
import SmartImage from '../components/SmartImage'
import { preloadImages, predecodeImages } from '@/lib/images'
import type { CSSProperties } from 'react' // ✅ Agregado pa typing estricto de style

export default function Hero() {
  const lang = useLang()
  const imageRef = useRef<HTMLDivElement>(null)
  const [heroAnimated, setHeroAnimated] = useState(false)

  // Preload/Pre-decode de la imagen del hero (optimizado como en Gallery)
  useEffect(() => {
    const urls = ['/images/grecia/1.webp']
    const cleanup = preloadImages(urls, 1)
    predecodeImages(urls, 'high') // ↑ a 'high' pa mejor calidad y menos jank
    return cleanup
  }, [])

  // Observer para fade-in elegante UNA VEZ (misma dinámica que Gallery)
  useEffect(() => {
    if (!imageRef.current) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !heroAnimated) {
            setHeroAnimated(true)
            io.unobserve(entry.target) // Solo una vez
          }
        }
      },
      {
        root: null,
        threshold: 0.1, // Trigger temprano
        rootMargin: '0px 0px -100px 0px', // Anticipa desde abajo pa scroll inicial
      }
    )

    io.observe(imageRef.current)

    return () => io.disconnect()
  }, [heroAnimated])

  // Estilo GPU pinning FIJO para la imagen (suave forever, sin jank en scrolls)
  const gpuPinStyle: CSSProperties = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
  }

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
          'flex flex-col',
          'justify-start md:!justify-center',
          'gap-y-6 sm:gap-y-8',
          'pt-24 sm:pt-28 md:pt-0',
          'pb-10 md:pb-0 lg:pb-0',
        ].join(' ')}
      >
        <div className="md:-mt-35">
          {/* Pretítulo — SOLO móviles/tablet */}
          <div
            className={[
              'uppercase tracking-[1.14em] opacity-80 whitespace-pre-line',
              'mt-20 sm:mt-8 md:mt-0', // empuja abajo solo en mobile/sm
              'text-[0.78rem]/relaxed',
              'sm:text-[0.85rem]',
              'md:text-[0.95rem]',
            ].join(' ')}
            data-aos="fade-up"
          >
            {t('brand.role', lang)}
          </div>
  
          {/* H1 — SOLO móviles/tablet */}
          <h1
            className={[
              'hero-h1',
              'mt-10 sm:mt-12 md:mt-0',
              'text-5xl',
              'sm:text-6xl',
              'md:text-7xl',
              'lg:text-8xl',
              'xl:text-[clamp(4.75rem,5vw,7.25rem)]',
              'leading-[1.15] tracking-tight font-extrabold max-w-[18ch]',
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
  
          {/* Subtítulo — SOLO móviles/tablet */}
          <p
            className={[
              'mt-6 md:mt-7',
              'text-base sm:text-lg md:text-xl',
              'opacity-90 max-w-[42ch] sm:max-w-[48ch] md:max-w-[52ch]',
            ].join(' ')}
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {t('hero.subtitle', lang)}
          </p>
        </div>
  
        {/* CTAs desktop/tablet (texto) */}
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
  
      {/* Foto (fade elegante) */}
      <div
        ref={imageRef}
        className={[
          'hero-center relative transition-all duration-700 ease-out bg-black',
          'min-h-[320px] sm:min-h-[380px] md:min-h-[440px]',
          heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        ].join(' ')}
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
          style={gpuPinStyle}
        />
      </div>
  
      {/* CTAs móviles — ICON ONLY, alineación horizontal perfecta */}
      <div className="md:hidden px-4 pb-8">
        <div className="grid grid-cols-3 gap-4 pt-6 place-items-center">
          {/* Check Availability (icono inline, sin imports extra) */}
          <a
            href="#contact"
            aria-label={t('hero.cta.availability', lang)}
            className="group inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white ring-1 ring-white/10 hover:ring-white/20 hover:scale-[1.03] active:scale-100 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-6 w-6 sm:h-7 sm:w-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4M16 2v4" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="m9 14 2 2 4-4" />
            </svg>
            <span className="sr-only">{t('hero.cta.availability', lang)}</span>
          </a>
  
          {/* WhatsApp (brand-like inline SVG) */}
          <a
            href="https://wa.me/34611619968"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('hero.cta.whatsapp', lang)}
            className="group inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white ring-1 ring-white/10 hover:ring-white/20 hover:scale-[1.03] active:scale-100 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7">
              <path d="M20.52 3.48A11.7 11.7 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.51 5.83L0 24l6.32-1.64A11.92 11.92 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22a9.9 9.9 0 01-5.06-1.37l-.36-.21-3.75.97 1-3.65-.24-.37A9.91 9.91 0 1122 12c0 5.52-4.48 10-10 10zm5.23-7.04c-.29-.15-1.71-.84-1.98-.93-.27-.1-.47-.15-.67.15-.2.31-.77.93-.95 1.12-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.46-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.31-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.31-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.1 4.52.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.2-.56-.35z"/>
            </svg>
            <span className="sr-only">{t('hero.cta.whatsapp', lang)}</span>
          </a>
  
          {/* Instagram (usa el import existente) */}
          <a
            href="https://instagram.com/chefgreciavargas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white ring-1 ring-white/10 hover:ring-white/20 hover:scale-[1.03] active:scale-100 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </section>
  )
  
}
