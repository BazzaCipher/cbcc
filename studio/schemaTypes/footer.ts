import {defineField, defineType} from 'sanity'
import {SquareIcon} from '@sanity/icons'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  icon: SquareIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'footerlogo',
      title: 'Footer Logo',
      type: 'customImage',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      media: 'logo.image.asset',
    },
    prepare(selection) {
      return {
        title: selection.text,
		media: selection.media
      }
    },
  },
})
