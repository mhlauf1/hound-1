import {defineField, defineType, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const featureBlock = defineType({
  name: 'featureBlock',
  title: 'Feature Block',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'string',
    }),
    defineField({
      name: 'ctaVariant',
      title: 'CTA Style',
      type: 'string',
      initialValue: 'secondary',
      options: {
        list: [
          {title: 'Primary (Yellow)', value: 'primary'},
          {title: 'Secondary (Green)', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
        ],
      },
    }),
    defineField({
      name: 'label',
      title: 'Section Label (badge)',
      type: 'string',
      description: 'Uppercase badge text above the list',
    }),
    defineField({
      name: 'listItems',
      title: 'Feature List',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Iconify Icon Name',
              type: 'string',
              description: 'e.g. "lucide:hotel", "lucide:scissors"',
            }),
            defineField({
              name: 'text',
              title: 'Item Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'text'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Feature Block',
        subtitle: 'Feature',
        media,
      }
    },
  },
})
