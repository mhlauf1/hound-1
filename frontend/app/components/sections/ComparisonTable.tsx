import CheckXMark from '@/app/components/ui/CheckXMark'
import Container from '@/app/components/ui/Container'

type ComparisonTableProps = {
  block: {
    headline?: string | null
    subheadline?: string | null
    competitors?: Array<string> | null
    highlightColumnName?: string | null
    rows?: Array<{
      _key: string
      feature?: string | null
      values?: Array<boolean> | null
    }> | null
  }
}

export default function ComparisonTable({block}: ComparisonTableProps) {
  const {headline, subheadline, competitors = [], highlightColumnName, rows = []} = block
  const totalCols = (competitors?.length || 0) + 1 // competitors + highlight

  return (
    <section className="py-20 lg:py-30">
      <Container>
        <div className="max-w-[900px] mx-auto">
          {headline && <h2 className="text-center mb-4">{headline}</h2>}
          {subheadline && (
            <p
              className="text-center text-lg mb-12"
              style={{color: 'var(--color-text-secondary)'}}
            >
              {subheadline}
            </p>
          )}

          {/* Table container with dashed border */}
          <div
            className="rounded-xl overflow-x-auto"
            style={{border: '1px dashed var(--color-border-dashed)'}}
          >
            <table className="w-full">
              <thead>
                <tr>
                  {/* Empty feature label header */}
                  <th className="p-4 text-left w-[200px]" />
                  {/* Competitor columns */}
                  {competitors?.map((name, i) => (
                    <th
                      key={i}
                      className="p-4 text-center font-sans font-medium text-sm uppercase tracking-[0.05em] text-green"
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
                  <tr
                    key={row._key}
                    style={{borderBottom: '1px dashed var(--color-border-dashed)'}}
                  >
                    <td className="p-4 font-sans font-medium text-sm uppercase tracking-[0.05em] text-green">
                      {row.feature}
                    </td>
                    {row.values?.map((val, i) => {
                      const isHighlight = i === totalCols - 1
                      return (
                        <td
                          key={i}
                          className={`p-4 text-center ${isHighlight ? 'bg-yellow' : ''}`}
                        >
                          <div className="flex justify-center">
                            <CheckXMark checked={val} />
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
