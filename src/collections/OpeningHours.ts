import type { GlobalConfig } from 'payload'

export const OpeningHours: GlobalConfig = {
  slug: 'opening-hours',
  label: 'Horaires d\'ouverture',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hours',
      type: 'array',
      label: 'Horaires',
      minRows: 1,
      maxRows: 7,
      fields: [
        {
          name: 'day',
          type: 'select',
          label: 'Jour',
          required: true,
          options: [
            { label: 'Lundi', value: 'lundi' },
            { label: 'Mardi', value: 'mardi' },
            { label: 'Mercredi', value: 'mercredi' },
            { label: 'Jeudi', value: 'jeudi' },
            { label: 'Vendredi', value: 'vendredi' },
            { label: 'Samedi', value: 'samedi' },
            { label: 'Dimanche', value: 'dimanche' },
          ],
        },
        {
          name: 'closed',
          type: 'checkbox',
          label: 'Fermé',
          defaultValue: false,
        },
        {
          name: 'openMorning',
          type: 'text',
          label: 'Ouverture (midi)',
          admin: {
            description: 'Ex : 11:30',
            condition: (_, siblingData) => !siblingData?.closed,
          },
        },
        {
          name: 'closeMorning',
          type: 'text',
          label: 'Fermeture (midi)',
          admin: {
            description: 'Ex : 14:30',
            condition: (_, siblingData) => !siblingData?.closed,
          },
        },
        {
          name: 'openEvening',
          type: 'text',
          label: 'Ouverture (soir)',
          admin: {
            description: 'Ex : 18:30',
            condition: (_, siblingData) => !siblingData?.closed,
          },
        },
        {
          name: 'closeEvening',
          type: 'text',
          label: 'Fermeture (soir)',
          admin: {
            description: 'Ex : 22:30',
            condition: (_, siblingData) => !siblingData?.closed,
          },
        },
      ],
    },
    {
      name: 'specialNotice',
      type: 'text',
      label: 'Mention spéciale',
      admin: {
        description: 'Ex : "Fermé les jours fériés", "Ouvert 7j/7 en été"…',
      },
    },
    {
      name: 'vacationStart',
      type: 'date',
      label: 'Début des vacances',
      admin: {
        description: 'Date de début de la fermeture annuelle.',
        date: { displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'vacationEnd',
      type: 'date',
      label: 'Fin des vacances',
      admin: {
        description: 'Date de fin de la fermeture annuelle.',
        date: { displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'vacationMessage',
      type: 'textarea',
      label: 'Message de vacances',
      admin: {
        description: 'Message affiché pendant la période de fermeture annuelle.',
        condition: (data) => data?.vacationStart || data?.vacationEnd,
      },
    },
  ],
}
