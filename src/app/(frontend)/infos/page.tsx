import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { OpeningHoursCard } from '@/components/OpeningHoursCard'
import { Button } from '@/components/ui/button'
import {
  Phone,
  MapPin,
  Mail,
  Car,
  TrainFront,
  Navigation,
  CreditCard,
  Utensils,
  ParkingCircle,
} from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Infos pratiques & Contact — Pizzeria San Marco',
  description:
    'Retrouvez-nous au 1764 avenue Roger Salengro, 92370 Chaville. Appelez le 01 47 09 18 68 pour commander ou réserver.',
}

interface HourEntry {
  day: string
  closed: boolean
  openMorning?: string | null
  closeMorning?: string | null
  openEvening?: string | null
  closeEvening?: string | null
}

interface SiteSettings {
  address?: string
  postalCode?: string
  city?: string
  phone?: string
  email?: string | null
  googleMapsEmbed?: string | null
  googleMapsUrl?: string | null
}

interface OpeningHoursData {
  hours?: HourEntry[]
  specialNotice?: string | null
}

export default async function InfosPage() {
  let settings: SiteSettings | null = null
  let openingHours: OpeningHoursData | null = null

  try {
    const payload = await getPayloadClient()
    settings = await payload.findGlobal({ slug: 'settings' })
    openingHours = await payload.findGlobal({ slug: 'opening-hours' })
  } catch {
    // Database not available
  }

  const address = settings?.address || '1764 avenue Roger Salengro'
  const postalCode = settings?.postalCode || '92370'
  const city = settings?.city || 'Chaville'
  const phone = settings?.phone || '01 47 09 18 68'
  const email = settings?.email || null
  const googleMapsEmbed = settings?.googleMapsEmbed || null
  const hours = openingHours?.hours || []

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.05]"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80)',
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="grain absolute inset-0 z-[1]" />
        <div className="container relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="italia-divider mx-auto mb-8 w-24 rounded-full" />
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
            Nous rejoindre
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Infos pratiques & Contact
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
            Toutes les informations pour nous rendre visite ou passer commande
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Left column — Contact info & practical info */}
            <div className="space-y-6 lg:col-span-3">
              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Address Card */}
                <div className="group rounded-2xl border border-border/40 bg-card p-6 card-hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold">Adresse</h2>
                      <p className="mt-1 text-[13px] text-muted-foreground">{address}</p>
                      <p className="text-[13px] text-muted-foreground">
                        {postalCode} {city}
                      </p>
                      {settings?.googleMapsUrl && (
                        <Button
                          asChild
                          variant="link"
                          className="mt-2 h-auto gap-1 p-0 text-primary text-[13px]"
                        >
                          <a
                            href={settings.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="h-3 w-3" />
                            Itinéraire
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group rounded-2xl border border-border/40 bg-card p-6 card-hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold">Téléphone</h2>
                      <p className="mt-1 text-[13px] text-muted-foreground">
                        Commander ou réserver
                      </p>
                      <Button asChild variant="default" size="sm" className="mt-3 rounded-full gap-2 shadow-md">
                        <a href={`tel:${phone.replace(/\s/g, '')}`}>
                          <Phone className="h-3.5 w-3.5" />
                          {phone}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                {email && (
                  <div className="group rounded-2xl border border-border/40 bg-card p-6 card-hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-semibold">Email</h2>
                        <a
                          href={`mailto:${email}`}
                          className="mt-1 text-[13px] text-primary hover:underline"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Access info */}
              <div className="rounded-2xl border border-border/40 bg-card">
                <div className="p-8">
                  <h2 className="mb-6 font-display text-xl font-semibold">Comment venir</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <Car className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[14px]">En voiture</h3>
                        <p className="mt-1 text-[13px] text-muted-foreground">
                          Avenue Roger Salengro, stationnement gratuit à proximité.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <TrainFront className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[14px]">En transports</h3>
                        <p className="mt-1 text-[13px] text-muted-foreground">
                          Gare de Chaville — Rive Gauche ou Chaville — Vélizy (10 min à pied).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <ParkingCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[14px]">Parking</h3>
                        <p className="mt-1 text-[13px] text-muted-foreground">
                          Stationnement disponible devant le restaurant et dans les rues adjacentes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[14px]">Paiement</h3>
                        <p className="mt-1 text-[13px] text-muted-foreground">
                          Carte bancaire, espèces et tickets restaurant acceptés.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="rounded-2xl border border-border/40 bg-card">
                <div className="p-8">
                  <h2 className="mb-6 font-display text-xl font-semibold">Nos services</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="group rounded-xl bg-muted/40 p-5 text-center transition-all duration-300 hover:bg-primary/5">
                      <Utensils className="mx-auto mb-3 h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="text-[13px] font-medium">Sur place</h3>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Salle climatisée, ambiance chaleureuse
                      </p>
                    </div>
                    <div className="group rounded-xl bg-muted/40 p-5 text-center transition-all duration-300 hover:bg-primary/5">
                      <Phone className="mx-auto mb-3 h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="text-[13px] font-medium">À emporter</h3>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Commandez et récupérez vos plats
                      </p>
                    </div>
                    <div className="group rounded-xl bg-muted/40 p-5 text-center transition-all duration-300 hover:bg-primary/5">
                      <Car className="mx-auto mb-3 h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="text-[13px] font-medium">Livraison</h3>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Livraison à domicile sur Chaville
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Map & Horaires */}
            <div className="space-y-6 lg:col-span-2">
              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-border/40 shadow-lg">
                {googleMapsEmbed ? (
                  <div
                    className="aspect-[4/3] w-full"
                    dangerouslySetInnerHTML={{ __html: googleMapsEmbed }}
                  />
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.!2d2.1896!3d48.8064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1764+avenue+Roger+Salengro+92370+Chaville!5e0!3m2!1sfr!2sfr!4v1"
                    className="aspect-[4/3] w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Plan d'accès Pizzeria San Marco"
                  />
                )}
              </div>

              {/* Opening Hours */}
              {hours.length > 0 && (
                <OpeningHoursCard
                  hours={hours}
                  specialNotice={openingHours?.specialNotice}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
