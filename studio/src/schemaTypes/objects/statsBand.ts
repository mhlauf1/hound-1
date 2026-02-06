import {defineField, defineType, defineArrayMember} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

export const statsBand = defineType({
  name: 'statsBand',
  title: 'Stats Band',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'showLogo',
      title: 'Show Logo Above Stats',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Stat Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Stat Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Optional Icon',
              type: 'string',
              description: 'e.g. "star" for a star icon next to the value',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
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
        title: 'Stats Band',
        subtitle: 'Yellow stats section',
      }
    },
  },
})
