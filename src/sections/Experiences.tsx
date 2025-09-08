import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { Sparkles, Leaf, Handshake } from 'lucide-react'
import { useLang, t } from '../lib/i18n'

export default function Experiences(){
  const lang = useLang()
  return (
    <section id="experiences" className="section">
      <Container>
        <SectionTitle
          title={t('experiences.title', lang)}
          subtitle={t('experiences.subtitle', lang)}
        />

        {/* Lead descriptivo */}
        <p className="mb-8 text-base leading-relaxed text-[#372549]">
          {t('experiences.lead', lang)}
        </p>

        {/* Grid principal: 3 experiencias */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Studio Private Dining */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="opacity-80" />
              <h3 className="font-bold">{t('experiences.cards.studio.title', lang)}</h3>
            </div>
            <p className="text-sm opacity-80">{t('experiences.cards.studio.desc', lang)}</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="opacity-80">• {t('experiences.cards.studio.b1', lang)}</li>
              <li className="opacity-80">• {t('experiences.cards.studio.b2', lang)}</li>
              <li className="opacity-80">• {t('experiences.cards.studio.b3', lang)}</li>
            </ul>
          </div>

          {/* Yacht Chef */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up" data-aos-delay="80">
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={18} className="opacity-80" />
              <h3 className="font-bold">{t('experiences.cards.yacht.title', lang)}</h3>
            </div>
            <p className="text-sm opacity-80">{t('experiences.cards.yacht.desc', lang)}</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="opacity-80">• {t('experiences.cards.yacht.b1', lang)}</li>
              <li className="opacity-80">• {t('experiences.cards.yacht.b2', lang)}</li>
              <li className="opacity-80">• {t('experiences.cards.yacht.b3', lang)}</li>
            </ul>
          </div>

          {/* Villas & Events */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up" data-aos-delay="160">
            <div className="flex items-center gap-2 mb-2">
              <Handshake size={18} className="opacity-80" />
              <h3 className="font-bold">{t('experiences.cards.villas.title', lang)}</h3>
            </div>
            <p className="text-sm opacity-80">{t('experiences.cards.villas.desc', lang)}</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="opacity-80">• {t('experiences.cards.villas.b1', lang)}</li>
              <li className="opacity-80">• {t('experiences.cards.villas.b2', lang)}</li>
              <li className="opacity-80">• {t('experiences.cards.villas.b3', lang)}</li>
            </ul>
          </div>
        </div>

        {/* Cinta global */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up">
            {t('experiences.ribbon.1', lang)}
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up" data-aos-delay="60">
            {t('experiences.ribbon.2', lang)}
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up" data-aos-delay="120">
            {t('experiences.ribbon.3', lang)}
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up" data-aos-delay="180">
            {t('experiences.ribbon.4', lang)}
          </div>
        </div>

        {/* CTA fuerte en NEGRO con texto BLANCO */}
        <div className="mt-12 rounded-3xl border border-neutral-800 bg-neutral-950 text-white p-8 md:p-10 text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold mb-2">{t('cta.title', lang)}</h3>
          <p className="text-sm text-white/80 mb-5">{t('cta.subtitle', lang)}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="primary" className="!bg-white !text-neutral-900">
              {t('hero.cta.availability', lang)}
            </Button>
            <Button size="lg" variant="whatsapp" href="https://wa.me/34611619968">
              {t('hero.cta.whatsapp', lang)}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
