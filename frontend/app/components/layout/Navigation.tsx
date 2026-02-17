'use client'

import {useState} from 'react'
import {createPortal} from 'react-dom'
import Link from 'next/link'
import {Icon} from '@iconify/react'
import {AnimatePresence, motion} from 'framer-motion'
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
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-green/10">
      <div className="container">
        <nav className="hidden lg:grid grid-cols-3 items-center py-5">
          {/* Left: nav links */}
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.url || '/'}
                  className="font-sans text-sm text-green hover:underline underline-offset-4 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center: logo wordmark */}
          <Link href="/" className="flex flex-col items-center justify-self-center leading-none">
            <span className="font-serif text-xl font-light tracking-widest uppercase text-green">
              {siteName.split(' ').slice(0, -1).join(' ')}
            </span>
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green">
              {siteName.split(' ').slice(-1)[0]}
            </span>
          </Link>

          {/* Right: phone + CTA */}
          <div className="flex items-center justify-end gap-6">
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
        </nav>

        {/* Mobile nav */}
        <nav className="flex lg:hidden items-center justify-between py-5">
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-serif text-xl font-light tracking-widest uppercase text-green">
              {siteName.split(' ').slice(0, -1).join(' ')}
            </span>
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green">
              {siteName.split(' ').slice(-1)[0]}
            </span>
          </Link>
          <button
            className="p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Icon icon="lucide:menu" className="w-6 h-6 text-green" />
          </button>
        </nav>
      </div>

      {/* Mobile fullscreen overlay — portaled to body to escape header stacking context */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-nav"
                className="fixed inset-0 z-[100] bg-cream flex flex-col lg:hidden"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.25}}
              >
                {/* Top bar mirroring the header */}
                <div className="container flex items-center justify-between py-5 border-b border-green/10">
                  <Link
                    href="/"
                    className="flex flex-col items-center leading-none"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="font-serif text-xl font-light tracking-widest uppercase text-green">
                      {siteName.split(' ').slice(0, -1).join(' ')}
                    </span>
                    <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green">
                      {siteName.split(' ').slice(-1)[0]}
                    </span>
                  </Link>
                  <button
                    className="p-2"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <Icon icon="lucide:x" className="w-6 h-6 text-green" />
                  </button>
                </div>

                {/* Nav links */}
                <div className="container flex-1 flex flex-col justify-center gap-6 py-10">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link._key}
                      initial={{opacity: 0, y: 12}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: 0.1 + index * 0.05, duration: 0.3}}
                    >
                      <Link
                        href={link.url || '/'}
                        className="block font-serif text-3xl text-green"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom section */}
                <div className="container pb-10 space-y-5">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 font-sans text-base text-green"
                    >
                      <Icon icon="lucide:phone" className="w-4 h-4" />
                      {phone}
                    </a>
                  )}
                  <Button href="/contact" variant="primary" className="w-full">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  )
}
