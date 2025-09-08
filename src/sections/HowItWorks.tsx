import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import { FileText, ListChecks, ShoppingCart, Sparkles, CheckCircle2, Globe2, Calendar } from 'lucide-react'
import { useLang, t } from '../lib/i18n'

function easeOutCubic(x: number){ return 1 - Math.pow(1 - x, 3) }

function StepNumber({ n }: { n: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const [pop, setPop] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let started: number | undefined

    const run = (t: number) => {
      if (started === undefined) started = t
      const d = 700 // duración ms
      const p = Math.min((t - started) / d, 1)
      const v = Math.max(1, Math.floor(easeOutCubic(p) * n))
      setVal(v)
      if (p < 1) raf = requestAnimationFrame(run)
      else setPop(true) // dispara clase de "pop" al finalizar
    }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        raf = requestAnimationFrame(run)
        io.disconnect()
      }
    }, { threshold: 0.35 })

    io.observe(el)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [n])

  return (
    <span
      ref={ref}
      className={`step-num ${pop ? 'anim-count-pop' : ''} text-black dark:text-black`}
      aria-hidden="true"
    >
      {String(val).padStart(2, '0')}
    </span>
  )
}

export default function HowItWorks(){
  const lang = useLang()
  const steps = [
    { key: t('how.step.brief', lang), icon: <FileText size={18} className="opacity-80" />, blurb: t('how.step.brief.blurb', lang) },
    { key: t('how.step.menu', lang), icon: <ListChecks size={18} className="opacity-80" />, blurb: t('how.step.menu.blurb', lang) },
    { key: t('how.step.sourcing', lang), icon: <ShoppingCart size={18} className="opacity-80" />, blurb: t('how.step.sourcing.blurb', lang) },
    { key: t('how.step.service', lang), icon: <Sparkles size={18} className="opacity-80" />, blurb: t('how.step.service.blurb', lang) },
    { key: t('how.step.cleanup', lang), icon: <CheckCircle2 size={18} className="opacity-80" />, blurb: t('how.step.cleanup.blurb', lang) },
  ]

  return (
    <section id="how" className="section">
      <Container>
        <SectionTitle title={t('how.title', lang)} subtitle={t('how.subtitle', lang)} />

        {/* Lead de venta */}
        <p className="mb-8 text-base leading-relaxed text-[#372549]">
          {t('how.lead', lang)}
        </p>

        {/* Pasos con animación en números */}
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.key}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 text-center transition will-change-transform hover:-translate-y-1 hover:shadow-lg"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest opacity-70">
                {s.icon}
                <span>{s.key}</span>
              </div>
              <div className="mt-3">
                <StepNumber n={i + 1} />
              </div>
              <div className="mt-3 text-sm opacity-80">{s.blurb}</div>
            </div>
          ))}
        </div>

        {/* Banda global + FOMO */}
        <div className="mt-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 bg-white/50 dark:bg-neutral-900/40" data-aos="fade-up">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start sm:items-center gap-3">
              <Globe2 className="opacity-80 shrink-0" size={18} />
              <p className="text-sm">
                {t('how.ribbon.travel', lang)}
              </p>
            </div>
            <div className="flex items-start sm:items-center gap-3">
              <Calendar className="opacity-80 shrink-0" size={18} />
              <p className="text-sm">
                {t('how.ribbon.fomo', lang)}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
