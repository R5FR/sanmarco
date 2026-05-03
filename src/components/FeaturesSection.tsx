'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { UtensilsCrossed, Clock, Truck, Heart } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring', stiffness: 90, damping: 16 } as const

// PNG food cutouts — place files in /public/food/
// Each file should be a PNG with transparent background
const foodItems = [
  { src: '/food/pizza.png',      top: '8%',     left: '2%',   w: 150, rotate: -8,   parallaxY: 32,  delay: 0.20 },
  { src: '/food/tomate.png',     top: '58%',    left: '1%',   w: 110, rotate: 10,   parallaxY: -24, delay: 0.30 },
  { src: '/food/basilic.png',    bottom: '8%',  left: '12%',  w: 130, rotate: -5,   parallaxY: 28,  delay: 0.15 },
  { src: '/food/olive.png',      top: '5%',     right: '4%',  w: 120, rotate: 7,    parallaxY: -20, delay: 0.25 },
  { src: '/food/ail.png',        top: '62%',    right: '2%',  w: 105, rotate: -12,  parallaxY: 30,  delay: 0.35 },
  { src: '/food/mozzarella.png', bottom: '10%', right: '8%',  w: 140, rotate: 6,    parallaxY: -28, delay: 0.10 },
]

interface FoodItemProps {
  src: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  w: number
  rotate: number
  parallaxY: number
  delay: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

function FoodItem({ src, top, bottom, left, right, w, rotate, parallaxY, delay, scrollYProgress }: FoodItemProps) {
  const y = useTransform(scrollYProgress, [0, 1], [`${parallaxY}px`, `${-parallaxY}px`])

  return (
    <motion.div
      className="absolute z-[2] pointer-events-none select-none"
      style={{ top, bottom, left, right, y }}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 110, damping: 14, delay }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={w}
        height={w}
        className="object-contain"
        style={{ filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.7)) drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
    </motion.div>
  )
}

// Flour SVG — turbulence + displacement for organic irregular flour patches
function FlourLayer() {
  return (
    <svg
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        {/* Large splash filter */}
        <filter id="ff-lg" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.05" numOctaves="4" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="18" />
        </filter>
        {/* Medium patch filter */}
        <filter id="ff-md" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.07 0.06" numOctaves="3" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="8" />
        </filter>
        {/* Dust particle filter */}
        <filter id="ff-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="17" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ── Large flour splashes ── */}
      <ellipse cx="110"  cy="160" rx="230" ry="150" fill="white" opacity="0.13" filter="url(#ff-lg)" />
      <ellipse cx="1330" cy="530" rx="210" ry="145" fill="white" opacity="0.11" filter="url(#ff-lg)" />
      <ellipse cx="780"  cy="20"  rx="180" ry="110" fill="white" opacity="0.09" filter="url(#ff-lg)" />
      <ellipse cx="300"  cy="630" rx="170" ry="105" fill="white" opacity="0.10" filter="url(#ff-lg)" />

      {/* ── Medium patches ── */}
      <ellipse cx="950"  cy="120" rx="140" ry="90"  fill="white" opacity="0.10" filter="url(#ff-md)" />
      <ellipse cx="190"  cy="490" rx="130" ry="85"  fill="white" opacity="0.09" filter="url(#ff-md)" />
      <ellipse cx="1200" cy="280" rx="120" ry="75"  fill="white" opacity="0.08" filter="url(#ff-md)" />
      <ellipse cx="560"  cy="580" rx="110" ry="70"  fill="white" opacity="0.07" filter="url(#ff-md)" />
      <ellipse cx="660"  cy="350" rx="100" ry="60"  fill="white" opacity="0.05" filter="url(#ff-md)" />

      {/* ── Small dust particles ── */}
      <circle cx="220"  cy="320" r="45" fill="white" opacity="0.11" filter="url(#ff-sm)" />
      <circle cx="1100" cy="180" r="40" fill="white" opacity="0.09" filter="url(#ff-sm)" />
      <circle cx="450"  cy="80"  r="35" fill="white" opacity="0.10" filter="url(#ff-sm)" />
      <circle cx="870"  cy="620" r="38" fill="white" opacity="0.09" filter="url(#ff-sm)" />
      <circle cx="1380" cy="400" r="32" fill="white" opacity="0.08" filter="url(#ff-sm)" />
      <circle cx="70"   cy="580" r="42" fill="white" opacity="0.10" filter="url(#ff-sm)" />

      {/* ── Fine flour scatter dots ── */}
      <circle cx="340"  cy="210" r="7"  fill="white" opacity="0.20" />
      <circle cx="1050" cy="450" r="6"  fill="white" opacity="0.18" />
      <circle cx="620"  cy="140" r="5"  fill="white" opacity="0.16" />
      <circle cx="900"  cy="540" r="8"  fill="white" opacity="0.19" />
      <circle cx="150"  cy="400" r="5"  fill="white" opacity="0.15" />
      <circle cx="1260" cy="160" r="6"  fill="white" opacity="0.17" />
      <circle cx="480"  cy="650" r="7"  fill="white" opacity="0.18" />
      <circle cx="740"  cy="420" r="4"  fill="white" opacity="0.14" />
      <circle cx="1150" cy="600" r="6"  fill="white" opacity="0.16" />
      <circle cx="80"   cy="240" r="5"  fill="white" opacity="0.15" />
    </svg>
  )
}

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Flour reveals and strengthens as section enters view, fades as it exits
  const flourOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0.5])

  return (
    <section ref={ref} className="relative section-gap overflow-hidden">
      {/* ── Ardoise background ── */}
      <div className="absolute inset-0">
        <Image
          src="/food/ardoise.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Light vignette — preserves texture, just pulls edges darker */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 110% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* Very subtle global darkening for text contrast */}
        <div className="absolute inset-0 bg-black/18" />
      </div>

      {/* ── Flour layer — scroll-linked reveal ── */}
      <motion.div
        style={{ opacity: flourOpacity }}
        className="absolute inset-0 pointer-events-none z-[1] will-change-transform"
      >
        <FlourLayer />
      </motion.div>

      {/* ── Food PNG items ── */}
      {foodItems.map((food, i) => (
        <FoodItem
          key={i}
          src={food.src}
          top={food.top}
          bottom={(food as { bottom?: string }).bottom}
          left={food.left}
          right={(food as { right?: string }).right}
          w={food.w}
          rotate={food.rotate}
          parallaxY={food.parallaxY}
          delay={food.delay}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* ── Main content ── */}
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading — clip-path wipe */}
        <div className="mb-16 overflow-hidden">
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Notre engagement
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Pourquoi choisir{' '}
              <span style={{ color: 'oklch(0.75 0.18 28)' }}>San Marco</span> ?
            </h2>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-14 lg:gap-x-24">
          {features.map((feature, index) => {
            const fromLeft = index % 2 === 0
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: fromLeft ? -50 : 50, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ ...SPRING, delay: index * 0.09 }}
              >
                <div className="flex items-start gap-5">
                  {/* Editorial number */}
                  <motion.span
                    className="font-display text-5xl font-bold leading-none select-none tabular-nums shrink-0 mt-1"
                    style={{ color: 'rgba(255,255,255,0.13)' }}
                    initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE, delay: index * 0.09 + 0.2 }}
                  >
                    0{index + 1}
                  </motion.span>

                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING, delay: index * 0.09 + 0.3 }}
                      >
                        <feature.icon
                          className="h-4 w-4 shrink-0"
                          style={{ color: 'oklch(0.75 0.18 28)' }}
                        />
                      </motion.div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
