import type { CollectionConfig } from 'payload'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  labels: {
    singular: 'Catégorie',
    plural: 'Catégories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'visible'],
    group: 'Menu',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom de la catégorie',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Ordre d\'affichage',
          required: true,
          defaultValue: 0,
          admin: {
            description: 'Tri croissant',
            width: '25%',
          },
        },
        {
          name: 'visible',
          type: 'checkbox',
          label: 'Visible sur le site',
          defaultValue: true,
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icône',
      options: [
        { label: 'Couverts', value: 'utensils' },
        { label: 'Pizza', value: 'pizza' },
        { label: 'Saladier', value: 'salad' },
        { label: 'Gâteau', value: 'cake' },
        { label: 'Verre', value: 'wine' },
        { label: 'Soupe', value: 'soup' },
        { label: 'Feuille', value: 'leaf' },
      ],
      admin: {
        description: 'Icône affichée sur la carte à côté du nom de catégorie',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de fond',
    },
  ],
}
