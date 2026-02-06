import Image from '@/app/components/SanityImage'
import Button from '@/app/components/ui/Button'

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
  hotspot?: {x?: number; y?: number; width?: number; height?: number} | null
  crop?: {top?: number; bottom?: number; left?: number; right?: number} | null
} | null

type ImageCtaProps = {
  block: {
    headline?: string | null
    ctaText?: string | null
    ctaUrl?: string | null
    backgroundImage?: SanityImageField
    overlayOpacity?: number | null
  }
}

export default function ImageCta({block}: ImageCtaProps) {
  const {headline, ctaText, ctaUrl, backgroundImage, overlayOpacity = 0.3} = block

  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
      {/* Background image */}
      {backgroundImage?.asset && (backgroundImage.asset._id || backgroundImage.asset._ref) && (
        <div className="absolute inset-0">
          <Image
            id={(backgroundImage.asset._id || backgroundImage.asset._ref) as string}
            alt=""
            className="object-cover w-full h-full"
            width={1920}
            height={800}
          />
        </div>
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{backgroundColor: `rgba(0, 0, 0, ${overlayOpacity ?? 0.3})`}}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 py-20">
        {headline && (
          <h1 className="text-cream italic mb-8 max-w-3xl mx-auto">{headline}</h1>
        )}
        {ctaText && (
          <Button href={ctaUrl || '#'} variant="primary">
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  )
}
