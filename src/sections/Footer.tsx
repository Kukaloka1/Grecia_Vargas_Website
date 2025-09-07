import Container from '../components/Container'
export default function Footer(){
  return (
    <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm opacity-80">
          <div>© {new Date().getFullYear()} Grecia Vargas · Private Chef — Barcelona</div>
          <div>Built with care — Bittech One-Shot v5</div>
        </div>
      </Container>
    </footer>
  )
}
