import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

export default function Problem(){
  return (
    <section id="menus" className="section">
      <Container>
        <SectionTitle title="Sample Menus" subtitle="Two lines: Healthy & Light · Celebration & Signature" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up">
            <h3 className="font-bold mb-2">Healthy & Light</h3>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li>Seasonal crudo with citrus & herbs</li>
              <li>Charred vegetables, yogurt & dukkah</li>
              <li>Catch of the day, fennel & olive oil jus</li>
              <li>Fruit granita & olive oil</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6" data-aos="fade-up" data-aos-delay="120">
            <h3 className="font-bold mb-2">Celebration & Signature</h3>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li>Tuna tartare, tomato water & basil</li>
              <li>Handmade pasta, seasonal pesto</li>
              <li>Slow-cooked lamb, rosemary & salsa verde</li>
              <li>Lemon posset, almond crumble</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
