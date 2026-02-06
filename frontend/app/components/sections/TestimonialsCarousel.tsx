import {Icon} from '@iconify/react'
import Container from '@/app/components/ui/Container'

type TestimonialsCarouselProps = {
  block: {
    headline?: string | null
    testimonials?: Array<{
      _key: string
      quote?: string | null
      name?: string | null
      descriptor?: string | null
    }> | null
  }
}

export default function TestimonialsCarousel({block}: TestimonialsCarouselProps) {
  const {headline, testimonials} = block
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20 lg:py-30 overflow-hidden">
      {/* Heading area */}
      <Container>
        <div className="text-center mb-12">
          <Icon icon="lucide:paw-print" className="w-8 h-8 text-green mx-auto mb-4" />
          {headline && <h2>{headline}</h2>}
        </div>
      </Container>

      {/* Horizontal scroll - breaks out of container for edge-to-edge feel */}
      <div className="relative px-5 lg:px-10">
        <div className="flex gap-4 overflow-x-auto scroll-snap-x-mandatory hide-scrollbar pb-4">
          {testimonials.map((t) => (
            <div
              key={t._key}
              className="bg-yellow rounded-xl p-6 min-w-[300px] max-w-[340px] flex-shrink-0 flex flex-col justify-between scroll-snap-start"
              style={{scrollSnapAlign: 'start'}}
            >
              <div>
                <Icon icon="lucide:paw-print" className="w-6 h-6 text-green mb-4" />
                <p className="font-sans text-base text-green leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6">
                <span className="font-sans font-medium text-sm text-green">
                  {t.name}
                  {t.descriptor && <>, {t.descriptor}</>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
