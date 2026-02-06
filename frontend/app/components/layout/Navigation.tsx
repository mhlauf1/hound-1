'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Icon} from '@iconify/react'
import type {SettingsQueryResult} from '@/sanity.types'
import Button from '@/app/components/ui/Button'

type NavigationProps = {
  settings: SettingsQueryResult
}

export default function Navigation({settings}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navLinks = settings?.navigation ?? []
  const phone = settings?.phone
  const siteName = settings?.title || 'Hound Around Resort'

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-green/10">
      <div className="container">
        <nav className="flex items-center justify-between py-5">
          {/* Left: nav links (desktop) */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.url || '/'}
                  className="font-sans text-base text-green hover:underline underline-offset-4 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center: logo wordmark */}
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-serif text-xl font-light tracking-widest uppercase text-green">
              {siteName.split(' ').slice(0, -1).join(' ')}
            </span>
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green">
              {siteName.split(' ').slice(-1)[0]}
            </span>
          </Link>

          {/* Right: phone + CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="font-sans text-base text-green flex items-center gap-2"
              >
                <Icon icon="lucide:phone" className="w-4 h-4" />
                {phone}
              </a>
            )}
            <Button href="/contact" variant="outline">
              Book Now
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Icon icon={mobileOpen ? 'lucide:x' : 'lucide:menu'} className="w-6 h-6 text-green" />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream border-t border-green/10">
          <div className="container py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link._key}
                href={link.url || '/'}
                className="block font-sans text-lg text-green py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="block font-sans text-lg text-green py-2"
              >
                {phone}
              </a>
            )}
            <Button href="/contact" variant="outline" className="w-full">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
