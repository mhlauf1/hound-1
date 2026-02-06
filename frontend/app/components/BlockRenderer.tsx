import React from 'react'

import HeroSection from '@/app/components/sections/HeroSection'
import StatsIconBar from '@/app/components/sections/StatsIconBar'
import FeatureBlock from '@/app/components/sections/FeatureBlock'
import ComparisonTable from '@/app/components/sections/ComparisonTable'
import StatsBand from '@/app/components/sections/StatsBand'
import TestimonialsCarousel from '@/app/components/sections/TestimonialsCarousel'
import ImageCta from '@/app/components/sections/ImageCta'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

type BlocksType = {
  [key: string]: React.FC<BlockProps>
}

// Wrapper that passes `block` prop to new section components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapSection(Component: React.FC<{block: any}>) {
  return function SectionWrapper({block}: BlockProps) {
    return <Component block={block} />
  }
}

const Blocks = {
  heroSection: wrapSection(HeroSection),
  statsIconBar: wrapSection(StatsIconBar),
  featureBlock: wrapSection(FeatureBlock),
  comparisonTable: wrapSection(ComparisonTable),
  statsBand: wrapSection(StatsBand),
  testimonialsCarousel: wrapSection(TestimonialsCarousel),
  imageCta: wrapSection(ImageCta),
} as BlocksType

export default function BlockRenderer({block, index, pageId, pageType}: BlockProps) {
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
          pageId: pageId,
          pageType: pageType,
        })}
      </div>
    )
  }
  return React.createElement(
    () => (
      <div className="w-full bg-cream-dark text-center text-green/50 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    {key: block._key},
  )
}
