import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import Container from '@/app/components/ui/Container'

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
  hotspot?: {x?: number; y?: number; width?: number; height?: number} | null
  crop?: {top?: number; bottom?: number; left?: number; right?: number} | null
} | null

type FeatureBlockProps = {
  block: {
    image?: SanityImageField
    imagePosition?: string | null
    headline?: string | null
    ctaText?: string | null
    ctaUrl?: string | null
    ctaVariant?: string | null
    label?: string | null
    listItems?: Array<{
      _key: string
      icon?: string | null
      text?: string | null
    }> | null
  }
}

export default function FeatureBlock({block}: FeatureBlockProps) {
  const {image, imagePosition = 'left', headline, ctaText, ctaUrl, label, listItems} = block
  const isImageRight = imagePosition === 'right'

  const imageId = image?.asset?._id || image?.asset?._ref
  const imageEl = imageId ? (
    <div className="relative aspect-5/6 border-2 border-green  rounded-xl overflow-hidden">
      <Image
        id={imageId}
        alt={headline || 'Feature image'}
        className="object-cover w-full h-full"
        width={640}
        height={480}
      />
    </div>
  ) : null

  const contentEl = (
    <div className="flex flex-col justify-center space-y-6">
      {headline && <h2 className="md:max-w-[15ch]">{headline}</h2>}

      {ctaText && (
        <div>
          <Button href={ctaUrl || '#'}>{ctaText}</Button>
        </div>
      )}

      {label && <Badge className=" mt-6">{label}</Badge>}

      {listItems && listItems.length > 0 && (
        <ul className="space-y-4 md:space-y-6">
          {listItems.map((item) => (
            <li
              key={item._key}
              className="flex  pt-4 md:pt-6 border-green/20 border-t items-center gap-4"
            >
              {item.icon && <Icon icon={item.icon} className="w-6 h-6 text-green shrink-0" />}
              <span className="font-sans font-medium text-lg text-green">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={isImageRight ? 'order-2' : 'order-1'}>{imageEl}</div>
          <div className={isImageRight ? 'order-1' : 'order-2'}>{contentEl}</div>
        </div>
      </Container>
    </section>
  )
}
