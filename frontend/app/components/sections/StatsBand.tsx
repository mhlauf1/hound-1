import {Icon} from '@iconify/react'
import Container from '@/app/components/ui/Container'
import {FadeIn} from '@/app/components/ui/FadeIn'

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
    <section className="bg-yellow/25 py-12 lg:py-20 border-y border-green/20">
      <Container>
        {showLogo && (
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <span className="font-serif text-2xl font-light tracking-widest uppercase text-green block">
                Hound Around
              </span>
              <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green block">
                Resort
              </span>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <FadeIn key={stat._key} delay={index * 0.1}>
              <div
                className="bg-cream h-50 flex justify-center flex-col gap-2 rounded-xl border border-green/50 p-6 text-center"
              >
                <div className="font-serif font-light text-6xl text-green flex items-center justify-center gap-2">
                  {stat.value}
                  {stat.icon === 'star' && (
                    <Icon icon="lucide:star" className="w-8 h-8 text-green fill-green inline-block" />
                  )}
                </div>
                <div className="font-sans text-sm  text-green mt-2">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
