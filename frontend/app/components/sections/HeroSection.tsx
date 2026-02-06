import Image from '@/app/components/SanityImage'
import Button from '@/app/components/ui/Button'
import Container from '@/app/components/ui/Container'
import StarRating from '@/app/components/ui/StarRating'

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
  hotspot?: {x?: number; y?: number; width?: number; height?: number} | null
  crop?: {top?: number; bottom?: number; left?: number; right?: number} | null
} | null

type HeroSectionProps = {
  block: {
    ratingCount?: string | null
    headline?: string | null
    headlineEmphasis?: string | null
    subtext?: string | null
    ctaText?: string | null
    ctaUrl?: string | null
    microCopy?: string | null
    heroImage?: SanityImageField
  }
}

export default function HeroSection({block}: HeroSectionProps) {
  const {headline, headlineEmphasis, subtext, ctaText, ctaUrl, microCopy, ratingCount, heroImage} =
    block

  // Split headline into parts around the emphasis text
  let headlineParts: {text: string; italic: boolean}[] = []
  if (headline && headlineEmphasis && headline.includes(headlineEmphasis)) {
    const idx = headline.indexOf(headlineEmphasis)
    if (idx > 0) headlineParts.push({text: headline.slice(0, idx), italic: false})
    headlineParts.push({text: headlineEmphasis, italic: true})
    const after = headline.slice(idx + headlineEmphasis.length)
    if (after) headlineParts.push({text: after, italic: false})
  } else {
    headlineParts = [{text: headline || '', italic: false}]
  }

  return (
    <section className="py-20 lg:py-30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div className="space-y-6">
            {ratingCount && <StarRating count={5} text={ratingCount} />}

            <h1>
              {headlineParts.map((part, i) =>
                part.italic ? (
                  <em key={i} className="italic">
                    {part.text}
                  </em>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h1>

            {subtext && (
              <p
                className="text-lg lg:text-xl max-w-lg"
                style={{color: 'var(--color-text-secondary)'}}
              >
                {subtext}
              </p>
            )}

            {ctaText && (
              <div className="space-y-3">
                <Button href={ctaUrl || '#'} variant="primary">
                  {ctaText}
                </Button>
                {microCopy && (
                  <p className="text-sm font-sans" style={{color: 'var(--color-text-secondary)'}}>
                    {microCopy}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right column: hero image */}
          {heroImage?.asset && (heroImage.asset._id || heroImage.asset._ref) && (
            <div className="relative aspect-[3/4] rounded-xl border border-green overflow-hidden">
              <Image
                id={(heroImage.asset._id || heroImage.asset._ref) as string}
                alt="Hero image"
                className="object-cover w-full h-full"
                width={600}
                height={800}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
