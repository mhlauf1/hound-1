import {defineField, defineType, defineArrayMember} from 'sanity'
import {ActivityIcon} from '@sanity/icons'

export const statsIconBar = defineType({
  name: 'statsIconBar',
  title: 'Stats Icon Bar',
  type: 'object',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon SVG',
              type: 'image',
              description: 'Custom SVG icon (optional)',
            }),
            defineField({
              name: 'iconFallback',
              title: 'Iconify Icon Name',
              type: 'string',
              description: 'Fallback Iconify icon name (e.g. "tabler:shield-check")',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Stats Icon Bar',
      }
    },
  },
})
