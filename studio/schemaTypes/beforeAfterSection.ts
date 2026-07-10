import {defineField, defineType} from 'sanity'
import {SplitHorizontalIcon} from '@sanity/icons'
import {SECTION_BASE_FIELDS, SECTION_BASE_GROUPS} from './sectionBase'

export default defineType({
  name: 'beforeAfterSection',
  title: 'Before / After',
  type: 'object',
  icon: SplitHorizontalIcon,
  groups: SECTION_BASE_GROUPS,
  fields: [
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
      name: 'beforeImage',
      title: 'Before image',
      description: 'The "before" photo, shown on the left of the slider.',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'afterImage',
      title: 'After image',
      description: 'The "after" photo, revealed as the slider moves right.',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'beforeLabel',
      title: 'Before label',
      type: 'string',
      initialValue: 'Before',
      group: 'content',
    }),
    defineField({
      name: 'afterLabel',
      title: 'After label',
      type: 'string',
      initialValue: 'After',
      group: 'content',
    }),
    ...SECTION_BASE_FIELDS,
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'beforeImage.image.asset',
    },
    prepare(selection) {
      return {
        title: selection.heading || 'Before / After',
        subtitle: 'Before / After',
        media: selection.media,
      }
    },
  },
})
