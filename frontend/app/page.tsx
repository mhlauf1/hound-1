import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {homepageQuery} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'

export default async function Page() {
  const {data: page} = await sanityFetch({
    query: homepageQuery,
  })

  if (!page?._id) {
    return (
      <div className="container py-40 text-center">
        <h1 className="mb-4">Welcome to Hound Around Resort</h1>
        <p style={{color: 'var(--color-text-secondary)'}}>
          Create a page with the slug &ldquo;home&rdquo; in Sanity Studio to get started.
        </p>
      </div>
    )
  }

  return <PageBuilderPage page={page as GetPageQueryResult} />
}
