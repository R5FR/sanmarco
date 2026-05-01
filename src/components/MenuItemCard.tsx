import { Badge } from '@/components/ui/badge'
import { Star, Sparkles, Leaf, ChefHat } from 'lucide-react'

interface PriceVariant {
  label: string
  price: number
}

interface MenuItemCardProps {
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

export function MenuItemCard({
  name,
  description,
  price,
  priceVariants,
  isNew,
  isPopular,
  vegetarian,
  homemade,
  allergens,
}: MenuItemCardProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card card-hover-lift">
      <div className="p-5">
        {/* Header: name + badges + price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-sm font-semibold leading-tight">{name}</h3>
              {isNew && (
                <Badge variant="default" className="gap-0.5 bg-secondary/90 text-secondary-foreground text-[0.5625rem] uppercase tracking-widest px-2 py-0 h-4 rounded-full">
                  <Sparkles className="h-2.5 w-2.5" />
                  Nouveau
                </Badge>
              )}
              {isPopular && (
                <Badge variant="outline" className="gap-0.5 border-accent/40 text-accent-foreground bg-accent/10 text-[0.5625rem] uppercase tracking-widest px-2 py-0 h-4 rounded-full">
                  <Star className="h-2.5 w-2.5 fill-accent" />
                  Populaire
                </Badge>
              )}
            </div>
          </div>
          <span className="shrink-0 rounded-lg bg-primary/8 px-3 py-1.5 text-sm font-bold text-primary tabular-nums">
            {price.toFixed(2)}&thinsp;€
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground/80">{description}</p>
        )}

        {/* Price variants */}
        {priceVariants && priceVariants.length > 0 && (
          <div className="mt-3 space-y-1 rounded-lg bg-muted/40 p-3">
            {priceVariants.map((variant, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{variant.label}</span>
                <span className="font-semibold tabular-nums">{variant.price.toFixed(2)}&thinsp;€</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags row */}
        {(vegetarian || homemade || allergens) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            {vegetarian && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary bg-secondary/10 rounded-full px-2 py-0.5">
                <Leaf className="h-2.5 w-2.5" /> Végétarien
              </span>
            )}
            {homemade && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-foreground bg-accent/15 rounded-full px-2 py-0.5">
                <ChefHat className="h-2.5 w-2.5" /> Fait maison
              </span>
            )}
            {allergens && (
              <span className="text-xs text-muted-foreground/50">
                Allergènes : {allergens}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
