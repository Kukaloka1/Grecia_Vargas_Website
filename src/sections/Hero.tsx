import Button from '../components/Button'
import { useLang, t } from '../lib/i18n'
import { useEffect } from 'react'
import { enableSmoothAnchors } from '../lib/scroll'
import { Instagram } from 'lucide-react' // IG icon

export default function Hero() {
  const lang = useLang()
  useEffect(() => { enableSmoothAnchors() }, [])

  return (
    <section
      id="home"
      className={[
        'grid grid-cols-1',
        'md:[grid-template-columns:0.42fr_1fr]',
        'lg:[grid-template-columns:0.38fr_1fr]',
        'xl:[grid-template-columns:0.36fr_1fr]',
        '-mt-[var(--header-h)]',
        // ⬇️ en móviles NO forzamos altura ni ocultamos overflow
        'md:min-h-[calc(100svh-var(--header-h))]',
        'py-0 md:overflow-hidden',
      ].join(' ')}
    >
      {/* Panel izquierdo (texto) */}
      <div
        className={[
          'hero-left',
          '!justify-start',
          'gap-y-6 sm:gap-y-8',
          'pt-28 sm:pt-32 md:pt-40',
          'lg:pt-[calc(var(--header-h)+4.5rem)]',
          'xl:pt-[calc(var(--header-h)+5.5rem)]',
          '2xl:pt-[calc(var(--header-h)+6.5rem)]',
          'pb-10 md:pb-12 lg:pb-16',
        ].join(' ')}
      >
        <div>
          <div className="uppercase tracking-[0.14em] text-[0.72rem]/relaxed opacity-80">
            {t('brand.role', lang)}
          </div>

          <h1
            className={[
              'hero-h1',
              'mt-[60px]',
              'text-2xl',            // móvil
              'sm:text-8xl',         // tablet chica
              'md:text-9xl',         // tablet grande
              'lg:text-8xl',         // desktop
              'xl:text-[clamp(4.75rem,5vw,7.25rem)]',
              'leading-[1.3] tracking-tight font-extrabold',
              'max-w-[18ch]',
            ].join(' ')}
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

          <p className="mt-6 md:mt-7 text-base md:text-xl opacity-90 max-w-[42ch]">
            {t('hero.subtitle', lang)}
          </p>
        </div>

        {/* CTAs en texto: ocultas en móviles, visibles desde md+ */}
        <div className="hidden md:flex gap-3 pt-8 lg:pt-10">
          <Button href="#contact">{t('hero.cta.availability', lang)}</Button>
          <Button variant="ghost" href="https://wa.me/34611619968">
            {t('hero.cta.whatsapp', lang)}
          </Button>
          {/* Instagram (md+) */}
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

      {/* Foto */}
      <div className="hero-center">
        <img
          src="/images/grecia/1.webp"
          alt="Grecia plating"
          className="h-full w-full object-cover hero-bw"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="dish-circle overflow-hidden pointer-events-none" aria-hidden />
      </div>

      {/* CTAs móviles: debajo de la foto, negros, con wrap seguro */}
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

          {/* Instagram móvil (negro, alineado y con wrap) */}
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
  )
}


