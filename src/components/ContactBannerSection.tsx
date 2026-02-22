import { Button } from '@/components/ui/button'
import { Phone, MapPin, ArrowRight } from 'lucide-react'

interface ContactBannerSectionProps {
  phone: string
  address: string
  city: string
}

export function ContactBannerSection({ phone, address, city }: ContactBannerSectionProps) {
  return (
    <section className="relative overflow-hidden section-gap">
      {/* Background image with scale */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.05]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)',
        }}
      />
      <div className="hero-overlay absolute inset-0" />
      {/* Grain texture */}
      <div className="grain absolute inset-0 z-[1]" />

      <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="glass-dark rounded-3xl px-8 py-14 md:px-16 md:py-20">
          <div className="italia-divider mx-auto mb-8 w-16 rounded-full" />
          <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Une envie de pizza ?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-white/60">
            Appelez-nous pour commander ou réserver une table. Nous vous accueillons avec le sourire.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="default"
              className="group rounded-full px-8 text-base font-semibold shadow-xl gap-2 animate-pulse-glow"
            >
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                {phone}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group rounded-full border-white/20 bg-white/5 px-8 text-base text-white backdrop-blur-md hover:bg-white/15 hover:text-white gap-2 transition-all duration-300"
            >
              <a href="/infos">
                <MapPin className="h-4 w-4" />
                {address}, {city}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
