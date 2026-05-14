'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import storyImg   from '@/app/imgs/1777830438-7_image3.jpg'
import kitchenImg from '@/app/imgs/1777830438-4_image.jpg'
import flourImg   from '@/app/imgs/1777830438-3_image.jpg'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring', stiffness: 85, damping: 16 } as const
const YEAR_START = 1997

export function StorySection() {
  const years = new Date().getFullYear() - YEAR_START

  return (
    <section className="section-gap overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">

          {/* ── Text ── */}
          <div>
            <motion.p
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              Notre histoire · Depuis 1997
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              >
                Une histoire de{' '}
                <span className="text-primary">famille&nbsp;et&nbsp;de&nbsp;saveurs</span>
              </motion.h2>
            </div>

            <motion.div
              className="space-y-4 text-base font-light text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.22 }}
            >
              <p>
                Fondée en 1997, la Pizzeria San Marco est née de la volonté d&apos;apporter
                les véritables saveurs de l&apos;Italie au cœur de Chaville. Depuis plus de{' '}
                {years}&nbsp;ans, nous perpétuons les traditions culinaires italiennes avec
                le même enthousiasme qu&apos;au premier jour.
              </p>
              <p>
                De la pâte pétrie à la main chaque matin aux sauces mitonnées avec des
                tomates italiennes — chaque détail compte. Une cuisine faite maison, servie
                avec chaleur, comme à la maison.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
            >
              <Link
                href="/a-propos"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                Découvrir notre histoire
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* ── Images ── */}
          <div className="relative">
            {/* Main image */}
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl h-72 sm:h-96 md:h-[480px]"
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ ...SPRING, delay: 0.1 }}
            >
              <Image
                src={storyImg}
                alt="Préparation artisanale en cuisine"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Floating small image — bottom-left overlap, desktop only */}
            <motion.div
              className="hidden md:block absolute -bottom-8 -left-6 w-44 md:w-52 overflow-hidden rounded-xl shadow-xl border-4 border-background"
              style={{ height: 160 }}
              initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.3 }}
            >
              <Image
                src={kitchenImg}
                alt="Arancini faits maison"
                fill
                className="object-cover object-center"
                sizes="210px"
              />
            </motion.div>

            {/* Floating small image — top-right overlap, desktop only */}
            <motion.div
              className="hidden md:block absolute -top-6 -right-6 w-36 md:w-44 overflow-hidden rounded-xl shadow-xl border-4 border-background"
              style={{ height: 130 }}
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.22 }}
            >
              <Image
                src={flourImg}
                alt="Farine et grissini artisanaux"
                fill
                className="object-cover object-center"
                sizes="176px"
              />
            </motion.div>

            {/* Year badge — inside image on mobile, overflowing on desktop */}
            <motion.div
              className="absolute bottom-4 right-4 md:-bottom-4 md:right-6 rounded-2xl bg-primary px-4 py-3 md:px-5 md:py-4 text-primary-foreground shadow-xl shadow-primary/30"
              initial={{ opacity: 0, scale: 0.5, rotate: 6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.45 }}
            >
              <p className="font-display text-2xl md:text-3xl font-bold leading-none">{years}</p>
              <p className="text-xs text-primary-foreground/75 mt-0.5">ans d&apos;expérience</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
