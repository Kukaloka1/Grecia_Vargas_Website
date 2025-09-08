// src/sections/About.tsx
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import { useLang, t } from '../lib/i18n'
import { ChefHat, Globe2, Leaf, Sparkles } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { preloadImages, predecodeImages } from '@/lib/images'
import { useEffect } from 'react'

export default function About(){
  const lang = useLang()

  // Preload/Pre-decode para evitar tirones al entrar
  useEffect(()=>{
    const urls = ['/images/grecia/2.webp','/images/grecia/orange.webp','/images/grecia/choco.webp']
    const cleanup = preloadImages(urls, 2)
    predecodeImages(urls, 'low')
    return cleanup
  },[])

  return (
    <section id="about" className="section">
      <Container>
       

        <SectionTitle title={t('about.title', lang)} subtitle={t('about.lead1', lang)} />

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-12 items-start">
          {/* Retrato (SIN AOS en contenedor/IMG) */}
          <figure className="md:col-span-5 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
              <SmartImage
                src="/images/grecia/2.webp"
                alt="Chef Grecia Vargas — portrait"
                className="h-full w-full object-cover hero-bw"
                width={800}
                height={1000}
                eager
                priority="high"
                draggable={false}
              />
            </div>

            {/* Badges (AOS OK) */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                t('about.badge.mediterranean', lang),
                t('about.badge.global', lang),
                t('about.badge.studio', lang),
                t('about.badge.yachts', lang),
                t('about.badge.villas', lang),
              ].map((b, i) => (
                <li
                  key={b}
                  className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs font-medium"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  {b}
                </li>
              ))}
            </ul>
          </figure>

          {/* Copy + highlights */}
          <div className="md:col-span-7 lg:col-span-7">
            <p className="text-base leading-relaxed text-[#372549] mb-4" data-aos="fade-up">
              {t('about.lead2', lang)}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up">
                <div className="flex items-center gap-3 mb-2">
                  <Globe2 className="opacity-80" size={18}/> <span className="font-semibold">Global</span>
                </div>
                <p className="text-sm opacity-80">{t('about.highlight.global', lang)}</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up" data-aos-delay="80">
                <div className="flex items-center gap-3 mb-2">
                  <ChefHat className="opacity-80" size={18}/> <span className="font-semibold">Bespoke</span>
                </div>
                <p className="text-sm opacity-80">{t('about.highlight.bespoke', lang)}</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up" data-aos-delay="140">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="opacity-80" size={18}/> <span className="font-semibold">Sourcing</span>
                </div>
                <p className="text-sm opacity-80">{t('about.highlight.sourcing', lang)}</p>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="opacity-80" size={18}/> <span className="font-semibold">Multilingual</span>
                </div>
                <p className="text-sm opacity-80">{t('about.highlight.languages', lang)}</p>
              </div>
            </div>

            {/* Mini galería lateral (SIN AOS en contenedores/IMG) */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <SmartImage
                  src="/images/grecia/orange.webp"
                  alt="Travel inspiration"
                  className="h-full w-full object-cover"
                  width={800}
                  height={600}
                  eager
                  priority="auto"
                  draggable={false}
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <SmartImage
                  src="/images/grecia/choco.webp"
                  alt="Markets & product"
                  className="h-full w-full object-cover"
                  width={800}
                  height={600}
                  eager
                  priority="auto"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
