import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: {
        description: 'URL de la page, ex: "a-propos"',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Titre SEO',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Description SEO',
    },
  ],
}
