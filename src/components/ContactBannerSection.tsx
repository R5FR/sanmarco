'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone, MapPin, ArrowRight } from 'lucide-react'
import lastImg from '@/app/imgs/san-marco.jpg'

interface ContactBannerSectionProps {
  phone: string
  address: string
  city: string
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

export function ContactBannerSection({ phone, address, city }: ContactBannerSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className="relative overflow-hidden section-gap">
      <div className="absolute inset-0">
        <motion.div
          style={{
            y: bgY,
            backgroundImage: `url(${lastImg.src})`,
            backgroundPosition: 'center 40%',
          }}
          className="absolute inset-[-20%] bg-cover bg-center bg-no-repeat"
        />
      </div>
      <div className="hero-overlay absolute inset-0" />

      <motion.div
        className="container relative z-10 mx-auto max-w-2xl px-6 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      >
        <motion.h2
          variants={item}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl"
        >
          Une envie de pizza ?
        </motion.h2>
        <motion.p
          variants={item}
          transition={{ duration: 0.75, ease: EASE }}
          className="mx-auto mb-10 max-w-md text-base font-light leading-relaxed text-white/75"
        >
          Appelez-nous pour commander ou réserver une table. Nous vous accueillons avec le sourire.
        </motion.p>
        <motion.div
          variants={item}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            variant="default"
            className="group rounded-full px-8 text-base font-semibold shadow-xl shadow-primary/25 gap-2 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
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
            className="group rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white hover:border-white/60 gap-2 transition-all duration-300"
          >
            <a href="/infos">
              <MapPin className="h-4 w-4" />
              {address}, {city}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
