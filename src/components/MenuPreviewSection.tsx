import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MenuItemCard } from '@/components/MenuItemCard'
import { AnimateIn } from '@/components/AnimateIn'
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
    <section className="relative section-gap overflow-hidden">
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Nos spécialités
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Un aperçu de <span className="text-primary">notre carte</span>
          </h2>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <AnimateIn key={item.id} delay={index * 80}>
                <MenuItemCard
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
              </AnimateIn>
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
