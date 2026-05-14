import type { Metadata } from 'next'
import Image from 'next/image'
import { AnimateIn } from '@/components/AnimateIn'
import heroBgImg from '@/app/imgs/1777830438-3_image3.jpg'
import storyImg from '@/app/imgs/1777830438-7_image3.jpg'
import savoirImg1 from '@/app/imgs/1777830438-4_image.jpg'
import savoirImg2 from '@/app/imgs/1777830438-3_image.jpg'
import savoirImg3 from '@/app/imgs/1777830438-5_image3.jpg'
import savoirImg4 from '@/app/imgs/1777830438-1_image2.jpg'
import {
  Heart,
  Leaf,
  Award,
  Users,
  ChefHat,
  Flame,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Qui sommes-nous — Pizzeria San Marco',
  description:
    'Découvrez l\'histoire de la Pizzeria San Marco, restaurant italien familial à Chaville depuis 1997. Notre passion, nos valeurs et notre équipe.',
}

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'La cuisine italienne est notre passion depuis toujours. Chaque plat est préparé avec amour et dévouement.',
  },
  {
    icon: Leaf,
    title: 'Fraîcheur',
    description: 'Nous sélectionnons chaque jour les meilleurs ingrédients auprès de producteurs locaux et italiens.',
  },
  {
    icon: Award,
    title: 'Authenticité',
    description: 'Nos recettes traditionnelles sont transmises de génération en génération, fidèles aux saveurs de l\'Italie.',
  },
  {
    icon: Users,
    title: 'Convivialité',
    description: 'Notre restaurant est un lieu de partage et de rencontre, où chaque client est accueilli comme un membre de la famille.',
  },
]

const EXPERIENCE_START_YEAR = 1997

export default function AProposPage() {
  const yearsOfExperience = new Date().getFullYear() - EXPERIENCE_START_YEAR

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 scale-[1.05]">
          <Image
            src={heroBgImg}
            alt="Intérieur du restaurant San Marco"
            fill
            className="object-cover object-center"
            quality={90}
            priority
          />
        </div>
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            Notre histoire
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Qui sommes-nous
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-white/70">
            Une famille, une passion, une tradition culinaire italienne depuis 1997
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-10 md:gap-16 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Depuis 1997
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Une histoire de <span className="text-primary">famille et de saveurs</span>
              </h2>
              <div className="space-y-4 text-base font-light text-muted-foreground leading-relaxed">
                <p>
                  Fondée en 1997, la Pizzeria San Marco est née de la volonté d&apos;apporter
                  les véritables saveurs de l&apos;Italie au cœur de Chaville. Depuis plus de
                  {' '}{yearsOfExperience} ans, nous perpétuons les traditions culinaires italiennes avec le même
                  enthousiasme qu&apos;au premier jour.
                </p>
                <p>
                  Notre pizzeria tire son nom de la célèbre place vénitienne, symbole
                  d&apos;élégance et de convivialité. C&apos;est dans cet esprit que nous
                  accueillons chaque jour nos clients : avec chaleur, générosité et un
                  souci constant de qualité.
                </p>
                <p>
                  De la pâte à pizza pétrie à la main aux sauces mitonnées avec des tomates
                  italiennes, chaque détail compte. Nous travaillons avec des producteurs
                  sélectionnés pour garantir des ingrédients d&apos;exception.
                </p>
              </div>
            </div>
            <div className="relative pb-6 md:pb-0">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-72 sm:h-96 md:h-[500px]">
                <Image
                  src={storyImg}
                  alt="Préparation de pizza artisanale"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Year badge — inside image on mobile, overflowing on desktop */}
              <div className="absolute bottom-10 left-4 md:-bottom-8 md:-left-8 rounded-2xl bg-primary p-4 md:p-6 text-primary-foreground shadow-2xl shadow-primary/25">
                <p className="font-display text-3xl md:text-4xl font-bold">{yearsOfExperience}</p>
                <p className="text-sm text-primary-foreground/80">années d&apos;expérience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Ce qui nous anime
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Nos <span className="text-primary">valeurs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12 lg:gap-x-24">
            {values.map((value, index) => (
              <AnimateIn key={index} delay={index * 100}>
                <div className="flex items-start gap-4">
                  <value.icon className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Savoir-faire Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-10 md:gap-16 md:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl h-64">
                  <Image
                    src={savoirImg1}
                    alt="Arancini faits maison"
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) calc(50vw - 12px), (max-width: 1024px) calc(50vw - 24px), calc(25vw - 20px)"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl mt-8 h-64">
                  <Image
                    src={savoirImg2}
                    alt="Grissini et farine artisanale"
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) calc(50vw - 12px), (max-width: 1024px) calc(50vw - 24px), calc(25vw - 20px)"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl h-64">
                  <Image
                    src={savoirImg3}
                    alt="Meringues maison en préparation"
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) calc(50vw - 12px), (max-width: 1024px) calc(50vw - 24px), calc(25vw - 20px)"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl mt-8 h-64">
                  <Image
                    src={savoirImg4}
                    alt="Charcuteries italiennes tranchées"
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) calc(50vw - 12px), (max-width: 1024px) calc(50vw - 24px), calc(25vw - 20px)"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Notre savoir-faire
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
                L&apos;art de la <span className="text-primary">cuisine italienne</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <ChefHat className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="mb-1 font-semibold">Fait maison</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pâte à pizza pétrie chaque matin, sauces maison, desserts artisanaux.
                      Tout est préparé sur place avec soin.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Flame className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="mb-1 font-semibold">Cuisson traditionnelle</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nos pizzas sont cuites au four à haute température pour une pâte
                      croustillante et légère, comme en Italie.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Leaf className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="mb-1 font-semibold">Ingrédients sélectionnés</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Mozzarella fior di latte, huile d&apos;olive extra vierge, tomates San
                      Marzano, charcuteries importées d&apos;Italie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
