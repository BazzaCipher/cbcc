import { defineType, defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export default defineType({
  name: 'contactSection',
  title: 'Contact',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'formAction',
      title: 'Form Action URL',
      type: 'url',
    }),
    defineField({
      name: 'accessKey',
      title: 'Form Access Key',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Section',
      };
    },
  },
});
