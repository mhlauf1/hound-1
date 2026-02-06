import {defineField, defineType} from 'sanity'

export const announcementBar = defineType({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Announcement Text',
      type: 'string',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'The clickable text portion (e.g. "here")',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
    }),
    defineField({
      name: 'isVisible',
      title: 'Show Announcement Bar',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
