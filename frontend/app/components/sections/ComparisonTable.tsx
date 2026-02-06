import CheckXMark from '@/app/components/ui/CheckXMark'
import Container from '@/app/components/ui/Container'

type SanityImageField = {
  asset?: {_id?: string; _ref?: string} | null
} | null

type ComparisonTableProps = {
  block: {
    headline?: string | null
    subheadline?: string | null
    competitors?: Array<string> | null
    highlightColumnName?: string | null
    checkIcon?: SanityImageField
    xIcon?: SanityImageField
    rows?: Array<{
      _key: string
      feature?: string | null
      values?: Array<boolean> | null
    }> | null
  }
}

export default function ComparisonTable({block}: ComparisonTableProps) {
  const {headline, subheadline, competitors = [], highlightColumnName, checkIcon, xIcon, rows = []} = block
  const totalCols = (competitors?.length || 0) + 1 // competitors + highlight

  return (
    <section className="py-20 lg:py-30">
      <Container>
        <div className="max-w-[1380px] mx-auto flex flex-col items-center bg-cream-dark rounded-xl border border-green py-6 px-2 md:p-12 lg:p-16">
          {headline && (
            <h2 className="text-center max-w-[14ch] md:max-w-[26ch] md:mt-6 mb-4">{headline}</h2>
          )}
          {subheadline && (
            <p
              className="text-center text-lg mt-4 mb-12"
              style={{color: 'var(--color-text-secondary)'}}
            >
              {subheadline}
            </p>
          )}

          {/* Mobile table: 3 columns — Feature | Others | Highlight */}
          <div className="overflow-x-auto w-full px-4 md:hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-3 text-left" />
                  <th className="p-3 text-center font-serif font-medium text-base uppercase tracking-[0.05em] text-green">
                    Others
                  </th>
                  <th className="p-3 text-center bg-yellow rounded-t-lg">
                    <span className="font-serif text-lg font-light tracking-widest uppercase text-green block leading-tight">
                      {highlightColumnName?.split(' ').slice(0, -1).join(' ')}
                    </span>
                    <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-green block">
                      {highlightColumnName?.split(' ').slice(-1)[0]}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row) => {
                  const competitorValues = row.values?.slice(0, -1) ?? []
                  const othersValue = competitorValues.length > 0 && competitorValues.every(Boolean)
                  const highlightValue = row.values?.[row.values.length - 1] ?? false

                  return (
                    <tr key={row._key} className="border-t border-green/20">
                      <td className="p-3 font-serif text-base uppercase text-green">
                        {row.feature}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center">
                          <CheckXMark checked={othersValue} checkIcon={checkIcon} xIcon={xIcon} />
                        </div>
                      </td>
                      <td className="p-3 text-center bg-yellow">
                        <div className="flex justify-center">
                          <CheckXMark checked={highlightValue} checkIcon={checkIcon} xIcon={xIcon} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Desktop table: full multi-column layout */}
          <div className="overflow-x-auto w-full px-8 hidden md:block">
            <table className="w-full">
              <thead>
                <tr>
                  {/* Empty feature label header */}
                  <th className="p-4 text-left w-[200px]" />
                  {/* Competitor columns */}
                  {competitors?.map((name, i) => (
                    <th
                      key={i}
                      className="p-4 text-center font-serif font-medium text-base uppercase tracking-[0.05em] text-green"
                    >
                      {name}
                    </th>
                  ))}
                  {/* Highlight column */}
                  <th className="p-4 text-center bg-yellow rounded-t-lg">
                    <span className="font-serif text-lg font-light tracking-widest uppercase text-green block leading-tight">
                      {highlightColumnName?.split(' ').slice(0, -1).join(' ')}
                    </span>
                    <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-green block">
                      {highlightColumnName?.split(' ').slice(-1)[0]}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row) => (
                  <tr key={row._key} className="border-t border-green/20">
                    <td className="p-4 font-serif text-xl uppercase text-green">{row.feature}</td>
                    {row.values?.map((val, i) => {
                      const isHighlight = i === totalCols - 1
                      return (
                        <td key={i} className={`p-4 text-center ${isHighlight ? 'bg-yellow' : ''}`}>
                          <div className="flex justify-center">
                            <CheckXMark checked={val} checkIcon={checkIcon} xIcon={xIcon} />
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}
