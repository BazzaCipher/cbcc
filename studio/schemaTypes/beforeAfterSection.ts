import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'
import {SECTION_BASE_FIELDS, SECTION_BASE_GROUPS} from './sectionBase'

// "See the difference" — eyebrow + heading + body over a grid of interactive
// before/after comparison cards. Each item is a `beforeAfter` (two images the
// slider wipes between), so the whole gallery is editable in the Studio.
export default defineType({
  name: 'beforeAfterSection',
  title: 'Before / after gallery',
  type: 'object',
  icon: ImagesIcon,
  groups: SECTION_BASE_GROUPS,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
      group: 'content',
    }),
    defineField({
      name: 'items',
      title: 'Comparisons',
      type: 'array',
      of: [{type: 'beforeAfter'}],
      group: 'content',
    }),
    ...SECTION_BASE_FIELDS,
  ],
  preview: {
    select: {
      heading: 'heading',
      count: 'items.length',
    },
    prepare({heading, count}) {
      return {
        title: heading || 'Before / after gallery',
        subtitle: count ? `${count} comparison${count === 1 ? '' : 's'}` : 'Before / after',
      }
    },
  },
})
