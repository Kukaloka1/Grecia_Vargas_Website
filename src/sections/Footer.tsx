import Container from '../components/Container'
import { useLang, t } from '../lib/i18n'
import { UtensilsCrossed, Wine, ChefHat, Instagram } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const lang = useLang()

  return (
    <footer className="relative border-t border-neutral-800 bg-neutral-950 text-white overflow-hidden">
      {/* Hairline superior */}
      <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Spotlight sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[110vw] max-w-5xl h-40
                   bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 items-center text-center md:text-left">
          {/* Izquierda — Logo Grecia (tamaños intactos) con glow sutil */}
          <div className="relative flex justify-center md:justify-start">
            {/* Glow elegante detrás del logo */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2
                         w-[220px] md:w-[300px] lg:w-[360px] xl:w-[420px]
                         h-[120px] md:h-[160px] lg:h-[190px] xl:h-[230px]
                         rounded-[28px] blur-3xl opacity-30
                         bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
            <a href="#home" aria-label="Grecia Vargas — Home" className="inline-flex transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/images/logo1.png"
                alt="Grecia Vargas"
                className="h-[100px] md:h-[140px] lg:h-[180px] xl:h-[220px] 2xl:h-[260px] w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          {/* Centro — Tagline + fila de iconos (guiños + IG en línea, sin duplicados) */}
          <div className="flex flex-col items-center gap-5">
            {/* Tagline premium */}
            <div className="text-sm md:text-base opacity-80 leading-relaxed text-center">
              © {year} Grecia Vargas · Professional Private Chef
              <br />
              {t('footer.tagline', lang)}
            </div>

            {/* Iconos en línea: guiños + Instagram (IG clicable, los demás decorativos) */}
            <div className="flex items-center gap-6 text-white/70">
              <UtensilsCrossed size={20} className="shrink-0" />
              <Wine size={20} className="shrink-0" />
              <ChefHat size={20} className="shrink-0" />
              <a
                href="https://instagram.com/chefgreciavargas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center transition-colors hover:text-white"
                title="@chefgreciavargas"
              >
                <Instagram size={20} className="shrink-0" />
              </a>
            </div>
          </div>

          {/* Derecha — Bittech (tamaños intactos) + powered by */}
          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col items-center md:items-end">
              <img
                src="/images/footer/bit.svg"
                alt="Bittech Network"
                className="h-[70px] md:h-[82px] lg:h-[90px] w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <a
                href="https://www.bittechnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs md:text-sm text-white/80 hover:text-white transition underline underline-offset-4"
              >
                {t('footer.powered', lang)}
              </a>
            </div>
          </div>
        </div>

        {/* Franja inferior — navegación rápida */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#experiences" className="hover:text-white transition">Experiences</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#menus" className="hover:text-white transition">Menus</a>
            <a href="#gallery" className="hover:text-white transition">Gallery</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
          <div aria-hidden className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </Container>
    </footer>
  )
}

