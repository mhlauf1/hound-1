import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  ...,
  footer->{
    _id,
    _type,
    tagline,
    columns,
    address,
    phone,
    email,
    copyrightText,
    parentCompany,
    parentCompanyUrl
  }
}`)

const pageBuilderExpansion = /* groq */ `
  "pageBuilder": pageBuilder[]{
    ...,
    _type == "heroSection" => {
      ...,
      heroImage {
        ...,
        asset->
      }
    },
    _type == "statsIconBar" => {
      ...,
      items[]{
        ...,
        icon {
          ...,
          asset->
        }
      }
    },
    _type == "featureBlock" => {
      ...,
      image {
        ...,
        asset->
      }
    },
    _type == "comparisonTable" => {
      ...,
      checkIcon {
        ...,
        asset->
      },
      xIcon {
        ...,
        asset->
      }
    },
    _type == "testimonialsCarousel" => {
      ...,
      icon {
        ...,
        asset->
      }
    },
    _type == "imageCta" => {
      ...,
      backgroundImage {
        ...,
        asset->
      }
    },
  }
`

export const homepageQuery = defineQuery(`
  *[_type == 'page' && slug.current == 'home'][0]{
    _id,
    _type,
    name,
    slug,
    ${pageBuilderExpansion},
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    ${pageBuilderExpansion},
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
