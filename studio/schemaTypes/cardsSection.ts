import {defineField, defineType} from 'sanity'
import {SquareIcon} from '@sanity/icons'
import {SECTION_BASE_FIELDS, SECTION_BASE_GROUPS} from './sectionBase'

export default defineType({
  name: 'cardsSection',
  title: 'Cards',
  type: 'object',
  icon: SquareIcon,
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
      title: 'Items',
      type: 'array',
      of: [{type: 'card'}],
      group: 'content',
    }),
    ...SECTION_BASE_FIELDS,
    defineField({
      name: 'layout',
      title: 'Layout',
      description:
        'Grid shows the cards in columns. Feature rows alternates each item as a large image beside its text (matching the "Why choose us" design).',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Feature rows', value: 'featureRows'},
        ],
      },
      initialValue: 'grid',
      group: 'styles',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'string',
      options: {
        list: [
          {title: '1', value: 'one'},
          {title: '2', value: 'two'},
          {title: '3', value: 'three'},
        ],
      },
      initialValue: 'three',
      group: 'styles',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      body: 'body',
    },
    prepare(selection) {
      return {
        title: `${selection.heading || selection.body || ''}`,
        subtitle: 'Cards',
      }
    },
  },
})
