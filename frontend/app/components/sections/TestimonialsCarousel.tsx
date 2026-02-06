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
    <section className="py-20 lg:py-36 overflow-hidden">
      {/* Heading area */}
      <Container>
        <div className="text-center flex justify-center flex-col  mb-12 md:mb-16">
          <Icon icon="lucide:paw-print" className="w-8 h-8 text-green mx-auto mb-4" />
          {headline && <h2 className="max-w-[12ch] mx-auto">{headline}</h2>}
        </div>
      </Container>

      {/* Horizontal scroll - breaks out of container for edge-to-edge feel */}
      <div className="relative px-5 lg:px-10">
        <div className="flex gap-4 overflow-x-auto scroll-snap-x-mandatory hide-scrollbar pb-4">
          {testimonials.map((t) => (
            <div
              key={t._key}
              className="bg-yellow rounded-xl p-6 border border-green min-w-[300px] max-w-[340px] shrink-0 flex flex-col justify-between items-center scroll-snap-start"
              style={{scrollSnapAlign: 'start'}}
            >
              <div className="w-full flex flex-col items-center">
                <Icon icon="lucide:paw-print" className="w-6 h-6 text-green mb-4" />
                <p className="font-sans text-base text-green text-center leading-relaxed">
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
