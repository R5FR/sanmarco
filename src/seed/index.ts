import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@sanmarco.fr',
        password: 'sanmarco2024',
        name: 'Admin San Marco',
      },
    })
    console.log('[OK] Admin user created (admin@sanmarco.fr / sanmarco2024)')
  } catch {
    console.log('[INFO] Admin user already exists')
  }

  // Update Settings global
  try {
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        restaurantName: 'Pizzeria San Marco',
        tagline: 'Pizzeria familiale depuis 1997',
        description:
          'Bienvenue a la Pizzeria San Marco, votre restaurant italien familial a Chaville depuis 1997. Decouvrez nos pizzas artisanales, pates fraiches et specialites italiennes preparees avec passion.',
        address: '1764 avenue Roger Salengro',
        postalCode: '92370',
        city: 'Chaville',
        phone: '01 47 09 18 68',
        email: 'contact@sanmarco-chaville.fr',
        heroTitle: 'Pizzeria San Marco',
        heroSubtitle:
          'Cuisine italienne authentique, pizzas artisanales et pates fraiches. Une tradition familiale depuis 1997 a Chaville.',
        metaTitle: 'Pizzeria San Marco — Restaurant italien a Chaville',
        metaDescription:
          'Pizzeria San Marco, restaurant italien familial a Chaville depuis 1997. Pizzas artisanales, pates fraiches, livraison et a emporter. 01 47 09 18 68.',
        facebook: 'https://www.facebook.com/pizzeria.sanmarco.chaville',
        instagram: 'https://www.instagram.com/sanmarco_chaville',
        tripAdvisor: 'https://www.tripadvisor.fr/Restaurant-Pizzeria-San-Marco-Chaville',
        deliveryEnabled: true,
        deliveryZone: 'Chaville, Viroflay, Sevres, Meudon, Ville-d\'Avray',
        deliveryMinOrder: 15,
        deliveryFee: 2.5,
        deliveryNotice: 'Livraison gratuite a partir de 25 euros. Delai moyen : 30-45 minutes.',
        keywords: 'pizzeria, chaville, restaurant italien, pizza, pates fraiches, livraison, a emporter',
      },
    })
    console.log('[OK] Settings updated')
  } catch (err) {
    console.log('[WARN] Could not update settings:', err)
  }

  // Update Opening Hours
  try {
    await payload.updateGlobal({
      slug: 'opening-hours',
      data: {
        hours: [
          { day: 'lundi', closed: true },
          {
            day: 'mardi',
            closed: false,
            openMorning: '11:30',
            closeMorning: '14:30',
            openEvening: '18:30',
            closeEvening: '22:30',
          },
          {
            day: 'mercredi',
            closed: false,
            openMorning: '11:30',
            closeMorning: '14:30',
            openEvening: '18:30',
            closeEvening: '22:30',
          },
          {
            day: 'jeudi',
            closed: false,
            openMorning: '11:30',
            closeMorning: '14:30',
            openEvening: '18:30',
            closeEvening: '22:30',
          },
          {
            day: 'vendredi',
            closed: false,
            openMorning: '11:30',
            closeMorning: '14:30',
            openEvening: '18:30',
            closeEvening: '23:00',
          },
          {
            day: 'samedi',
            closed: false,
            openMorning: '11:30',
            closeMorning: '14:30',
            openEvening: '18:30',
            closeEvening: '23:00',
          },
          {
            day: 'dimanche',
            closed: false,
            openMorning: '11:30',
            closeMorning: '14:30',
            openEvening: '18:30',
            closeEvening: '22:30',
          },
        ],
        specialNotice:
          'Ferme le lundi. Horaires susceptibles de changer les jours feries. Reservation recommandee le week-end.',
      },
    })
    console.log('[OK] Opening hours updated')
  } catch (err) {
    console.log('[WARN] Could not update opening hours:', err)
  }

  // Create Menu Categories
  const categoriesData = [
    {
      name: 'Entrees',
      description:
        'Decouvrez nos entrees italiennes : bruschetta, antipasti, charcuteries et fromages fins.',
      order: 1,
      icon: 'utensils',
    },
    {
      name: 'Pizzas',
      description:
        'Nos pizzas artisanales, pate petrie a la main chaque matin et cuite au four a haute temperature.',
      order: 2,
      icon: 'pizza',
    },
    {
      name: 'Pates',
      description:
        'Pates fraiches cuisinees a l\'italienne, accompagnees de sauces maison preparees avec soin.',
      order: 3,
      icon: 'utensils',
    },
    {
      name: 'Salades',
      description:
        'Nos salades fraiches et gourmandes, ideales pour un repas leger et savoureux.',
      order: 4,
      icon: 'salad',
    },
    {
      name: 'Desserts',
      description:
        'Pour finir en beaute : tiramisu maison, panna cotta, glaces artisanales et bien plus.',
      order: 5,
      icon: 'cake',
    },
    {
      name: 'Boissons',
      description:
        'Eaux, sodas, cafes et une selection de vins italiens pour accompagner votre repas.',
      order: 6,
      icon: 'wine',
    },
  ]

  const categoryMap: Record<string, string> = {}

  for (const cat of categoriesData) {
    try {
      const existing = await payload.find({
        collection: 'menu-categories',
        where: { name: { equals: cat.name } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        categoryMap[cat.name] = existing.docs[0].id as string
        console.log(`[INFO] Category "${cat.name}" already exists`)
      } else {
        const created = await payload.create({
          collection: 'menu-categories',
          data: cat,
        })
        categoryMap[cat.name] = created.id as string
        console.log(`[OK] Category "${cat.name}" created`)
      }
    } catch (err) {
      console.log(`[WARN] Error creating category ${cat.name}:`, err)
    }
  }

  // Create Menu Items
  const menuItems = [
    // --- Entrees ---
    {
      name: 'Bruschetta',
      description:
        'Pain grille frotte a l\'ail, tomates fraiches, basilic, huile d\'olive extra vierge',
      price: 6.5,
      category: 'Entrees',
      order: 1,
      isPopular: true,
      vegetarian: true,
      homemade: true,
    },
    {
      name: 'Antipasti misti',
      description:
        'Assortiment de charcuteries italiennes (prosciutto, mortadelle, salami), legumes grilles marines et mozzarella fior di latte',
      price: 12.0,
      category: 'Entrees',
      order: 2,
    },
    {
      name: 'Salade caprese',
      description:
        'Mozzarella di bufala, tomates coeur de boeuf, basilic frais, filet d\'huile d\'olive et vinaigre balsamique de Modene',
      price: 9.0,
      category: 'Entrees',
      order: 3,
      vegetarian: true,
    },
    {
      name: 'Arancini',
      description:
        'Boulettes de riz panees farcies a la mozzarella fondante, servies avec sauce marinara (3 pieces)',
      price: 7.5,
      category: 'Entrees',
      order: 4,
      homemade: true,
    },
    {
      name: 'Carpaccio di manzo',
      description:
        'Fines tranches de boeuf cru, roquette sauvage, copeaux de parmesan Reggiano, huile de truffe',
      price: 11.0,
      category: 'Entrees',
      order: 5,
    },
    {
      name: 'Focaccia maison',
      description:
        'Focaccia tiede garnie de tomates sechees, olives noires et romarin frais',
      price: 5.5,
      category: 'Entrees',
      order: 6,
      vegetarian: true,
      homemade: true,
    },
    {
      name: 'Calamari fritti',
      description:
        'Anneaux de calamar panees et frits, servis avec citron et sauce tartare maison',
      price: 9.5,
      category: 'Entrees',
      order: 7,
    },

    // --- Pizzas ---
    {
      name: 'Margherita',
      description:
        'Sauce tomate San Marzano, mozzarella fior di latte, basilic frais, huile d\'olive',
      price: 9.5,
      category: 'Pizzas',
      order: 1,
      isPopular: true,
      vegetarian: true,
    },
    {
      name: 'Regina',
      description:
        'Sauce tomate, mozzarella, jambon blanc de qualite, champignons de Paris frais',
      price: 11.0,
      category: 'Pizzas',
      order: 2,
      isPopular: true,
    },
    {
      name: 'Quatre Fromages',
      description:
        'Mozzarella, gorgonzola DOP, parmesan Reggiano 24 mois, chevre affine',
      price: 12.5,
      category: 'Pizzas',
      order: 3,
      isPopular: true,
      vegetarian: true,
    },
    {
      name: 'Calzone',
      description:
        'Pizza pliee garnie de sauce tomate, mozzarella, jambon, champignons et oeuf, doree au four',
      price: 13.0,
      category: 'Pizzas',
      order: 4,
    },
    {
      name: 'Napolitaine',
      description:
        'Sauce tomate, mozzarella, anchois de Sicile, capres, olives noires de Taggia',
      price: 11.5,
      category: 'Pizzas',
      order: 5,
    },
    {
      name: 'Vegetarienne',
      description:
        'Sauce tomate, mozzarella, poivrons grilles, aubergines, courgettes et champignons frais',
      price: 12.0,
      category: 'Pizzas',
      order: 6,
      vegetarian: true,
    },
    {
      name: 'San Marco',
      description:
        'Notre specialite : sauce tomate, mozzarella, jambon de Parme 16 mois, roquette sauvage, copeaux de parmesan, filet de truffe',
      price: 14.0,
      category: 'Pizzas',
      order: 7,
      isNew: true,
      isPopular: true,
    },
    {
      name: 'Diavola',
      description:
        'Sauce tomate, mozzarella, salami piquant calabrais, piments rouges, huile pimentee',
      price: 12.0,
      category: 'Pizzas',
      order: 8,
      spicy: 'hot',
    },
    {
      name: 'Tropicale',
      description:
        'Sauce tomate, mozzarella, poulet marine aux herbes, ananas grille, oignons rouges confits',
      price: 12.5,
      category: 'Pizzas',
      order: 9,
    },
    {
      name: 'Sicilienne',
      description:
        'Sauce tomate, mozzarella, aubergines grillees, ricotta, tomates sechees, pignons de pin',
      price: 13.0,
      category: 'Pizzas',
      order: 10,
      vegetarian: true,
      isNew: true,
    },
    {
      name: 'Parma',
      description:
        'Base creme, mozzarella, jambon de Parme 16 mois, roquette, copeaux de Gran Padano',
      price: 13.5,
      category: 'Pizzas',
      order: 11,
    },
    {
      name: 'Capricciosa',
      description:
        'Sauce tomate, mozzarella, jambon, champignons, artichauts, olives noires, oeuf',
      price: 13.0,
      category: 'Pizzas',
      order: 12,
    },
    {
      name: 'Pesto & Burrata',
      description:
        'Base pesto alla genovese, burrata cremeuse, tomates cerises, pignons de pin grilles, roquette',
      price: 14.5,
      category: 'Pizzas',
      order: 13,
      isNew: true,
      vegetarian: true,
    },
    {
      name: 'Tonno e Cipolla',
      description:
        'Sauce tomate, mozzarella, thon a l\'huile d\'olive, oignons rouges, olives de Taggia',
      price: 12.0,
      category: 'Pizzas',
      order: 14,
    },

    // --- Pates ---
    {
      name: 'Spaghetti Bolognaise',
      description:
        'Sauce bolognaise maison mijotee 4 heures avec viande de boeuf et tomates fraiches, parmesan rape',
      price: 11.0,
      category: 'Pates',
      order: 1,
      isPopular: true,
      homemade: true,
    },
    {
      name: 'Penne Arrabiata',
      description:
        'Sauce tomate relevee au piment, ail confit, persil plat italien',
      price: 10.0,
      category: 'Pates',
      order: 2,
      vegetarian: true,
      spicy: 'mild',
    },
    {
      name: 'Tagliatelle Carbonara',
      description:
        'Recette traditionnelle romaine : guanciale croustillant, oeuf, pecorino romano, poivre noir',
      price: 12.0,
      category: 'Pates',
      order: 3,
      homemade: true,
    },
    {
      name: 'Lasagnes',
      description:
        'Lasagnes maison a la bolognaise, bechamel onctueuse, gratinees au parmesan',
      price: 13.0,
      category: 'Pates',
      order: 4,
      isPopular: true,
      homemade: true,
    },
    {
      name: 'Gnocchi Gorgonzola',
      description:
        'Gnocchi de pommes de terre faits maison, sauce creme au gorgonzola DOP, cerneaux de noix torrefies',
      price: 12.5,
      category: 'Pates',
      order: 5,
      homemade: true,
    },
    {
      name: 'Linguine aux fruits de mer',
      description:
        'Linguine, crevettes, moules, calamars, tomates cerises, vin blanc, persillade',
      price: 14.5,
      category: 'Pates',
      order: 6,
    },
    {
      name: 'Penne al Pesto',
      description:
        'Pesto alla genovese maison (basilic, pignons, parmesan, ail, huile d\'olive), tomates cerises',
      price: 10.5,
      category: 'Pates',
      order: 7,
      vegetarian: true,
      homemade: true,
    },
    {
      name: 'Rigatoni alla Norma',
      description:
        'Sauce tomate, aubergines grillees, ricotta salee, basilic frais',
      price: 11.0,
      category: 'Pates',
      order: 8,
      vegetarian: true,
    },
    {
      name: 'Ravioli ricotta-epinards',
      description:
        'Ravioli maison farcis ricotta et epinards, beurre de sauge, parmesan',
      price: 13.5,
      category: 'Pates',
      order: 9,
      vegetarian: true,
      homemade: true,
      isNew: true,
    },

    // --- Salades ---
    {
      name: 'Salade Cesar',
      description:
        'Salade romaine croquante, poulet grille marine aux herbes, croutons a l\'ail, sauce Cesar maison, copeaux de parmesan',
      price: 11.5,
      category: 'Salades',
      order: 1,
      isPopular: true,
    },
    {
      name: 'Salade italienne',
      description:
        'Mesclun, tomates cerises, mozzarella di bufala, jambon de Parme, coeurs d\'artichauts, olives, vinaigrette a l\'origan',
      price: 12.0,
      category: 'Salades',
      order: 2,
    },
    {
      name: 'Salade chevre chaud',
      description:
        'Mesclun, crotin de chevre gratine sur toast, noix, pomme verte, miel, vinaigrette balsamique',
      price: 11.0,
      category: 'Salades',
      order: 3,
      vegetarian: true,
    },
    {
      name: 'Salade Nicoise',
      description:
        'Thon mi-cuit, haricots verts, pommes de terre, olives, oeufs mollets, anchois, vinaigrette provencale',
      price: 12.5,
      category: 'Salades',
      order: 4,
    },
    {
      name: 'Grande salade verte',
      description:
        'Melange de jeunes pousses, concombre, radis, graines de tournesol, vinaigrette maison au citron',
      price: 7.5,
      category: 'Salades',
      order: 5,
      vegetarian: true,
    },

    // --- Desserts ---
    {
      name: 'Tiramisu',
      description:
        'Le grand classique : biscuits imbides de cafe espresso, creme au mascarpone, poudre de cacao amer',
      price: 7.0,
      category: 'Desserts',
      order: 1,
      isPopular: true,
      homemade: true,
    },
    {
      name: 'Panna Cotta',
      description:
        'Creme vanille de Madagascar, onctueuse et delicate, coulis de fruits rouges de saison',
      price: 6.5,
      category: 'Desserts',
      order: 2,
      homemade: true,
    },
    {
      name: 'Glace artisanale',
      description:
        '2 boules au choix : vanille de Madagascar, chocolat noir 70%, pistache de Bronte, fraise',
      price: 5.5,
      category: 'Desserts',
      order: 3,
    },
    {
      name: 'Fondant au chocolat',
      description:
        'Moelleux au chocolat noir 70%, coeur coulant, boule de glace vanille',
      price: 7.5,
      category: 'Desserts',
      order: 4,
      homemade: true,
    },
    {
      name: 'Cannoli siciliens',
      description:
        'Tubes croustillants garnis de ricotta sucree, pepites de chocolat, pistaches concassees (2 pieces)',
      price: 6.5,
      category: 'Desserts',
      order: 5,
      isNew: true,
    },
    {
      name: 'Affogato',
      description:
        'Boule de glace vanille noyee dans un double expresso italien brulant',
      price: 5.0,
      category: 'Desserts',
      order: 6,
    },
    {
      name: 'Salade de fruits frais',
      description:
        'Fruits de saison eminces, zeste de citron, menthe fraiche, sirop leger',
      price: 5.5,
      category: 'Desserts',
      order: 7,
      vegetarian: true,
    },

    // --- Boissons ---
    {
      name: 'Eau minerale (50cl)',
      description: 'San Pellegrino ou Acqua Panna',
      price: 2.5,
      category: 'Boissons',
      order: 1,
    },
    {
      name: 'Coca-Cola / Orangina',
      description: '33cl',
      price: 3.0,
      category: 'Boissons',
      order: 2,
    },
    {
      name: 'Cafe expresso',
      description: 'Cafe italien torrefie, servi dans la tradition',
      price: 1.8,
      category: 'Boissons',
      order: 3,
    },
    {
      name: 'Verre de vin rouge',
      description: 'Chianti Classico DOCG ou Montepulciano d\'Abruzzo',
      price: 4.5,
      category: 'Boissons',
      order: 4,
    },
    {
      name: 'Verre de vin blanc',
      description: 'Pinot Grigio ou Vermentino di Sardegna',
      price: 4.5,
      category: 'Boissons',
      order: 5,
    },
    {
      name: 'Bouteille de vin rouge (75cl)',
      description: 'Chianti Classico DOCG, Toscane',
      price: 19.0,
      category: 'Boissons',
      order: 6,
    },
    {
      name: 'Bouteille de vin blanc (75cl)',
      description: 'Pinot Grigio, Venetie',
      price: 18.0,
      category: 'Boissons',
      order: 7,
    },
    {
      name: 'Limoncello',
      description: 'Digestif italien au citron de Sorrente, servi glace',
      price: 4.0,
      category: 'Boissons',
      order: 8,
    },
    {
      name: 'Biere italienne Peroni (33cl)',
      description: 'Blonde rafraichissante, brassee a Rome',
      price: 4.0,
      category: 'Boissons',
      order: 9,
    },
    {
      name: 'Jus de fruits frais',
      description: 'Orange pressee, pomme ou ananas, selon la saison',
      price: 3.5,
      category: 'Boissons',
      order: 10,
    },
    {
      name: 'Limonade maison',
      description: 'Citrons frais presses, sucre de canne, eau petillante, menthe',
      price: 3.5,
      category: 'Boissons',
      order: 11,
      homemade: true,
    },
  ]

  for (const item of menuItems) {
    try {
      const existing = await payload.find({
        collection: 'menu-items',
        where: { name: { equals: item.name } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        console.log(`[INFO] Menu item "${item.name}" already exists`)
        continue
      }

      const categoryId = categoryMap[item.category]
      if (!categoryId) {
        console.log(`[WARN] Category "${item.category}" not found for item "${item.name}"`)
        continue
      }

      await payload.create({
        collection: 'menu-items',
        data: {
          name: item.name,
          description: item.description || undefined,
          price: item.price,
          category: categoryId,
          order: item.order,
          available: true,
          isNew: (item as Record<string, unknown>).isNew as boolean || false,
          isPopular: (item as Record<string, unknown>).isPopular as boolean || false,
          vegetarian: (item as Record<string, unknown>).vegetarian as boolean || false,
          homemade: (item as Record<string, unknown>).homemade as boolean || false,
          spicy: (item as Record<string, unknown>).spicy as string || 'none',
        },
      })
      console.log(`[OK] Menu item "${item.name}" created`)
    } catch (err) {
      console.log(`[WARN] Error creating item ${item.name}:`, err)
    }
  }

  console.log('\nSeeding complete!')
  process.exit(0)
}

seed()
