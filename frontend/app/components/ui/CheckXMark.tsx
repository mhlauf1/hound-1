import {Icon} from '@iconify/react'

type CheckXMarkProps = {
  checked: boolean
}

export default function CheckXMark({checked}: CheckXMarkProps) {
  if (checked) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow">
        <Icon icon="lucide:check" className="w-5 h-5 text-green" />
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-full"
      style={{backgroundColor: 'var(--color-cream-dark)'}}
    >
      <Icon icon="lucide:x" className="w-5 h-5" style={{color: 'var(--color-text-secondary)'}} />
    </span>
  )
}
