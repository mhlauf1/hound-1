import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {footer} from './documents/footer'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {announcementBar} from './objects/announcementBar'
import {heroSection} from './objects/heroSection'
import {statsIconBar} from './objects/statsIconBar'
import {featureBlock} from './objects/featureBlock'
import {comparisonTable} from './objects/comparisonTable'
import {statsBand} from './objects/statsBand'
import {testimonialsCarousel} from './objects/testimonialsCarousel'
import {imageCta} from './objects/imageCta'

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  footer,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  link,
  announcementBar,
  heroSection,
  statsIconBar,
  featureBlock,
  comparisonTable,
  statsBand,
  testimonialsCarousel,
  imageCta,
]
