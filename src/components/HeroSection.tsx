'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight, ChevronDown } from 'lucide-react'
import heroImg from '@/app/imgs/1777830438-2_image4.jpg'

interface HeroSectionProps {
  title: string
  subtitle: string
  phone: string
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const wordReveal: Variants = {
  hidden: { y: '115%', opacity: 0 },
  visible: { y: '0%', opacity: 1 },
}

const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

function SplitTitle({ title }: { title: string }) {
  const words = title.split(' ')
  return (
    <motion.h1
      className="mb-8 font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-[5.5rem] leading-[1.05]"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.15] mr-[0.22em] last:mr-0">
          <motion.span
            className="inline-block"
            variants={wordReveal}
            transition={{ duration: 0.85, ease: EASE, delay: i * 0.09 + 0.2 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  )
}

export function HeroSection({ title, subtitle, phone }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Bg parallax — moves slower, stays behind
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  // Bg scale — zooms in slightly as it exits
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.22])
  // Overlay darkens as you scroll (adds depth to exit)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 1.6])
  // Content floats up faster than bg — creates separation depth
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  // All content fades as hero exits viewport
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  // Scroll indicator fades quickly
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[96vh] flex items-center justify-center overflow-hidden">
      {/* Parallax + scale background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 origin-center"
      >
        <Image
          src={heroImg}
          alt="Ambiance San Marco le soir"
          fill
          className="object-cover object-[center_70%]"
          priority
        />
      </motion.div>

      {/* Overlay — darkens on scroll exit */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="hero-overlay absolute inset-0"
      />

      {/* Content — floats up + fades on scroll */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 mx-auto max-w-7xl px-6 py-28 md:py-40"
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <motion.p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/50"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          >
            Restaurant italien authentique
          </motion.p>

          {/* Title — word by word */}
          <SplitTitle title={title} />

          {/* Subtitle */}
          <motion.p
            className="mx-auto mb-12 max-w-xl text-base font-light leading-relaxed text-white/75 md:text-lg"
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.85, ease: EASE, delay: 0.75 }}
          >
            {subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.85, ease: EASE, delay: 0.92 }}
          >
            <Button
              asChild
              size="lg"
              variant="default"
              className="group rounded-full px-8 text-base font-semibold shadow-2xl gap-2 w-full sm:w-auto"
            >
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span className="sm:hidden">{phone}</span>
                <span className="hidden sm:inline">Commander : {phone}</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white hover:border-white/60 gap-2 transition-all duration-300 w-full sm:w-auto"
            >
              <a href="/menu">
                Voir notre carte
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-white/35" />
        </motion.div>
      </motion.div>

      {/* Bottom — short gradient fade into background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            transparent 0%,
            color-mix(in oklch, var(--background) 30%, transparent) 40%,
            color-mix(in oklch, var(--background) 70%, transparent) 68%,
            color-mix(in oklch, var(--background) 92%, transparent) 88%,
            var(--background) 100%
          )`,
        }}
      />
    </section>
  )
}
