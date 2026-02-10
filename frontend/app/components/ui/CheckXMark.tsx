import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
} | null

type CheckXMarkProps = {
  checked: boolean
  checkIcon?: SanityImageField
  xIcon?: SanityImageField
}

export default function CheckXMark({checked, checkIcon, xIcon}: CheckXMarkProps) {
  if (checked) {
    const iconId = checkIcon?.asset?._id || checkIcon?.asset?._ref
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow">
        {iconId ? (
          <Image id={iconId} alt="Yes" width={20} height={20} className="w-7 h-8" />
        ) : (
          <Icon icon="lucide:check" className="w-7 h-8 text-green" />
        )}
      </span>
    )
  }

  const iconId = xIcon?.asset?._id || xIcon?.asset?._ref
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-full"
      style={{backgroundColor: 'var(--color-cream-dark)'}}
    >
      {iconId ? (
        <Image id={iconId} alt="No" width={20} height={20} className="w-7 h-8" />
      ) : (
        <Icon icon="lucide:x" className="w-7 h-8" style={{color: 'var(--color-text-secondary)'}} />
      )}
    </span>
  )
}
