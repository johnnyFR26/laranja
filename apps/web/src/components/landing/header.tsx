'use client'

import Link from 'next/link'
import { useState } from 'react'

function GroveLogoIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-lg bg-primary text-white ${className ?? ''}`}
      aria-hidden
    >
      <svg className="size-full p-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </span>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-background-light/80 backdrop-blur-lg dark:border-slate-800/50 dark:bg-background-dark/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <GroveLogoIcon className="size-8" />
          <span className="text-lg font-bold tracking-tight text-secondary dark:text-white">
            Grove <span className="text-primary">Opportunities</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#recursos"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300 dark:hover:text-white"
          >
            Recursos
          </Link>
          <Link
            href="#como-funciona"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300 dark:hover:text-white"
          >
            Como Funciona
          </Link>
          <Link
            href="#depoimentos"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300 dark:hover:text-white"
          >
            Depoimentos
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300 dark:hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-primary-glow transition-all hover:bg-primary/90"
          >
            Começar Grátis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200/50 bg-background-light px-4 py-4 md:hidden dark:border-slate-800/50 dark:bg-background-dark">
          <nav className="flex flex-col gap-4">
            <Link
              href="#recursos"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#depoimentos"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <hr className="border-slate-200 dark:border-slate-700" />
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-secondary dark:text-slate-300"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white shadow-primary-glow transition-all hover:bg-primary/90"
            >
              Começar Grátis
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
