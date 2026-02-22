import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  labels: {
    singular: 'Plat',
    plural: 'Plats',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'spicy', 'vegetarian', 'available', 'isPopular'],
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
          label: 'Nom du plat',
          required: true,
          admin: { width: '60%' },
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix (€)',
          required: true,
          min: 0,
          admin: { width: '20%' },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Ordre',
          defaultValue: 0,
          admin: { width: '20%' },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description / Ingrédients',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      label: 'Catégorie',
      required: true,
      hasMany: false,
    },
    {
      name: 'priceVariants',
      type: 'array',
      label: 'Variantes de prix',
      admin: {
        description: 'Ex : taille normale / grande, base tomate / crème…',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Libellé',
              required: true,
              admin: { width: '60%' },
            },
            {
              name: 'price',
              type: 'number',
              label: 'Prix (€)',
              required: true,
              min: 0,
              admin: { width: '40%' },
            },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo du plat',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'available',
          type: 'checkbox',
          label: 'Disponible',
          defaultValue: true,
        },
        {
          name: 'isNew',
          type: 'checkbox',
          label: 'Nouveau',
          defaultValue: false,
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Populaire',
          defaultValue: false,
        },
        {
          name: 'vegetarian',
          type: 'checkbox',
          label: 'Végétarien',
          defaultValue: false,
        },
        {
          name: 'homemade',
          type: 'checkbox',
          label: 'Fait maison',
          defaultValue: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'spicy',
          type: 'select',
          label: 'Piquant',
          options: [
            { label: 'Non piquant', value: 'none' },
            { label: 'Légèrement piquant', value: 'mild' },
            { label: 'Piquant', value: 'hot' },
            { label: 'Très piquant', value: 'extra-hot' },
          ],
          defaultValue: 'none',
          admin: { width: '50%' },
        },
        {
          name: 'allergens',
          type: 'text',
          label: 'Allergènes',
          admin: {
            description: 'Ex : gluten, lait, œufs, fruits à coque',
            width: '50%',
          },
        },
      ],
    },
  ],
}
