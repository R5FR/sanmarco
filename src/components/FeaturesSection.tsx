import { UtensilsCrossed, Clock, Truck, Heart } from 'lucide-react'
import { AnimateIn } from '@/components/AnimateIn'

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
    <section className="section-gap">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Notre engagement
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Pourquoi choisir <span className="text-primary">San Marco</span> ?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12 lg:gap-x-24">
          {features.map((feature, index) => (
            <AnimateIn key={index} delay={index * 100}>
              <div className="flex items-start gap-4">
                <feature.icon className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
