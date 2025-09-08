import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { Sparkles, Music, Leaf, Globe2, Handshake } from 'lucide-react'

export default function WhyUs(){
  return (
    <section id="experiences" className="section">
      <Container>
        <SectionTitle
          title="Experiences"
          subtitle="Private dining & global pop-ups designed as sensory journeys — product-first cuisine, elegant pacing and an atmosphere you feel with every sense."
        />

        {/* Lead descriptivo */}
        <p className="mb-8 text-base leading-relaxed text-[#372549]">
          Venezuelan–Spanish and based in Barcelona, Grecia builds Mediterranean menus with a truly global lens.
          Each experience blends product-driven cooking with guided moments — music curation, lighting, tablescapes and a service cadence that turns dinner into a narrative.
        </p>

        {/* Grid principal (conserva tus 3 bloques, ahora vitaminados) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Studio Private Dining */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="opacity-80" />
              <h3 className="font-bold">Studio Private Dining</h3>
            </div>
            <p className="text-sm opacity-80">
              Bespoke tasting menus in an intimate setting. Thoughtful pacing, table-side touches and
              a soundtrack that supports each course.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="opacity-80">• Seasonal, market-led produce</li>
              <li className="opacity-80">• 6–14 guests (ideal)</li>
              <li className="opacity-80">• Candlelight & curated sound</li>
            </ul>
          </div>

          {/* Yacht Chef */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up" data-aos-delay="80">
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={18} className="opacity-80" />
              <h3 className="font-bold">Yacht Chef</h3>
            </div>
            <p className="text-sm opacity-80">
              Sea-to-table elegance: light, precise menus for guests & crew, with discreet, seamless service from dawn to dusk.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="opacity-80">• Local sourcing at each port</li>
              <li className="opacity-80">• Breakfast to late service</li>
              <li className="opacity-80">• Wellness-minded options</li>
            </ul>
          </div>

          {/* Villas & Events */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up" data-aos-delay="160">
            <div className="flex items-center gap-2 mb-2">
              <Handshake size={18} className="opacity-80" />
              <h3 className="font-bold">Villas & Events</h3>
            </div>
            <p className="text-sm opacity-80">
              Intimate celebrations at residences and boutique venues — live finishing, beautiful plating and warm, attentive hosting.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="opacity-80">• Tailored to the occasion</li>
              <li className="opacity-80">• Signature dessert finales</li>
              <li className="opacity-80">• Coordinated table styling</li>
            </ul>
          </div>
        </div>

        {/* Bloque “Signature elements” (multi-sensorialidad) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up">
            <div className="flex items-center gap-2 mb-1">
              <Leaf size={18} className="opacity-80" /><span className="font-semibold">Product-first</span>
            </div>
            <p className="text-sm opacity-80">Seasonality and provenance lead every decision.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up" data-aos-delay="60">
            <div className="flex items-center gap-2 mb-1">
              <Music size={18} className="opacity-80" /><span className="font-semibold">Multi-sensory flow</span>
            </div>
            <p className="text-sm opacity-80">Sound, light and pacing designed to heighten flavor.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up" data-aos-delay="120">
            <div className="flex items-center gap-2 mb-1">
              <Globe2 size={18} className="opacity-80" /><span className="font-semibold">Global pop-ups</span>
            </div>
            <p className="text-sm opacity-80">Influences from Japan, Thailand, the Caribbean and Europe.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5" data-aos="fade-up" data-aos-delay="180">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="opacity-80" /><span className="font-semibold">Impeccable service</span>
            </div>
            <p className="text-sm opacity-80">Warm, precise, unobtrusive — hospitality at its best.</p>
          </div>
        </div>

        {/* Cinta de “scope” global */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up">Asia • Europe • Caribbean</div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up" data-aos-delay="60">Private dinners & pop-ups</div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up" data-aos-delay="120">Bespoke tasting menus</div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm text-center" data-aos="fade-up" data-aos-delay="180">ES / EN</div>
        </div>

        {/* Mini CTA contextual */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button href="#contact">Check availability</Button>
          <Button variant="ghost" href="https://wa.me/0000000000">WhatsApp</Button>
        </div>
      </Container>
    </section>
  )
}
