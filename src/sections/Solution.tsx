import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

export default function Solution(){
  return (
    <section className="section">
      <Container>
        <SectionTitle title="How it works" subtitle="Brief → Bespoke menu → Sourcing → Service → Cleanup" />
        <div className="grid gap-6 md:grid-cols-5">
          {['Brief','Menu','Sourcing','Service','Cleanup'].map((k,i)=>(
            <div key={k} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 text-center" data-aos="fade-up">
              <div className="text-2xl font-extrabold">0{i+1}</div>
              <div className="mt-2 font-semibold">{k}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
