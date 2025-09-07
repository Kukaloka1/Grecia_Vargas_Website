import Container from '../components/Container'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

export default function CTA(){
  return (
    <section id="contact" className="section">
      <Container>
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 md:p-10 text-center" data-aos="fade-up">
          <SectionTitle title="Let’s craft your menu" subtitle="Tell us your date, location, dietary preferences and guest count." />
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="mailto:hello@greciavargas.example.com">Request proposal</Button>
            <Button variant="ghost" href="https://wa.me/0000000000">WhatsApp</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
