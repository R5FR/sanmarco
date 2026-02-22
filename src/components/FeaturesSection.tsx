import { UtensilsCrossed, Clock, Truck, Heart } from 'lucide-react'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Cuisine authentique',
    description:
      'Des recettes italiennes traditionnelles préparées avec des ingrédients frais sélectionnés avec soin.',
  },
  {
    icon: Heart,
    title: 'Familiale depuis 1997',
    description:
      'Une histoire de passion transmise de génération en génération depuis plus de 25 ans.',
  },
  {
    icon: Truck,
    title: 'Livraison & à emporter',
    description:
      'Commandez par téléphone et récupérez vos plats ou faites-vous livrer à domicile.',
  },
  {
    icon: Clock,
    title: 'Service midi & soir',
    description:
      'Ouvert du mardi au dimanche, midi et soir. Consultez nos horaires pour plus de détails.',
  },
]

export function FeaturesSection() {
  return (
    <section className="section-gap relative overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            Notre engagement
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Pourquoi choisir{' '}
            <span className="text-gradient-warm">San Marco</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Quatre piliers qui font de nous votre restaurant italien de confiance
          </p>
          <div className="italia-divider mx-auto mt-8 w-16 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border/40 bg-card p-8 text-center card-hover-lift border-gradient"
            >
              {/* Numbered accent */}
              <span className="absolute top-4 right-5 font-display text-5xl font-bold text-primary/[0.04] select-none">
                0{index + 1}
              </span>

              <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-[1.05rem] font-semibold leading-snug">
                {feature.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
