import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'competitors',
      title: 'Competitor Column Names',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'e.g. "Traditional Kennels", "Basic Daycares"',
    }),
    defineField({
      name: 'highlightColumnName',
      title: 'Highlighted Column Name',
      type: 'string',
      description: 'Your brand column name (e.g. "Hound Around Resort")',
    }),
    defineField({
      name: 'checkIcon',
      title: 'Check Icon',
      type: 'image',
      description: 'Custom icon for "true" cells (falls back to default check icon)',
    }),
    defineField({
      name: 'xIcon',
      title: 'X Icon',
      type: 'image',
      description: 'Custom icon for "false" cells (falls back to default X icon)',
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'values',
              title: 'Values (true/false for each column)',
              type: 'array',
              of: [defineArrayMember({type: 'boolean'})],
              description: 'One boolean per competitor column + highlight column (in order)',
            }),
          ],
          preview: {
            select: {title: 'feature'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {
        title: title || 'Comparison Table',
        subtitle: 'Comparison',
      }
    },
  },
})
