import {Icon} from '@iconify/react'
import Container from '@/app/components/ui/Container'

type StatsBandProps = {
  block: {
    showLogo?: boolean | null
    stats?: Array<{
      _key: string
      value?: string | null
      label?: string | null
      icon?: string | null
    }> | null
  }
}

export default function StatsBand({block}: StatsBandProps) {
  const {showLogo, stats} = block
  if (!stats || stats.length === 0) return null

  return (
    <section className="bg-yellow py-12 lg:py-16 border-y-4 border-cream">
      <Container>
        {showLogo && (
          <div className="text-center mb-8">
            <span className="font-serif text-xl font-light tracking-widest uppercase text-green block">
              Hound Around
            </span>
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green block">
              Resort
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat._key}
              className="bg-cream rounded-xl border border-green p-6 text-center"
            >
              <div className="font-serif font-light text-5xl text-green flex items-center justify-center gap-2">
                {stat.value}
                {stat.icon === 'star' && (
                  <Icon icon="lucide:star" className="w-8 h-8 text-green fill-green inline-block" />
                )}
              </div>
              <div className="font-sans font-medium text-sm uppercase tracking-[0.05em] text-green mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
