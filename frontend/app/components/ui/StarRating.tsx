import {Icon} from '@iconify/react'

type StarRatingProps = {
  count?: number
  text?: string
}

export default function StarRating({count = 5, text}: StarRatingProps) {
  return (
    <div className="flex items-start flex-col gap-2">
      <div className="flex gap-0.5">
        {Array.from({length: count}).map((_, i) => (
          <Icon
            key={i}
            icon="mdi:star"
            className="size-5 md:size-6 text-yellow"
            style={{filter: 'drop-shadow(0 0 0.5px var(--color-green))'}}
          />
        ))}
      </div>
      {text && (
        <span
          className="font-sans font-medium text-sm"
          style={{color: 'var(--color-text-secondary)'}}
        >
          {text}
        </span>
      )}
    </div>
  )
}
