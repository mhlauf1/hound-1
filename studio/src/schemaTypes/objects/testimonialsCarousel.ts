import {defineField, defineType, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const testimonialsCarousel = defineType({
  name: 'testimonialsCarousel',
  title: 'Testimonials Carousel',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Person Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'descriptor',
              title: 'Descriptor',
              type: 'string',
              description: 'e.g. "Multi-dog family", "Dog parent"',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'quote',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {
        title: title || 'Testimonials Carousel',
        subtitle: 'Testimonials',
      }
    },
  },
})
