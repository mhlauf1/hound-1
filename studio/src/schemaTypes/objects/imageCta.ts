import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const imageCta = defineType({
  name: 'imageCta',
  title: 'Image CTA',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity (0-1)',
      type: 'number',
      initialValue: 0.3,
      validation: (Rule) => Rule.min(0).max(1),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Image CTA',
        subtitle: 'Full-bleed CTA',
        media,
      }
    },
  },
})
