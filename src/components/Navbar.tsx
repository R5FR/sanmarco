'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Phone, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import logo from '@/app/SM_logo.png'

interface NavbarProps {
  phone: string
}

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Notre Carte' },
  { href: '/a-propos', label: 'Qui sommes-nous' },
  { href: '/infos', label: 'Infos & Contact' },
]

export function Navbar({ phone }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 20))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled
          ? 'border-b border-border/30 bg-background/80 shadow-lg shadow-black/[0.03] backdrop-blur-xl'
          : 'bg-transparent backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image src={logo} alt="San Marco" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-foreground leading-tight">
              San Marco
            </span>
            <span className="relative font-display text-[0.7rem] italic tracking-[0.22em] text-foreground/55 leading-none pb-[4px] text-center w-full block">
              fratelli
              <span
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(to right, #009246 33%, #f0ece4 33%, #f0ece4 66%, #ce2b37 66%)' }}
              />
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                  'after:absolute after:bottom-0 after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300',
                  active
                    ? 'text-foreground after:w-1/2 after:left-1/4'
                    : 'text-foreground/60 after:w-0 after:left-1/2 hover:text-foreground hover:after:w-1/2 hover:after:left-1/4'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            variant="default"
            size="sm"
            className="group rounded-full gap-2 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <a href={`tel:${phone.replace(/\s/g, '')}`}>
              <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
              {phone}
            </a>
          </Button>
        </div>

        {/* Mobile trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-black/[0.06] active:bg-black/10"
            >
              <span className="flex flex-col gap-[5px]">
                <span className={cn(
                  'block h-[1.5px] rounded-full bg-current transition-all duration-300 origin-center',
                  isOpen ? 'w-5 rotate-45 translate-y-[6.5px]' : 'w-5'
                )} />
                <span className={cn(
                  'block h-[1.5px] rounded-full bg-current transition-all duration-300',
                  isOpen ? 'w-0 opacity-0' : 'w-3.5'
                )} />
                <span className={cn(
                  'block h-[1.5px] rounded-full bg-current transition-all duration-300 origin-center',
                  isOpen ? 'w-5 -rotate-45 -translate-y-[6.5px]' : 'w-5'
                )} />
              </span>
            </button>
          </SheetTrigger>

          {/* Mobile sheet — same cream background as the site */}
          <SheetContent
            side="right"
            className={cn(
              'w-full sm:max-w-[380px]',
              'border-0 p-0 gap-0',
              'bg-background',
              '[&>button]:text-foreground/30 [&>button]:hover:text-foreground/70 [&>button]:transition-colors [&>button]:duration-200'
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-8 pt-9 pb-7 pr-16">
              <div className="relative h-8 w-8 shrink-0">
                <Image src={logo} alt="" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <SheetTitle className="font-display text-base font-bold leading-tight text-foreground">
                  San Marco
                </SheetTitle>
                <span className="relative font-display text-[0.6rem] italic tracking-[0.22em] text-foreground/55 leading-none pb-[3px] text-center w-full block">
                  fratelli
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full"
                    style={{ background: 'linear-gradient(to right, #009246 33%, #f0ece4 33%, #f0ece4 66%, #ce2b37 66%)' }}
                  />
                </span>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-6">
              {navLinks.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group flex items-center gap-5 py-[18px]',
                      'border-b border-border/40 last:border-0',
                      'transition-all duration-200',
                      !active && 'hover:pl-1.5'
                    )}
                  >
                    <span className="w-6 shrink-0 font-mono text-[0.52rem] font-bold tracking-widest tabular-nums text-primary/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={cn(
                      'font-display text-[1.65rem] leading-tight transition-colors duration-200',
                      active
                        ? 'font-bold text-primary'
                        : 'font-normal text-foreground/60 group-hover:text-foreground'
                    )}>
                      {link.label}
                    </span>
                    <ArrowRight className={cn(
                      'ml-auto h-4 w-4 shrink-0 transition-all duration-300',
                      active
                        ? 'text-primary opacity-100'
                        : 'text-foreground/30 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                    )} />
                  </Link>
                )
              })}
            </nav>

            {/* Phone CTA */}
            <div className="px-6 pt-6 pb-10 border-t border-border/30">
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/8"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {phone}
              </a>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
