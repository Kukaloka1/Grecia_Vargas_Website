import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { useMemo } from 'react'
import {
  Building2, Ship, Home, MapPin, ShieldCheck, Leaf, Globe2,
  CalendarCheck, Sparkles, Dumbbell, Palette, Languages, Wine
} from 'lucide-react'
import { useLang, t } from '../lib/i18n'

type CardProps = {
  icon: JSX.Element
  title: string
  desc: string
  bullets: string[]
  img: string
  badges: string[]
  mostRequested?: boolean
}

/* ===== CARD ===== */
function Card({ icon, title, desc, bullets, img, badges, mostRequested }: CardProps) {
  const lang = useLang()

  // Mapea el icono correcto para cada badge sin duplicar llamadas a t(...)
  const iconForBadge = useMemo(() => {
    const map = new Map<string, JSX.Element>([
      [t('services.tag.fullservice', lang), <ShieldCheck size={14} className="shrink-0" />],
      [t('services.tag.product',     lang), <Leaf        size={14} className="shrink-0" />],
      [t('services.tag.wellness',    lang), <Dumbbell    size={14} className="shrink-0" />],
      [t('services.tag.styling',     lang), <Palette     size={14} className="shrink-0" />],
      [t('services.tag.languages',   lang), <Languages   size={14} className="shrink-0" />],
      [t('services.tag.pairings',    lang), <Wine        size={14} className="shrink-0" />],
    ])
    return (label: string) => map.get(label)
  }, [lang])

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-white">
      {/* Imagen */}
      <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[320px] overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
        {mostRequested && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white text-neutral-900 px-2.5 py-1 text-[11px] font-semibold shadow">
            <Sparkles size={14} /> {t('services.badge.most', lang)}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-white/70">
          {icon}<span className="truncate">{title}</span>
        </div>

        <p className="mt-2 text-sm sm:text-[15px] text-white/85">{desc}</p>

        <ul className="mt-4 space-y-1.5 text-sm sm:text-[15px]">
          {bullets.map((b) => (
            <li key={b} className="text-white/80">• {b}</li>
          ))}
        </ul>

        {/* Badges — pills pro en breakpoints (grid en mobile, wrap en sm+) */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
          {badges.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full
                         ring-1 ring-white/10 bg-white/5
                         px-2.5 py-1.5 text-[11px] sm:text-xs text-white/85
                         hover:bg-white/7 transition-colors"
              title={label}
            >
              {iconForBadge(label)}
              <span className="truncate">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===== SECTION ===== */
export default function Services(){
  const lang = useLang()

  const cards: CardProps[] = [
    {
      icon: <Building2 size={18} className="text-white/80" />,
      title: t('services.cards.studio.title', lang),
      desc: t('services.cards.studio.desc', lang),
      bullets: [
        t('services.cards.studio.b1', lang),
        t('services.cards.studio.b2', lang),
        t('services.cards.studio.b3', lang),
      ],
      img: '/images/services/studio.jpg',
      badges: [
        t('services.tag.fullservice', lang),
        t('services.tag.product', lang),
        t('services.tag.styling', lang),
        t('services.tag.languages', lang),
      ],
      mostRequested: true,
    },
    {
      icon: <Ship size={18} className="text-white/80" />,
      title: t('services.cards.yacht.title', lang),
      desc: t('services.cards.yacht.desc', lang),
      bullets: [
        t('services.cards.yacht.b1', lang),
        t('services.cards.yacht.b2', lang),
        t('services.cards.yacht.b3', lang),
      ],
      img: '/images/services/yacht.jpg',
      badges: [
        t('services.tag.fullservice', lang),
        t('services.tag.product', lang),
        t('services.tag.wellness', lang),
        t('services.tag.languages', lang),
      ],
      mostRequested: true,
    },
    {
      icon: <Home size={18} className="text-white/80" />,
      title: t('services.cards.villas.title', lang),
      desc: t('services.cards.villas.desc', lang),
      bullets: [
        t('services.cards.villas.b1', lang),
        t('services.cards.villas.b2', lang),
        t('services.cards.villas.b3', lang),
      ],
      img: '/images/services/villas.jpg',
      badges: [
        t('services.tag.fullservice', lang),
        t('services.tag.product', lang),
        t('services.tag.pairings', lang),
        t('services.tag.languages', lang),
      ],
    },
  ]

  return (
    <section id="services" className="section">
      <Container>
        <SectionTitle title={t('services.title', lang)} subtitle={t('services.subtitle', lang)} />

        {/* Lead (sin tocar el texto) */}
        <p className="mb-8 text-[15px] sm:text-base leading-relaxed text-white/70">
          {t('services.lead', lang)}
        </p>

        {/* Grid de servicios */}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.title} data-aos="fade-up" data-aos-delay={i * 80}>
              <Card {...c} />
            </div>
          ))}
        </div>

        {/* Ribbon — usa SIEMPRE tus strings i18n, nada hardcode */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: <MapPin size={16} className="text-white/70"/>, text: t('services.ribbon.1', lang), d: 0 },
            { icon: <Globe2 size={16} className="text-white/70"/>, text: t('services.ribbon.2', lang), d: 60 },
            { icon: <Sparkles size={16} className="text-white/70"/>, text: t('services.ribbon.3', lang), d: 120 },
            { icon: <CalendarCheck size={16} className="text-white/70"/>, text: t('services.ribbon.4', lang), d: 180 },
          ].map((r) => (
            <div
              key={r.text}
              data-aos="fade-up"
              data-aos-delay={r.d}
              className="rounded-2xl border border-neutral-800 bg-neutral-950
                         ring-1 ring-white/5
                         px-4 py-3 min-h-12
                         text-sm lg:text-[15px] text-center text-white/85
                         flex items-center justify-center gap-2"
            >
              {r.icon}
              <span className="truncate">{r.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs — 2 botones perfectos en desktop y breakpoints (texto intacto) */}
        <div className="mt-10 lg:mt-12">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              href="#contact"
              size="lg"
              variant="primary"
              className="w-full sm:w-auto
                         inline-flex items-center justify-center gap-2
                         !h-12 sm:!h-12 !px-5 sm:!px-6 !rounded-xl
                         !bg-black !text-white !ring-1 !ring-white/10 hover:!ring-white/20
                         text-base"
            >
              <CalendarCheck className="h-5 w-5" />
              <span>{t('hero.cta.availability', lang)}</span>
            </Button>

            <Button
              href="https://wa.me/34611619968"
              size="lg"
              variant="whatsapp"
              className="w-full sm:w-auto
                         inline-flex items-center justify-center gap-2
                         !h-12 sm:!h-12 !px-5 sm:!px-6 !rounded-xl
                         text-base"
            >
              {t('hero.cta.whatsapp', lang)}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
