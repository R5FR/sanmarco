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
    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card card-hover-lift">
      {/* Top gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-italia-green via-italia-gold to-italia-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="p-5">
        {/* Header: name + badges + price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-[0.95rem] font-semibold leading-tight">{name}</h3>
              {isNew && (
                <Badge variant="default" className="gap-0.5 bg-secondary/90 text-secondary-foreground text-[9px] uppercase tracking-widest px-2 py-0 h-4 rounded-full">
                  <Sparkles className="h-2.5 w-2.5" />
                  Nouveau
                </Badge>
              )}
              {isPopular && (
                <Badge variant="outline" className="gap-0.5 border-amber-400/50 text-amber-600 bg-amber-50/50 text-[9px] uppercase tracking-widest px-2 py-0 h-4 rounded-full">
                  <Star className="h-2.5 w-2.5 fill-amber-400" />
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
          <p className="text-[13px] leading-relaxed text-muted-foreground/80">{description}</p>
        )}

        {/* Price variants */}
        {priceVariants && priceVariants.length > 0 && (
          <div className="mt-3 space-y-1 rounded-lg bg-muted/40 p-3">
            {priceVariants.map((variant, index) => (
              <div key={index} className="flex justify-between text-[13px]">
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
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50/70 rounded-full px-2 py-0.5">
                <Leaf className="h-2.5 w-2.5" /> Végétarien
              </span>
            )}
            {homemade && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-800 bg-amber-50/70 rounded-full px-2 py-0.5">
                <ChefHat className="h-2.5 w-2.5" /> Fait maison
              </span>
            )}
            {allergens && (
              <span className="text-[10px] text-muted-foreground/50">
                Allergènes : {allergens}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
