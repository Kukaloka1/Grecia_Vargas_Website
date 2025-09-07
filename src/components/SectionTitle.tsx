export default function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }){
  return (
    <div className="mb-8">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="mt-2 text-neutral-600 dark:text-neutral-300">{subtitle}</p>}
    </div>
  )
}
