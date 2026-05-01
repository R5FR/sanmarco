'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu, Phone } from 'lucide-react'
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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/30 bg-background/80 shadow-lg shadow-black/[0.03] backdrop-blur-xl'
          : 'bg-transparent backdrop-blur-sm'
      }`}
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

        {/* Desktop Navigation */}
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
          <Button asChild variant="default" size="sm" className="group rounded-full gap-2 shadow-md hover:shadow-lg transition-shadow duration-300">
            <a href={`tel:${phone.replace(/\s/g, '')}`}>
              <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
              {phone}
            </a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted/60">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[400px] border-l-0 bg-background/95 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative h-9 w-9 shrink-0">
                <Image src={logo} alt="San Marco" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <SheetTitle className="font-display text-lg font-bold leading-tight">
                  San Marco
                </SheetTitle>
                <span className="relative font-display text-[0.7rem] italic tracking-[0.22em] text-foreground/55 leading-none pb-[4px] text-center w-full block">
                  fratelli
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(to right, #009246 33%, #f0ece4 33%, #f0ece4 66%, #ce2b37 66%)' }}
                  />
                </span>
              </div>
            </div>
            <div className="my-4 h-px bg-border/30" />
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                      active
                        ? 'bg-primary/8 text-primary pl-6'
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-primary hover:pl-6'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <div className="mt-8 px-4">
              <Button asChild variant="default" className="w-full rounded-full gap-2 shadow-lg">
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
