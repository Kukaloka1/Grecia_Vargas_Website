// src/sections/About.tsx
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import { useLang, t } from '../lib/i18n'
import { ChefHat, Globe2, Leaf, Sparkles } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { preloadImages, predecodeImages } from '@/lib/images'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'; // ✅ Agregado pa typing estricto de style

export default function About(){
  const lang = useLang()
  const portraitRef = useRef<HTMLDivElement>(null)
  const mini1Ref = useRef<HTMLDivElement>(null)
  const mini2Ref = useRef<HTMLDivElement>(null)
  const [portraitAnimated, setPortraitAnimated] = useState(false)
  const [mini1Animated, setMini1Animated] = useState(false)
  const [mini2Animated, setMini2Animated] = useState(false)

  // Preload/Pre-decode para evitar tirones al entrar
  useEffect(()=>{
    const urls = ['/images/grecia/2.webp','/images/grecia/orange.webp','/images/grecia/choco.webp']
    const cleanup = preloadImages(urls, 2)
    predecodeImages(urls, 'low')
    return cleanup
  },[])

  // Observer para fade-in elegante UNA VEZ en retrato
  useEffect(() => {
    if (!portraitRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !portraitAnimated) {
            setPortraitAnimated(true);
            io.unobserve(entry.target); // Solo una vez
          }
        }
      },
      { root: null, threshold: 0.1, rootMargin: '100px' } // Trigger temprano y proactivo
    );
    io.observe(portraitRef.current);
    return () => io.disconnect();
  }, [portraitAnimated]);

  // Observer para mini galería 1
  useEffect(() => {
    if (!mini1Ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !mini1Animated) {
            setMini1Animated(true);
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, threshold: 0.1, rootMargin: '100px' }
    );
    io.observe(mini1Ref.current);
    return () => io.disconnect();
  }, [mini1Animated]);

  // Observer para mini galería 2
  useEffect(() => {
    if (!mini2Ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !mini2Animated) {
            setMini2Animated(true);
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, threshold: 0.1, rootMargin: '100px' }
    );
    io.observe(mini2Ref.current);
    return () => io.disconnect();
  }, [mini2Animated]);

  // Estilo GPU pinning FIJO para las imágenes (suave forever, sin jank en scrolls)
  const gpuPinStyle: CSSProperties = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
  };

  return (
    <section id="about" className="section">
      <Container>
       

        <SectionTitle title={t('about.title', lang)} subtitle={t('about.lead1', lang)} />

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-12 items-start">
          {/* Retrato (fade con observer + pinning GPU, SIN tocar AOS en badges) */}
          <figure className="md:col-span-5 lg:col-span-5">
            <div 
              ref={portraitRef}
              className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 transition-all duration-700 ease-out
                ${portraitAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <SmartImage
                src="/images/grecia/2.webp"
                alt="Chef Grecia Vargas — portrait"
                className="h-full w-full object-cover hero-bw transition-opacity duration-700 ease-out"
                width={800}
                height={1000}
                eager
                priority="high"
                draggable={false}
                // ✅ Pinning SIEMPRE activo pa fixed/suave
                style={gpuPinStyle}
              />
            </div>

            {/* Badges (AOS OK, intacto) */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                t('about.badge.mediterranean', lang),
                t('about.badge.global', lang),
                t('about.badge.studio', lang),
                t('about.badge.yachts', lang),
                
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

          {/* Copy + highlights (AOS intacto) */}
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

            {/* Mini galería lateral (fade con observers + pinning GPU) */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div 
                ref={mini1Ref}
                className={`aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 transition-all duration-700 ease-out
                  ${mini1Animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <SmartImage
                  src="/images/grecia/orange.webp"
                  alt="Travel inspiration"
                  className="h-full w-full object-cover transition-opacity duration-700 ease-out"
                  width={800}
                  height={600}
                  eager
                  priority="auto"
                  draggable={false}
                  style={gpuPinStyle} // ✅ Pinning SIEMPRE
                />
              </div>
              <div 
                ref={mini2Ref}
                className={`aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 transition-all duration-700 ease-out
                  ${mini2Animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <SmartImage
                  src="/images/grecia/choco.webp"
                  alt="Markets & product"
                  className="h-full w-full object-cover transition-opacity duration-700 ease-out"
                  width={800}
                  height={600}
                  eager
                  priority="auto"
                  draggable={false}
                  style={gpuPinStyle} // ✅ Pinning SIEMPRE
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}