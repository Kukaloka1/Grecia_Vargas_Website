import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import { FileText, ListChecks, ShoppingCart, Sparkles, CheckCircle2, Globe2, Calendar } from 'lucide-react'

function StepNumber({ n }: { n: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let started: number | undefined

    const run = (t: number) => {
      if (started === undefined) started = t
      const d = 700 // ms
      const p = Math.min((t - started) / d, 1)
      const v = Math.floor(p * n)
      setVal(v)
      if (p < 1) raf = requestAnimationFrame(run)
    }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        raf = requestAnimationFrame(run)
        io.disconnect()
      }
    }, { threshold: 0.3 })

    io.observe(el)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [n])

  return (
    <span
      ref={ref}
      className="inline-block font-extrabold text-2xl md:text-3xl bg-gradient-to-br from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent tracking-wider"
    >
      {String(val).padStart(2, '0')}
    </span>
  )
}

export default function HowItWorks(){
  const steps = [
    {
      key: 'Brief',
      icon: <FileText size={18} className="opacity-80" />,
      blurb: 'We listen first: date, location, guests, dietary notes and the feeling you want to create.'
    },
    {
      key: 'Menu',
      icon: <ListChecks size={18} className="opacity-80" />,
      blurb: 'Bespoke tasting menu aligned with seasonality and your preferences — elegant pacing, course by course.'
    },
    {
      key: 'Sourcing',
      icon: <ShoppingCart size={18} className="opacity-80" />,
      blurb: 'Product-first sourcing from trusted markets and artisans. Fresh, local, traceable.'
    },
    {
      key: 'Service',
      icon: <Sparkles size={18} className="opacity-80" />,
      blurb: 'Multi-sensory hospitality: music, light and cadence that elevate flavor without stealing the scene.'
    },
    {
      key: 'Cleanup',
      icon: <CheckCircle2 size={18} className="opacity-80" />,
      blurb: 'Spotless finish. Your home or venue returns to calm — the memory stays.'
    },
  ]

  return (
    <section id="how" className="section">
      <Container>
        <SectionTitle
          title="How it works"
          subtitle="Brief → Bespoke menu → Sourcing → Service → Cleanup"
        />

        {/* Lead corto de venta */}
        <p className="mb-8 text-base leading-relaxed text-[#372549]">
          Precision planning, Mediterranean soul and a global point of view. From yacht galleys to private studios,
          we design dinners that feel effortless — and unforgettable.
        </p>

        {/* Grid de pasos con animación en números */}
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.key}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 text-center transition will-change-transform hover:-translate-y-1 hover:shadow-lg"
              data-aos="fade-up"
              style={{ perspective: '1000px' } as any} // comentario: micro-tilt si luego quieres
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

        {/* Banda global + FOMO elegante */}
        <div
          className="mt-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 bg-white/50 dark:bg-neutral-900/40"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start sm:items-center gap-3">
              <Globe2 className="opacity-80 shrink-0" size={18} />
              <p className="text-sm">
                We travel <span className="font-semibold">worldwide</span> with advance notice — subject to calendar and logistics.
              </p>
            </div>
            <div className="flex items-start sm:items-center gap-3">
              <Calendar className="opacity-80 shrink-0" size={18} />
              <p className="text-sm">
                <span className="font-semibold">Limited dates each month.</span> Early booking secures preferred dates and sourcing.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
