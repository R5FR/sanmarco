'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

interface PopupModalProps {
  title?: string | null
  subtitle?: string | null
  content?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
}

const SESSION_KEY = 'sanmarco_popup_dismissed'

export function PopupModal({
  title,
  subtitle,
  content,
  imageUrl,
  imageAlt,
  buttonText,
  buttonUrl,
}: PopupModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
      const timer = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(SESSION_KEY, '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>

              {/* Image */}
              {imageUrl && (
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt || ''}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
                </div>
              )}

              {/* Content */}
              <div className={`px-8 pb-8 ${imageUrl ? 'pt-4' : 'pt-10'}`}>
                {/* Decorative accent */}
                {!imageUrl && (
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-2xl">🍕</span>
                    </div>
                  </div>
                )}

                {subtitle && (
                  <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">
                    {subtitle}
                  </p>
                )}

                {title && (
                  <h2 className="mb-4 text-center font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {title}
                  </h2>
                )}

                {content && (
                  <p className="mb-6 text-center text-sm leading-relaxed text-muted-foreground">
                    {content}
                  </p>
                )}

                {/* Separator */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {buttonText && buttonUrl && (
                    <a
                      href={buttonUrl}
                      className="flex-1 rounded-xl bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      onClick={dismiss}
                    >
                      {buttonText}
                    </a>
                  )}
                  <button
                    onClick={dismiss}
                    className="flex-1 rounded-xl border border-border px-6 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
