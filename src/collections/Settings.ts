import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Paramètres du site',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Général',
          fields: [
            {
              name: 'restaurantName',
              type: 'text',
              label: 'Nom du restaurant',
              required: true,
              defaultValue: 'Pizzeria San Marco',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Slogan',
              defaultValue: 'Pizzeria familiale depuis 1997',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Bienvenue à la Pizzeria San Marco, votre restaurant italien familial à Chaville depuis 1997. Découvrez nos pizzas artisanales, pâtes fraîches et spécialités italiennes.',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
            },
          ],
        },
        {
          label: 'Coordonnées',
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Adresse',
              defaultValue: '1764 avenue Roger Salengro',
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Code postal',
              defaultValue: '92370',
            },
            {
              name: 'city',
              type: 'text',
              label: 'Ville',
              defaultValue: 'Chaville',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Téléphone',
              defaultValue: '01 47 09 18 68',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'googleMapsUrl',
              type: 'text',
              label: 'Lien Google Maps',
            },
            {
              name: 'googleMapsEmbed',
              type: 'textarea',
              label: 'Code d\'intégration Google Maps (iframe)',
              admin: {
                description: 'Collez le code iframe de Google Maps ici',
              },
            },
          ],
        },
        {
          label: 'Réseaux sociaux',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook (URL)',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram (URL)',
            },
            {
              name: 'tripAdvisor',
              type: 'text',
              label: 'TripAdvisor (URL)',
            },
          ],
        },
        {
          label: 'Page d\'accueil',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image hero (bannière)',
              admin: {
                description: 'Image de fond de la bannière principale. Taille recommandée : 1920×800.',
              },
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Titre hero',
              defaultValue: 'Pizzeria San Marco',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Sous-titre hero',
              defaultValue: 'Pizzeria familiale depuis 1997 à Chaville',
            },
            {
              name: 'ctaLabel',
              type: 'text',
              label: 'Texte du bouton principal',
              defaultValue: 'Commander',
              admin: {
                description: 'Texte affiché sur le bouton d\'appel à l\'action du hero.',
              },
            },
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Titre section À propos',
              defaultValue: 'Notre Histoire',
            },
            {
              name: 'aboutText',
              type: 'richText',
              label: 'Texte À propos',
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image À propos',
            },
          ],
        },
        {
          label: 'Livraison',
          fields: [
            {
              name: 'deliveryEnabled',
              type: 'checkbox',
              label: 'Livraison activée',
              defaultValue: true,
            },
            {
              name: 'deliveryZone',
              type: 'text',
              label: 'Zone de livraison',
              admin: {
                description: 'Ex : Chaville, Viroflay, Sèvres, Meudon',
                condition: (data) => data?.deliveryEnabled,
              },
            },
            {
              name: 'deliveryMinOrder',
              type: 'number',
              label: 'Commande minimum (€)',
              min: 0,
              admin: {
                condition: (data) => data?.deliveryEnabled,
              },
            },
            {
              name: 'deliveryFee',
              type: 'number',
              label: 'Frais de livraison (€)',
              min: 0,
              admin: {
                condition: (data) => data?.deliveryEnabled,
              },
            },
            {
              name: 'deliveryNotice',
              type: 'textarea',
              label: 'Informations livraison',
              admin: {
                description: 'Message affiché aux clients concernant la livraison.',
                condition: (data) => data?.deliveryEnabled,
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Titre SEO',
              defaultValue: 'Pizzeria San Marco — Restaurant italien à Chaville',
              admin: {
                description: 'Idéalement entre 50 et 60 caractères.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Description SEO',
              defaultValue:
                'Pizzeria San Marco, restaurant italien familial à Chaville depuis 1997. Pizzas artisanales, pâtes fraîches, livraison et à emporter. 01 47 09 18 68.',
              admin: {
                description: 'Idéalement entre 150 et 160 caractères.',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image Open Graph (partage réseaux sociaux)',
              admin: {
                description: 'Image affichée lors du partage sur Facebook, Twitter, etc. 1200×630 recommandé.',
              },
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Mots-clés SEO',
              admin: {
                description: 'Séparés par des virgules. Ex : pizzeria, chaville, restaurant italien, pizza',
              },
            },
          ],
        },
      ],
    },
  ],
}
