import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'
import Container from '@/app/components/ui/Container'

type Testimonial = {
  _key: string
  quote?: string | null
  name?: string | null
  descriptor?: string | null
}

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
} | null

type TestimonialsCarouselProps = {
  block: {
    icon?: SanityImageField
    headline?: string | null
    testimonials?: Array<Testimonial> | null
  }
}

function TestimonialCard({t}: {t: Testimonial}) {
  return (
    <div className="bg-yellow rounded-xl p-6 border border-green min-w-[300px] max-w-[340px] shrink-0 flex flex-col justify-between items-center">
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
  )
}

export default function TestimonialsCarousel({block}: TestimonialsCarouselProps) {
  const {icon, headline, testimonials} = block
  const iconAssetId = icon?.asset?._id || icon?.asset?._ref

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="group py-20 lg:py-36 overflow-hidden">
      {/* Heading area */}
      <Container>
        <div className="text-center flex justify-center flex-col mb-12 md:mb-16">
          {iconAssetId ? (
            <Image
              id={iconAssetId}
              alt=""
              width={32}
              height={32}
              className="size-12 md:size-14 mx-auto mb-4"
            />
          ) : (
            <Icon icon="lucide:paw-print" className="w-8 h-8 text-green mx-auto mb-4" />
          )}
          {headline && <h2 className="max-w-[12ch] mx-auto">{headline}</h2>}
        </div>
      </Container>

      {/* Auto-scrolling marquee */}
      <div className="relative px-5 lg:px-10">
        <div className="flex gap-4 w-max animate-marquee">
          {testimonials.map((t) => (
            <TestimonialCard key={t._key} t={t} />
          ))}
          {/* Duplicated set for seamless loop */}
          {testimonials.map((t) => (
            <div key={`dup-${t._key}`} aria-hidden="true">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
