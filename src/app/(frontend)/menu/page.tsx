import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { MenuItemCard } from '@/components/MenuItemCard'
import { UtensilsCrossed } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Notre Carte — Pizzeria San Marco',
  description:
    'Découvrez notre carte : pizzas artisanales, pâtes fraîches, salades, desserts et plus encore. Pizzeria San Marco à Chaville.',
}

interface PriceVariant {
  label: string
  price: number
}

interface MenuCategory {
  id: string
  name: string
  description?: string | null
  order: number
}

interface MenuItem {
  id: string
  name: string
  description?: string | null
  price: number
  priceVariants?: PriceVariant[] | null
  category: string | { id: string }
  isNew?: boolean
  isPopular?: boolean
  vegetarian?: boolean
  homemade?: boolean
  allergens?: string | null
}

export default async function MenuPage() {
  let categories: MenuCategory[] = []
  let allItems: MenuItem[] = []

  try {
    const payload = await getPayloadClient()

    const catResult = await payload.find({
      collection: 'menu-categories',
      sort: 'order',
      limit: 100,
    })
    categories = catResult.docs as unknown as MenuCategory[]

    const itemResult = await payload.find({
      collection: 'menu-items',
      where: { available: { equals: true } },
      sort: 'order',
      limit: 500,
      depth: 1,
    })
    allItems = itemResult.docs as unknown as MenuItem[]
  } catch {
    // Database not available
  }

  // Group items by category
  const itemsByCategory = categories.map((cat) => ({
    category: cat,
    items: allItems.filter((item) => {
      const catId = typeof item.category === 'object' ? item.category?.id : item.category
      return catId === cat.id
    }),
  }))

  return (
    <div className="py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            A la carte
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Notre <span className="text-gradient-warm">Carte</span>
          </h1>
          <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Des pizzas artisanales, des pâtes fraîches et des spécialités italiennes
            préparées avec passion depuis 1997.
          </p>
          <div className="italia-divider mx-auto mt-8 w-16 rounded-full" />
        </div>

        {/* Category sticky navigation */}
        {categories.length > 0 && (
          <nav className="sticky top-20 z-30 -mx-6 mb-14 overflow-x-auto bg-background/80 backdrop-blur-xl px-6 py-3 border-b border-border/20">
            <div className="flex justify-center gap-2">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="whitespace-nowrap rounded-full border border-border/40 bg-card px-5 py-2 text-[13px] font-medium transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/10"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Menu Sections */}
        {itemsByCategory.length > 0 ? (
          <div className="space-y-24">
            {itemsByCategory.map(({ category, items }) => (
              <section key={category.id} id={category.id} className="scroll-mt-36">
                <div className="mb-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="mt-1 text-[13px] text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="hidden sm:block h-px flex-1 bg-border/30" />
                </div>

                {items.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        priceVariants={item.priceVariants}
                        isNew={item.isNew}
                        isPopular={item.isPopular}
                        vegetarian={item.vegetarian}
                        homemade={item.homemade}
                        allergens={item.allergens}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">
                    Les plats de cette catégorie seront bientôt disponibles.
                  </p>
                )}
              </section>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <UtensilsCrossed className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-xl text-muted-foreground">
              Notre carte est en cours de mise à jour.
            </p>
            <p className="mt-2 text-muted-foreground">
              N&apos;hésitez pas à nous appeler pour connaître nos plats du jour !
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
