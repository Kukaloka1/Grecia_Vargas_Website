import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

export default function Products(){
  return (
    <section className="section">
      <Container>
        <SectionTitle title="Services" subtitle="Studio dinners · Yacht chef · Villas & intimate events" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {title:'Studio Private Dining',desc:'Tasting menu at a private studio in central Barcelona.'},
            {title:'Yacht Chef',desc:'Seasonal market cuisine on board for guests & crew.'},
            {title:'Villas & Events',desc:'Private homes, villas and special celebrations.'}
          ].map(card=> (
            <div key={card.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up">
              <h3 className="font-bold mb-2">{card.title}</h3>
              <p className="text-sm opacity-80">{card.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
