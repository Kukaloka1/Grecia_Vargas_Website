import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { Building2, Ship, Home, MapPin, ShieldCheck, Leaf, Globe2, CalendarCheck, Sparkles, Dumbbell, Palette, Languages, Wine } from 'lucide-react'
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

function Card({ icon, title, desc, bullets, img, badges, mostRequested }: CardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-white" data-aos="fade-up">
      {/* Imagen más alta para que “se expanda” visualmente */}
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
            <Sparkles size={14} /> {t('services.badge.most', useLang())}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
          {icon}<span>{title}</span>
        </div>

        <p className="mt-2 text-sm text-white/85">{desc}</p>

        <ul className="mt-4 space-y-1 text-sm">
          {bullets.map((b) => (
            <li key={b} className="text-white/80">• {b}</li>
          ))}
        </ul>

        {/* Badges de venta */}
        <div className="mt-5 flex flex-wrap gap-2">
          {badges.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-full border border-neutral-700/70 bg-neutral-900/60 px-2.5 py-1 text-[11px] text-white/85"
            >
              {/* Icono contextual según badge */}
              {label === t('services.tag.fullservice', useLang()) && <ShieldCheck size={14} />}
              {label === t('services.tag.product', useLang()) && <Leaf size={14} />}
              {label === t('services.tag.wellness', useLang()) && <Dumbbell size={14} />}
              {label === t('services.tag.styling', useLang()) && <Palette size={14} />}
              {label === t('services.tag.languages', useLang()) && <Languages size={14} />}
              {label === t('services.tag.pairings', useLang()) && <Wine size={14} />}
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

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
        <p className="mb-8 text-base leading-relaxed text-[#372549]">
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

        {/* Banda global + FOMO (dark para coherencia visual) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-center text-white/85 flex items-center justify-center gap-2" data-aos="fade-up">
            <MapPin size={16} className="text-white/70"/>{t('services.ribbon.1', lang)}
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-center text-white/85 flex items-center justify-center gap-2" data-aos="fade-up" data-aos-delay="60">
            <Globe2 size={16} className="text-white/70"/>{t('services.ribbon.2', lang)}
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-center text-white/85 flex items-center justify-center gap-2" data-aos="fade-up" data-aos-delay="120">
            <Sparkles size={16} className="text-white/70"/>{t('services.ribbon.3', lang)}
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-center text-white/85 flex items-center justify-center gap-2" data-aos="fade-up" data-aos-delay="180">
            <CalendarCheck size={16} className="text-white/70"/>{t('services.ribbon.4', lang)}
          </div>
        </div>

        {/* Mini CTA inline */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" variant="primary" className="!bg-black !text-white">
            {t('hero.cta.availability', lang)}
          </Button>
          <Button size="lg" variant="whatsapp" href="https://wa.me/34611619968">
            {t('hero.cta.whatsapp', lang)}
          </Button>
        </div>
      </Container>
    </section>
  )
}
