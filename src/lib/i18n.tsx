import { useSyncExternalStore } from 'react'
type Lang = 'en' | 'es'
const DEFAULT: Lang = (localStorage.getItem('lang') as Lang) || 'en'
let current: Lang = DEFAULT
const listeners = new Set<() => void>()
export function setLang(l: Lang){ current = l; localStorage.setItem('lang', l); listeners.forEach(cb=>cb()) }
export function useLang(){ return useSyncExternalStore(sub=>{ listeners.add(sub); return ()=>listeners.delete(sub) }, ()=>current, ()=>current) }

const dict: Record<Lang, Record<string,string>> = {
  en: {
    'brand.title': 'Grecia Vargas',
    'brand.role': 'Private Chef',
    'hero.title': 'Mediterranean elegance, crafted for you',
    'hero.subtitle': 'Seasonal, local & elegant cuisine for yachts, villas and intimate celebrations.',
    'hero.cta.availability': 'Check availability',
    'hero.cta.whatsapp': 'WhatsApp',
    'nav.about': 'About',
    'nav.experiences': 'Experiences',
    'nav.menus': 'Menus',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'about.title': 'About',
    'about.p1': 'Private chef in Barcelona crafting tailor-made Mediterranean experiences with seasonal produce and impeccable service.',
    'experiences.title': 'Experiences',
    'experiences.p1': 'Studio private dining · Yacht chef · Villas & intimate events',
    'menus.title': 'Sample Menus',
    'menus.light': 'Healthy & Light',
    'menus.signature': 'Celebration & Signature',
    'gallery.title': 'Gallery',
    'cta.title': "Let's craft your menu",
    'cta.subtitle': 'Tell us your date, location, dietary preferences and guest count.',
    'cta.button': 'Request proposal'
  },
  es: {
    'brand.title': 'Grecia Vargas',
    'brand.role': 'Chef Privada',
    'hero.title': 'Elegancia mediterránea hecha a tu medida',
    'hero.subtitle': 'Cocina de temporada, local y elegante para yates, villas y celebraciones íntimas.',
    'hero.cta.availability': 'Consultar disponibilidad',
    'hero.cta.whatsapp': 'WhatsApp',
    'nav.about': 'Sobre mí',
    'nav.experiences': 'Experiencias',
    'nav.menus': 'Menús',
    'nav.gallery': 'Galería',
    'nav.contact': 'Contacto',
    'about.title': 'Sobre mí',
    'about.p1': 'Chef privada en Barcelona que crea experiencias mediterráneas a medida con producto de temporada y servicio impecable.',
    'experiences.title': 'Experiencias',
    'experiences.p1': 'Cenas privadas en estudio · Yacht chef · Villas y eventos íntimos',
    'menus.title': 'Menús de muestra',
    'menus.light': 'Ligero & Saludable',
    'menus.signature': 'Celebración & Firma',
    'gallery.title': 'Galería',
    'cta.title': 'Diseñemos tu menú',
    'cta.subtitle': 'Cuéntanos fecha, lugar, preferencias alimentarias y número de comensales.',
    'cta.button': 'Solicitar propuesta'
  }
}
export function t(key: string, lang: Lang){ return dict[lang][key] || key }
