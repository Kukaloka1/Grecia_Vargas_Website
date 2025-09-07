import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

export default function WhyUs(){
  return (
    <section id="experiences" className="section">
      <Container>
        <SectionTitle title="Experiences" subtitle="Studio private dining · Yacht chef · Villas & intimate events" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {['Studio Private Dining','Yacht Chef','Villas & Events'].map((k)=>(
            <div key={k} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up">
              <h3 className="font-bold mb-2">{k}</h3>
              <p className="text-sm opacity-80">Bespoke menus based on your preferences, seasonal produce and impeccable service.</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
