import {defineField, defineType} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons'
import {SECTION_BASE_FIELDS, SECTION_BASE_GROUPS} from './sectionBase'

// The slim dark stat strip from the design (100% / Zero / Micron). Each stat is
// a big display numeral over an uppercase label; `accent` glows it in the beam
// colour. Defaults to the dark theme, matching the design's dark accent band.
export default defineType({
  name: 'guaranteeBand',
  title: 'Guarantee band',
  type: 'object',
  icon: TrendUpwardIcon,
  groups: SECTION_BASE_GROUPS,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'accent',
              title: 'Accent (beam colour)',
              description: 'Render this value in the beam accent colour instead of white.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
    }),
    ...SECTION_BASE_FIELDS,
  ],
  preview: {
    select: {
      a: 'stats.0.value',
      b: 'stats.1.value',
      c: 'stats.2.value',
    },
    prepare({a, b, c}) {
      return {
        title: [a, b, c].filter(Boolean).join(' · ') || 'Guarantee band',
        subtitle: 'Guarantee band',
      }
    },
  },
})
