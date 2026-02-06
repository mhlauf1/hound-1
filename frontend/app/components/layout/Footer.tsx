import Link from 'next/link'
import type {SettingsQueryResult} from '@/sanity.types'
import Container from '@/app/components/ui/Container'

type SiteFooterProps = {
  settings: SettingsQueryResult
}

export default function SiteFooter({settings}: SiteFooterProps) {
  const footer = settings?.footer
  const siteName = settings?.title || 'Hound Around Resort'

  return (
    <footer className="bg-cream border-t border-green">
      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1 lg:pr-8">
              <Link href="/" className="inline-block mb-4">
                <span className="font-serif text-xl font-light tracking-widest uppercase text-green block">
                  {siteName.split(' ').slice(0, -1).join(' ')}
                </span>
                <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-green block">
                  {siteName.split(' ').slice(-1)[0]}
                </span>
              </Link>
              {footer?.tagline && (
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{color: 'var(--color-text-secondary)'}}
                >
                  {footer.tagline}
                </p>
              )}
            </div>

            {/* Dynamic link columns */}
            {footer?.columns?.map((column) => (
              <div key={column._key}>
                <h4 className="font-sans font-medium text-base text-green mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links?.map((link) => (
                    <li key={link._key}>
                      <Link
                        href={link.url || '/'}
                        className="font-sans text-sm hover:underline underline-offset-2"
                        style={{color: 'var(--color-text-secondary)'}}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column (from footer doc) */}
            {(footer?.address || footer?.phone || footer?.email) && (
              <div>
                <h4 className="font-sans font-medium text-base text-green mb-4">Contact</h4>
                <div className="space-y-2 font-sans text-sm" style={{color: 'var(--color-text-secondary)'}}>
                  {footer.address && <p className="whitespace-pre-line">{footer.address}</p>}
                  {footer.phone && (
                    <p>
                      <a href={`tel:${footer.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                        {footer.phone}
                      </a>
                    </p>
                  )}
                  {footer.email && (
                    <p>
                      <a href={`mailto:${footer.email}`} className="hover:underline">
                        {footer.email}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green/20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm" style={{color: 'var(--color-text-secondary)'}}>
          <p>
            {footer?.copyrightText || `© ${new Date().getFullYear()} ${siteName}.`}
            {footer?.parentCompany && (
              <>
                {' '}
                Part of the{' '}
                {footer.parentCompanyUrl ? (
                  <a href={footer.parentCompanyUrl} className="font-medium text-green hover:underline" target="_blank" rel="noopener noreferrer">
                    {footer.parentCompany}
                  </a>
                ) : (
                  <span className="font-medium text-green">{footer.parentCompany}</span>
                )}{' '}
                family.
              </>
            )}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
