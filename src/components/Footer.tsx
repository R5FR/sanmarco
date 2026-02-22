import Link from 'next/link'
import { Phone, MapPin, Mail, ChefHat, Facebook, Instagram } from 'lucide-react'

interface FooterProps {
  restaurantName: string
  address: string
  postalCode: string
  city: string
  phone: string
  email?: string | null
  facebook?: string | null
  instagram?: string | null
  tripAdvisor?: string | null
}

const footerNavLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Notre Carte' },
  { href: '/a-propos', label: 'Qui sommes-nous' },
  { href: '/infos', label: 'Infos & Contact' },
]

export function Footer({
  restaurantName,
  address,
  postalCode,
  city,
  phone,
  email,
  facebook,
  instagram,
  tripAdvisor,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Italian tricolor divider at top */}
      <div className="italia-divider w-full" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-[0.03]" />

      <div className="container relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ChefHat className="h-4 w-4" />
              </div>
              <span className="font-display text-xl font-bold text-background">San Marco</span>
            </div>
            <p className="text-[13px] leading-relaxed text-background/50">
              Pizzeria familiale depuis 1997. Cuisine italienne authentique, pizzas artisanales
              et pâtes fraîches à Chaville.
            </p>
            {/* Social media */}
            {(facebook || instagram || tripAdvisor) && (
              <div className="mt-6 flex gap-2.5">
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-background/[0.06] text-background/50 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-background/[0.06] text-background/50 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {tripAdvisor && (
                  <a
                    href={tripAdvisor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-background/[0.06] text-background/50 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                    aria-label="TripAdvisor"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 004.04 10.43 5.976 5.976 0 004.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 004.075 1.6 5.997 5.997 0 004.04-10.43L24 6.648h-4.349a15.065 15.065 0 00-7.645-2.353zM6.003 17.214a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm11.994 0a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM6.003 11.215a2 2 0 100 4 2 2 0 000-4zm11.994 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-background/30">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {footerNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-background/50 transition-all duration-200 hover:text-background hover:pl-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-background/30">
              Coordonnées
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[13px] text-background/50">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-background/25" />
                <div>
                  <p>{address}</p>
                  <p>{postalCode} {city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-background/50">
                <Phone className="h-4 w-4 shrink-0 text-background/25" />
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="transition-colors duration-200 hover:text-background"
                >
                  {phone}
                </a>
              </div>
              {email && (
                <div className="flex items-center gap-3 text-[13px] text-background/50">
                  <Mail className="h-4 w-4 shrink-0 text-background/25" />
                  <a href={`mailto:${email}`} className="transition-colors duration-200 hover:text-background">
                    {email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Horaires résumé */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-background/30">
              Horaires
            </h3>
            <div className="space-y-2 text-[13px] text-background/50">
              <p className="font-medium text-background/60">Mar — Dim</p>
              <p>11h30 — 14h30</p>
              <p>18h30 — 22h30</p>
              <div className="my-3 h-px w-12 bg-background/10" />
              <p className="text-[11px] italic text-background/30">Fermé le lundi</p>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-background/[0.06]" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-[11px] text-background/30 md:flex-row">
          <p>&copy; {currentYear} {restaurantName}. Tous droits réservés.</p>
          <p>Restaurant italien & pizzeria à {city}</p>
        </div>
      </div>
    </footer>
  )
}
