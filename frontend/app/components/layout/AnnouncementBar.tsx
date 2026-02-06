import Link from 'next/link'
import type {SettingsQueryResult} from '@/sanity.types'

type AnnouncementBarProps = {
  settings: SettingsQueryResult
}

export default function AnnouncementBar({settings}: AnnouncementBarProps) {
  const bar = settings?.announcementBar
  if (!bar?.isVisible || !bar.text) return null

  return (
    <div className="bg-green text-cream py-2.5 text-center font-sans text-sm font-medium">
      <span>{bar.text} </span>
      {bar.linkText && bar.linkUrl && (
        <Link href={bar.linkUrl} className="font-bold underline underline-offset-2">
          {bar.linkText}
        </Link>
      )}
    </div>
  )
}
