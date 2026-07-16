import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

// A single editable before/after comparison: two images the slider wipes
// between, plus optional labels and a caption. Used by beforeAfterSection.
export default defineType({
  name: 'beforeAfter',
  title: 'Before / after',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'beforeImage',
      title: 'Before image',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After image',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'beforeLabel',
      title: 'Before label',
      type: 'string',
      initialValue: 'Before',
    }),
    defineField({
      name: 'afterLabel',
      title: 'After label',
      type: 'string',
      initialValue: 'After',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'afterImage.image.asset',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Before / after',
        subtitle,
        media,
      }
    },
  },
})
