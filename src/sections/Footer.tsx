import Container from '../components/Container'
import { useLang, t } from '../lib/i18n'
import { UtensilsCrossed, Wine, ChefHat } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const lang = useLang()

  return (
    <footer className="relative border-t border-neutral-800 bg-neutral-950 text-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 items-center text-center md:text-left">
          {/* Izquierda: logo Grecia */}
          <div className="flex justify-center md:justify-start">
            <a href="#home" aria-label="Grecia Vargas — Home" className="inline-flex">
              <img
                src="/images/logo1.png"
                alt="Grecia Vargas"
                className="h-[100px] md:h-[140px] lg:h-[180px] xl:h-[220px] 2xl:h-[260px] w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          {/* Centro: tagline premium con iconos */}
          <div className="flex flex-col items-center md:items-center gap-4">
            <div className="text-sm md:text-base opacity-80 leading-relaxed text-center">
              © {year} Grecia Vargas · Professional Private Chef
              <br />
              {t('footer.tagline', lang)}
            </div>
            <div className="flex gap-6 text-white/60">
              <UtensilsCrossed size={20} />
              <Wine size={20} />
              <ChefHat size={20} />
            </div>
          </div>

          {/* Derecha: Bit logo + powered by */}
          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col items-center md:items-center">
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
                rel="noopener"
                className="mt-3 text-xs md:text-sm text-white/80 hover:text-white transition underline underline-offset-4"
              >
                {t('footer.powered', lang)}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
