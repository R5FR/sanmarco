# Pizzeria San Marco — Site Web

Site web de la **Pizzeria San Marco**, restaurant italien familial à Chaville depuis 1997.

## Stack technique

- **Framework** : Next.js 15 (App Router)
- **CMS** : Payload CMS 3 (headless, intégré à Next.js)
- **Base de données** : PostgreSQL (Vercel Postgres en production)
- **ORM** : Drizzle (intégré à Payload 3)
- **UI** : Tailwind CSS 4 + shadcn/ui
- **Hébergement** : Vercel

## Installation

```bash
npm install --legacy-peer-deps
cp .env.example .env
# Éditer .env avec vos valeurs
npm run dev
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Mode développement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run seed` | Peupler la base de données |

## Administration

Panel admin Payload : `/admin`

Seed : `npm run seed` — crée un admin (admin@sanmarco.fr / sanmarco2024).
