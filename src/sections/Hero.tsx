import Button from '../components/Button'
import { useLang, t } from '../lib/i18n'
import { useEffect } from 'react'
import { enableSmoothAnchors } from '../lib/scroll'

export default function Hero(){
  const lang = useLang()
  useEffect(()=>{ enableSmoothAnchors() },[])
  return (
    <section id="home" className="hero-grid">
      {/* Panel izquierdo negro */}
      <div className="hero-left">
        <div>
          <div className="uppercase tracking-[0.14em] text-xs/relaxed opacity-80">{t('brand.role', lang)}</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold max-w-xs">{t('hero.title', lang)}</h1>
          <p className="mt-3 text-sm md:text-base opacity-90 max-w-sm">{t('hero.subtitle', lang)}</p>
        </div>
        <div className="flex gap-3 pt-6">
          <Button href="#contact">{t('hero.cta.availability', lang)}</Button>
          <Button variant="ghost" href="https://wa.me/0000000000">{t('hero.cta.whatsapp', lang)}</Button>
        </div>
      </div>
      {/* Panel central: foto B/N (placeholder) + plato en color */}
      <div className="hero-center">
        <img src="/images/grecia/1.webp" alt="Grecia plating" className="h-full w-full object-cover hero-bw" />
        <div className="dish-circle overflow-hidden" aria-hidden>
          <img src="/images/grecia/3.webp" alt="Signature dish" className="h-full w-full object-cover" />
        </div>
      </div>
      {/* Panel derecho: nav vertical */}
      <aside className="hero-right">
        <nav className="side-nav">
          <a className="side-link" href="#about">{t('nav.about', lang)}</a>
          <a className="side-link" href="#experiences">{t('nav.experiences', lang)}</a>
          <a className="side-link" href="#menus">{t('nav.menus', lang)}</a>
          <a className="side-link" href="#gallery">{t('nav.gallery', lang)}</a>
          <a className="side-link" href="#contact">{t('nav.contact', lang)}</a>
        </nav>
      </aside>
    </section>
  )
}
