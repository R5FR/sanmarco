import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getPayloadClient } from '@/lib/payload'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch settings from Payload for navbar and footer
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
  try {
    const payload = await getPayloadClient()
    settings = await payload.findGlobal({ slug: 'settings' })
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
      <Navbar restaurantName={restaurantName} phone={phone} />
      <main className="flex-1">{children}</main>
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
      />
    </div>
  )
}
