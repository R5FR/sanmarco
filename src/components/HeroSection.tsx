import { Button } from '@/components/ui/button'
import { Phone, ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle: string
  phone: string
}

export function HeroSection({ title, subtitle, phone }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden grain">
      {/* Background image with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.08]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80)',
        }}
      />
      {/* Multi-layer overlay for depth */}
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 italia-gradient-subtle opacity-50" />

      {/* Decorative floating elements */}
      <div className="absolute top-[15%] left-[8%] h-32 w-32 rounded-full bg-italia-gold/10 blur-3xl animate-float" />
      <div className="absolute bottom-[20%] right-[10%] h-40 w-40 rounded-full bg-italia-red/10 blur-3xl animate-float animation-delay-500" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Elegant divider */}
          <div className="italia-divider mx-auto mb-10 w-20 rounded-full animate-fade-in" />

          {/* Pre-title */}
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/50 animate-fade-in-up">
            Restaurant italien authentique
          </p>

          {/* Main title */}
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-[5.5rem] leading-[0.95] animate-fade-in-up animation-delay-100">
            {title}
          </h1>

          {/* Subtitle in glass card */}
          <div className="mx-auto mb-12 max-w-xl glass-dark rounded-2xl px-8 py-4 animate-fade-in-up animation-delay-200">
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              {subtitle}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up animation-delay-300">
            <Button
              asChild
              size="lg"
              variant="default"
              className="group rounded-full px-8 text-base font-semibold shadow-2xl gap-2 animate-pulse-glow"
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
              className="group rounded-full border-white/20 bg-white/5 px-8 text-base text-white backdrop-blur-md hover:bg-white/15 hover:text-white hover:border-white/40 gap-2 transition-all duration-300"
            >
              <a href="/menu">
                Voir notre carte
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave SVG */}
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
