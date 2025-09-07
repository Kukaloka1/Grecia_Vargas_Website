import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

export default function Gallery(){
  return (
    <section id="gallery" className="section">
      <Container>
        <SectionTitle title="Gallery" subtitle="A glimpse of plates, table styling and ambience." />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({length:8}).map((_,i)=> (
            <div key={i} className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900" data-aos="fade-up">
              <img className="h-full w-full object-cover" src={`/images/gallery/ph-${i+1}.jpg`} alt="Placeholder"/>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
