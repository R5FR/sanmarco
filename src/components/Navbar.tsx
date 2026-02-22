'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu, Phone, ChefHat } from 'lucide-react'

interface NavbarProps {
  restaurantName: string
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
            <ChefHat className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-foreground leading-tight">
              San Marco
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60 leading-tight">
              Pizzeria · Chaville
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] font-medium text-foreground/60 transition-colors duration-300 hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:left-1/4 hover:after:w-1/2"
            >
              {link.label}
            </Link>
          ))}
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
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ChefHat className="h-4 w-4" />
              </div>
              <SheetTitle className="font-display text-lg font-bold">
                San Marco
              </SheetTitle>
            </div>
            <div className="italia-divider w-full rounded-full mb-8" />
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3.5 text-[15px] font-medium text-foreground/70 transition-all duration-200 hover:bg-primary/5 hover:text-primary hover:pl-6"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
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
