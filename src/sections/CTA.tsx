import Container from '../components/Container'
import Button from '../components/Button'
import { useLang, t } from '../lib/i18n'
import { ShieldCheck, Sparkles, Leaf, HandHeart } from 'lucide-react'

export default function CTA(){
  const lang = useLang()
  const year = new Date().getFullYear()
  return (
    <section id="contact" className="section">
      <Container>
        {/* Bloque CTA: visual premium, hard-sell elegante */}
        <div
          className="
            relative overflow-hidden rounded-3xl border border-neutral-800
            bg-neutral-950 text-white p-8 md:p-12 text-center
          "
          data-aos="fade-up"
        >
          {/* Degradés sutiles de acento (sin estilos inline) */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(1200px_600px_at_105%_-20%,rgba(155,161,123,0.20),transparent),
                 radial-gradient(900px_500px_at_-10%_120%,rgba(55,37,73,0.30),transparent)]
            "
          />
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 -z-10
              bg-[linear-gradient(0deg,rgba(255,255,255,0.07)_0%,transparent_60%)]
            "
          />

          {/* Kicker */}
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-700/70 bg-neutral-900/60 px-3 py-1 text-xs">
            <Sparkles size={14} className="opacity-80" />
            <span>Booking {year} • Barcelona • Worldwide • ES/EN</span>
          </div>

          {/* Headline + subheadline (i18n) */}
          <h2 className="section-title text-white">{t('cta.title', lang)}</h2>
          <p className="mt-2 text-white/80 max-w-2xl mx-auto">
            {t('cta.subtitle', lang)}
          </p>

          {/* Chips de valor diferenciadores */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              {icon:<Leaf size={14} />, label:'Local sourcing'},
              {icon:<HandHeart size={14} />, label:'Bespoke service'},
              {icon:<ShieldCheck size={14} />, label:'Full service & cleanup'},
              {icon:<Sparkles size={14} />, label:'Table styling'},
              {icon:<Sparkles size={14} />, label:'Wellness options'},
              {icon:<Sparkles size={14} />, label:'ES / EN'},
            ].map((chip, i)=>(
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700/70 bg-neutral-900/60 px-3 py-1 text-xs"
              >
                {chip.icon}<span>{chip.label}</span>
              </span>
            ))}
          </div>

          {/* Botonera XL */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="primary"
              className="!bg-white !text-neutral-900 !shadow !shadow-white/10"
              href="mailto:cocinadegre.com"
            >
              {t('cta.button', lang)}
            </Button>
            <Button
              size="lg"
              variant="whatsapp"
              href="https://wa.me/34611619968?text=Hi!%20We%27d%20like%20to%20check%20availability%20for%20a%20private%20dinner/pop-up."
            >
              WhatsApp
            </Button>
          </div>

          {/* Nota de urgencia elegantes (soft scarcity) */}
          <p className="mt-4 text-[13px] text-white/65">
            Limited dates each month. Early requests secure preferred dates and sourcing.
          </p>
        </div>
      </Container>
    </section>
  )
}
