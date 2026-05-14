'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring', stiffness: 85, damping: 16 } as const

// Maps grid column (0-2) to entrance direction
function getEntrance(index: number): { x: number; y: number; rotate: number } {
  const col = index % 3
  if (col === 0) return { x: -45, y: 15, rotate: -1.5 }
  if (col === 2) return { x: 45, y: 15, rotate: 1.5 }
  return { x: 0, y: 40, rotate: 0 }
}

export function MenuPreviewSection({ items }: MenuPreviewSectionProps) {
  return (
    <section className="relative section-gap overflow-hidden">
      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Heading — clip-path reveal from bottom */}
        <div className="mb-14 text-center overflow-hidden">
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0% 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Nos spécialités
            </p>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Un aperçu de <span className="text-primary">notre carte</span>
            </h2>
          </motion.div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const { x, y, rotate } = getEntrance(index)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x, y, rotate, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ ...SPRING, delay: index * 0.07 }}
                >
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
                </motion.div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Notre carte sera bientôt disponible. En attendant, n&apos;hésitez pas à nous appeler !
          </p>
        )}

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </section>
  )
}
