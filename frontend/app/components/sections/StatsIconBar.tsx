import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'
import Container from '@/app/components/ui/Container'

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
} | null

type StatsIconBarProps = {
  block: {
    items?: Array<{
      _key: string
      icon?: SanityImageField
      iconFallback?: string | null
      label?: string | null
    }> | null
  }
}

export default function StatsIconBar({block}: StatsIconBarProps) {
  const items = block.items
  if (!items || items.length === 0) return null

  return (
    <section className="border-t border-green/20">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {items.map((item) => (
            <div key={item._key} className="flex flex-col items-center text-center gap-3">
              <div className="size-14 md:size-20 flex items-center justify-center">
                {item.icon?.asset && (item.icon.asset._id || item.icon.asset._ref) ? (
                  <Image
                    id={(item.icon.asset._id || item.icon.asset._ref) as string}
                    alt={item.label || ''}
                    width={48}
                    height={48}
                    className="size-14 md:size-20"
                  />
                ) : item.iconFallback ? (
                  <Icon icon={item.iconFallback} className="w-10 h-10 text-green" />
                ) : null}
              </div>
              <span className="font-serif max-w-[20ch] font-medium text-md md:text-xl uppercase  text-green">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
