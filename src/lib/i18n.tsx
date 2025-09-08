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
    'about.kicker': 'Venezuelan–Spanish · Based in Barcelona · Global chef',
    'about.lead1': 'Grecia is a Venezuelan–Spanish private chef based in Barcelona. She designs world-class Mediterranean experiences with a truly global point of view.',
    'about.lead2': 'Her cuisine is seasonal, elegant and product-driven — shaped by journeys through Japan, Thailand, the Caribbean and across Europe.',
    'about.badge.global': 'Global mindset',
    'about.badge.mediterranean': 'Mediterranean soul',
    'about.badge.studio': 'Studio dinners',
    'about.badge.yachts': 'Yacht chef',
    'about.badge.villas': 'Villas & residences',
    'about.highlight.global': 'Asia • Europe • Caribbean',
    'about.highlight.languages': 'Speaks ES / EN',
    'about.highlight.bespoke': 'Bespoke tasting menus',
    'about.highlight.sourcing': 'Local sourcing',

    'experiences.title': 'Experiences',
    'experiences.subtitle': 'Private dining & global pop-ups engineered as sensory journeys — product-first cuisine, elegant pacing and hospitality you feel.',
    'experiences.lead': 'Grecia focuses on product quality and the guest experience. Her global pop-ups and private dinners are renowned not only for the food and presentation, but for the way they guide the senses — music, light and cadence turn each course into a scene.',
    'experiences.cards.studio.title': 'Studio Private Dining',
    'experiences.cards.studio.desc': 'Bespoke tasting menus in an intimate setting. Thoughtful pacing and a soundtrack that supports each course.',
    'experiences.cards.studio.b1': 'Seasonal, market-led produce',
    'experiences.cards.studio.b2': '6–14 guests (ideal)',
    'experiences.cards.studio.b3': 'Candlelight & curated sound',
    'experiences.cards.yacht.title': 'Yacht Chef',
    'experiences.cards.yacht.desc': 'Sea-to-table elegance for guests & crew with discreet, seamless service from dawn to dusk.',
    'experiences.cards.yacht.b1': 'Local sourcing at each port',
    'experiences.cards.yacht.b2': 'Breakfast to late service',
    'experiences.cards.yacht.b3': 'Wellness-minded options',
    'experiences.cards.villas.title': 'Villas & Events',
    'experiences.cards.villas.desc': 'Intimate celebrations in residences and boutique venues — live finishing and warm, attentive hosting.',
    'experiences.cards.villas.b1': 'Tailored to the occasion',
    'experiences.cards.villas.b2': 'Signature dessert finales',
    'experiences.cards.villas.b3': 'Coordinated table styling',
    'experiences.pillars.product.title': 'Product-first',
    'experiences.pillars.product.desc': 'Seasonality and provenance lead every decision.',
    'experiences.pillars.sensory.title': 'Multi-sensory flow',
    'experiences.pillars.sensory.desc': 'Sound, light and pacing designed to heighten flavor.',
    'experiences.pillars.global.title': 'Global pop-ups',
    'experiences.pillars.global.desc': 'Influences from Japan, Thailand, the Caribbean and Europe.',
    'experiences.pillars.service.title': 'Impeccable service',
    'experiences.pillars.service.desc': 'Warm, precise, unobtrusive — hospitality at its best.',
    'experiences.ribbon.1': 'Asia • Europe • Caribbean',
    'experiences.ribbon.2': 'Private dinners & pop-ups',
    'experiences.ribbon.3': 'Bespoke tasting menus',
    'experiences.ribbon.4': 'ES / EN',

    'menus.title': 'Sample Menus',
    'menus.light': 'Healthy & Light',
    'menus.signature': 'Celebration & Signature',

    'gallery.title': 'Gallery',

    'cta.title': "Let's craft your menu",
    'cta.subtitle': 'Tell us your date, location, dietary preferences and guest count.',
    'cta.button': 'Request proposal',

    // Footer
    'footer.powered': 'powered by Bittech Network',
    'footer.tagline': 'Crafted with seasonal ingredients, global perspective & impeccable service.'
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
    'about.kicker': 'Venezolana–española · Basada en Barcelona · Chef global',
    'about.lead1': 'Grecia es una chef privada venezolana–española afincada en Barcelona. Diseña experiencias mediterráneas de nivel mundial con una visión verdaderamente global.',
    'about.lead2': 'Su cocina es de temporada, elegante y centrada en el producto — influenciada por viajes por Japón, Tailandia, el Caribe y toda Europa.',
    'about.badge.global': 'Mirada global',
    'about.badge.mediterranean': 'Alma mediterránea',
    'about.badge.studio': 'Cenas en estudio',
    'about.badge.yachts': 'Yacht chef',
    'about.badge.villas': 'Villas & residencias',
    'about.highlight.global': 'Asia • Europa • Caribe',
    'about.highlight.languages': 'Habla ES / EN',
    'about.highlight.bespoke': 'Menús degustación a medida',
    'about.highlight.sourcing': 'Producto local',

    'experiences.title': 'Experiencias',
    'experiences.subtitle': 'Cenas privadas y pop-ups globales concebidos como viajes sensoriales — cocina centrada en el producto, ritmo elegante y hospitalidad que se siente.',
    'experiences.lead': 'Grecia se enfoca en la calidad del producto y la experiencia del invitado. Sus pop-ups y cenas privadas son reconocidos no solo por la comida y la presentación, sino por la forma en que guían los sentidos — música, luz y cadencia convierten cada pase en una escena.',
    'experiences.cards.studio.title': 'Studio Private Dining',
    'experiences.cards.studio.desc': 'Menús degustación a medida en un entorno íntimo. Ritmo pensado y banda sonora que acompaña cada pase.',
    'experiences.cards.studio.b1': 'Producto de temporada y mercado',
    'experiences.cards.studio.b2': '6–14 comensales (ideal)',
    'experiences.cards.studio.b3': 'Velas y sonido curado',
    'experiences.cards.yacht.title': 'Yacht Chef',
    'experiences.cards.yacht.desc': 'Elegancia mar-a-mesa para invitados y tripulación, con servicio discreto y fluido de amanecer a noche.',
    'experiences.cards.yacht.b1': 'Abastecimiento local en cada puerto',
    'experiences.cards.yacht.b2': 'Desde desayunos hasta tarde',
    'experiences.cards.yacht.b3': 'Opciones wellness',
    'experiences.cards.villas.title': 'Villas & Events',
    'experiences.cards.villas.desc': 'Celebraciones íntimas en residencias y espacios boutique — acabados en vivo y hospitalidad cercana.',
    'experiences.cards.villas.b1': 'Adaptado a la ocasión',
    'experiences.cards.villas.b2': 'Finales de postre firma',
    'experiences.cards.villas.b3': 'Estilismo de mesa coordinado',
    'experiences.pillars.product.title': 'Producto primero',
    'experiences.pillars.product.desc': 'La estacionalidad y el origen guían cada decisión.',
    'experiences.pillars.sensory.title': 'Flujo multisensorial',
    'experiences.pillars.sensory.desc': 'Sonido, luz y ritmo diseñados para realzar el sabor.',
    'experiences.pillars.global.title': 'Pop-ups globales',
    'experiences.pillars.global.desc': 'Influencias de Japón, Tailandia, el Caribe y Europa.',
    'experiences.pillars.service.title': 'Servicio impecable',
    'experiences.pillars.service.desc': 'Cálido, preciso y discreto — hospitalidad en su mejor versión.',
    'experiences.ribbon.1': 'Asia • Europa • Caribe',
    'experiences.ribbon.2': 'Cenas privadas & pop-ups',
    'experiences.ribbon.3': 'Menús degustación a medida',
    'experiences.ribbon.4': 'ES / EN',

    'menus.title': 'Menús de muestra',
    'menus.light': 'Ligero & Saludable',
    'menus.signature': 'Celebración & Firma',

    'gallery.title': 'Galería',

    'cta.title': 'Diseñemos tu menú',
    'cta.subtitle': 'Cuéntanos fecha, lugar, preferencias alimentarias y número de comensales.',
    'cta.button': 'Solicitar propuesta',

    // Footer
    'footer.powered': 'powered by Bittech Network',
    'footer.tagline': 'Diseñado con ingredientes de temporada, visión global y un servicio impecable.'
  }
}
export function t(key: string, lang: Lang){ return dict[lang][key] || key }
