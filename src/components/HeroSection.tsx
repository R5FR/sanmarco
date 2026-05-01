import { Button } from '@/components/ui/button'
import { Phone, ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle: string
  phone: string
}

export function HeroSection({ title, subtitle, phone }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.08]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80)',
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/50 animate-fade-in-up">
            Restaurant italien authentique
          </p>

          <h1 className="mb-8 font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-[5.5rem] leading-[0.95] animate-fade-in-up animation-delay-100">
            {title}
          </h1>

          <p className="mx-auto mb-12 max-w-xl text-base font-light leading-relaxed text-white/75 md:text-lg animate-fade-in-up animation-delay-200">
            {subtitle}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up animation-delay-300">
            <Button
              asChild
              size="lg"
              variant="default"
              className="group rounded-full px-8 text-base font-semibold shadow-2xl gap-2"
            >
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Commander : {phone}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white hover:border-white/60 gap-2 transition-all duration-300"
            >
              <a href="/menu">
                Voir notre carte
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none" className="w-full h-16 md:h-20 text-background">
          <path
            d="M0 90h1440V45C1340 70 1180 80 960 65 740 50 480 30 240 45 120 52 60 55 0 50v40z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
