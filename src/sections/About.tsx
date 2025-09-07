import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import { useLang, t } from '../lib/i18n'

export default function About(){
  const lang = useLang()
  return (
    <section id="about" className="section">
      <Container>
        <SectionTitle title={t('about.title', lang)} subtitle={t('about.p1', lang)} />
      </Container>
    </section>
  )
}
