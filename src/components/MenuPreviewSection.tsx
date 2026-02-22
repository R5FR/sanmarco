import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MenuItemCard } from '@/components/MenuItemCard'
import { ArrowRight } from 'lucide-react'

interface PriceVariant {
  label: string
  price: number
}

interface MenuItem {
  id: string
  name: string
  description?: string | null
  price: number
  priceVariants?: PriceVariant[] | null
  isNew?: boolean
  isPopular?: boolean
  vegetarian?: boolean
  homemade?: boolean
  allergens?: string | null
}

interface MenuPreviewSectionProps {
  items: MenuItem[]
}

export function MenuPreviewSection({ items }: MenuPreviewSectionProps) {
  return (
    <section className="relative bg-muted/30 section-gap overflow-hidden">
      {/* Subtle top curve */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none" className="w-full h-10 text-muted/30">
          <path d="M0 40h1440V20C1200 35 960 40 720 30 480 20 240 10 0 20v20z" fill="currentColor" />
        </svg>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            Nos spécialités
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Un aperçu de <span className="text-gradient-warm">notre carte</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            Découvrez nos plats les plus appréciés, préparés chaque jour avec des ingrédients frais
          </p>
          <div className="italia-divider mx-auto mt-8 w-16 rounded-full" />
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <p className="text-center text-muted-foreground">
            Notre carte sera bientôt disponible. En attendant, n&apos;hésitez pas à nous appeler !
          </p>
        )}

        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            variant="default"
            className="group rounded-full px-8 gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Link href="/menu">
              Voir toute la carte
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
