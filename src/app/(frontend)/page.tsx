import { getPayloadClient } from '@/lib/payload'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { MenuPreviewSection } from '@/components/MenuPreviewSection'
import { ContactBannerSection } from '@/components/ContactBannerSection'
import { OpeningHoursCard } from '@/components/OpeningHoursCard'

export const revalidate = 60 // Revalidate every 60 seconds

interface HourEntry {
  day: string
  closed: boolean
  openMorning?: string | null
  closeMorning?: string | null
  openEvening?: string | null
  closeEvening?: string | null
}

interface SiteSettings {
  heroTitle?: string
  heroSubtitle?: string
  phone?: string
  address?: string
  city?: string
}

interface OpeningHoursData {
  hours?: HourEntry[]
  specialNotice?: string | null
}

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

export default async function HomePage() {
  let settings: SiteSettings | null = null
  let openingHours: OpeningHoursData | null = null
  let popularItems: MenuItem[] = []

  try {
    const payload = await getPayloadClient()

    settings = await payload.findGlobal({ slug: 'settings' })
    openingHours = await payload.findGlobal({ slug: 'opening-hours' })

    // Fetch popular/new items for the preview
    const menuResult = await payload.find({
      collection: 'menu-items',
      where: {
        available: { equals: true },
        or: [
          { isPopular: { equals: true } },
          { isNew: { equals: true } },
        ],
      },
      limit: 6,
      sort: 'order',
    })
    popularItems = menuResult.docs as unknown as MenuItem[]
  } catch {
    // Database not available — use defaults
  }

  const heroTitle = settings?.heroTitle || 'Pizzeria San Marco'
  const heroSubtitle = settings?.heroSubtitle || 'Pizzeria familiale depuis 1997 à Chaville'
  const phone = settings?.phone || '01 47 09 18 68'
  const address = settings?.address || '1764 avenue Roger Salengro'
  const city = settings?.city || 'Chaville'
  const hours = openingHours?.hours || []

  return (
    <>
      <HeroSection title={heroTitle} subtitle={heroSubtitle} phone={phone} />

      <FeaturesSection />

      <MenuPreviewSection items={popularItems} />

      {/* Opening Hours Section */}
      {hours.length > 0 && (
        <section className="section-gap relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="container relative mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                  Nos horaires
                </p>
                <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Quand nous <span className="text-gradient-warm">rendre visite</span>
                </h2>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  Nous vous accueillons du mardi au dimanche, midi et soir. Réservation
                  recommandée le week-end. N&apos;hésitez pas à appeler pour vérifier nos
                  horaires en période de fêtes.
                </p>
                <div className="italia-divider w-16 rounded-full" />
              </div>
              <div>
                <OpeningHoursCard hours={hours} specialNotice={openingHours?.specialNotice} />
              </div>
            </div>
          </div>
        </section>
      )}

      <ContactBannerSection phone={phone} address={address} city={city} />
    </>
  )
}
