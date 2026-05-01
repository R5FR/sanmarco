import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getPayloadClient } from '@/lib/payload'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings: {
    restaurantName?: string
    phone?: string
    address?: string
    postalCode?: string
    city?: string
    email?: string | null
    facebook?: string | null
    instagram?: string | null
    tripAdvisor?: string | null
  } | null = null

  let openingHoursSchedule: Array<{
    day: string
    closed: boolean
    openMorning?: string | null
    closeMorning?: string | null
    openEvening?: string | null
    closeEvening?: string | null
  }> | null = null

  try {
    const payload = await getPayloadClient()
    const [settingsData, openingHoursData] = await Promise.all([
      payload.findGlobal({ slug: 'settings' }),
      payload.findGlobal({ slug: 'opening-hours' }),
    ])
    settings = settingsData
    openingHoursSchedule = (openingHoursData as { schedule?: typeof openingHoursSchedule })?.schedule ?? null
  } catch {
    // Database may not be set up yet — use defaults
  }

  const restaurantName = settings?.restaurantName || 'Pizzeria San Marco'
  const phone = settings?.phone || '01 47 09 18 68'
  const address = settings?.address || '1764 avenue Roger Salengro'
  const postalCode = settings?.postalCode || '92370'
  const city = settings?.city || 'Chaville'
  const email = settings?.email || null
  const facebook = settings?.facebook || null
  const instagram = settings?.instagram || null
  const tripAdvisor = settings?.tripAdvisor || null

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <Navbar phone={phone} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer
        restaurantName={restaurantName}
        address={address}
        postalCode={postalCode}
        city={city}
        phone={phone}
        email={email}
        facebook={facebook}
        instagram={instagram}
        tripAdvisor={tripAdvisor}
        openingHours={openingHoursSchedule}
      />
    </div>
  )
}
