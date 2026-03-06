'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SidebarNav } from './sidebar-nav'
import { useAppStore } from '@/stores/app-store'
import { useAuth } from '@/hooks/use-auth'

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    active: true,
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    href: '/jobs',
    label: 'Open jobs',
    active: false,
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    href: '/freelancers',
    label: 'Freelancers',
    active: false,
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    href: '/shifts/post',
    label: 'Post a Shift',
    active: false,
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  {
    href: '/payments',
    label: 'Payments',
    active: false,
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    active: false,
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
]

export interface SidebarUser {
  name: string
  establishmentName?: string
  avatarUrl?: string | null
}

export interface SidebarProps {
  user?: SidebarUser | null
  currentPath?: string
}

function LogoIcon() {
  return (
    <svg
      className="h-8 w-8 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
    </svg>
  )
}

function LogoutButton({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    onClose?.()
    router.push('/login')
  }
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      Sair
    </button>
  )
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useAppStore()
  const isDark = theme === 'dark'
  const label = isDark ? 'Modo claro' : 'Modo escuro'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
      title={isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      aria-label={label}
    >
      {isDark ? (
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      <span>{label}</span>
    </button>
  )
}

function HamburgerButton({
  onClick,
  expanded,
}: {
  onClick: () => void
  expanded: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed left-3 top-3 z-50 flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-secondary dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
      aria-label={expanded ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={expanded}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  )
}

function SidebarPanel({
  user,
  currentPath,
  items,
  onClose,
}: {
  user: SidebarProps['user']
  currentPath: string
  items: Array<{ href: string; label: string; active: boolean; icon: React.ReactNode }>
  onClose?: () => void
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 p-4 md:p-6">
        <Link href="/" className="flex items-center gap-3" onClick={onClose}>
          <span className="flex items-center justify-center rounded-lg bg-primary p-2 text-white">
            <LogoIcon />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary dark:text-slate-100">
              Hospitality Pro
            </span>
            <span className="text-xs text-slate-500">Merchant Portal</span>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 md:hidden"
            aria-label="Fechar menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
        <SidebarNav items={items} onNavigate={onClose} />
        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <ThemeToggleButton />
        </div>
      </nav>

      {user && (
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-lg p-2">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <span
                className="flex size-10 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                aria-hidden
              >
                {user.name.charAt(0)}
              </span>
            )}
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                {user.name}
              </p>
              {user.establishmentName && (
                <p className="truncate text-xs text-slate-500">
                  {user.establishmentName}
                </p>
              )}
            </div>
          </div>
          <LogoutButton onClose={onClose} />
        </div>
      )}
    </>
  )
}

export function Sidebar({ user, currentPath = '/' }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useAppStore()

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setSidebarOpen(true)
    }
    if (typeof window !== 'undefined' && window.innerWidth < 768)
      setSidebarOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setSidebarOpen])

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    active:
      item.href === '/dashboard'
        ? currentPath === '/dashboard'
        : currentPath.startsWith(item.href),
  }))

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <>
      {/* Hamburger: só no mobile */}
      <HamburgerButton onClick={toggleSidebar} expanded={sidebarOpen} />

      {/* Backdrop: mobile, quando sidebar aberta */}
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={closeSidebar}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden md:pointer-events-none ${
          sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        tabIndex={sidebarOpen ? 0 : -1}
      />

      {/* Painel da sidebar: no mobile desliza; no desktop sempre visível */}
      <aside
        className={`fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 ease-out dark:border-teal-900/30 dark:bg-secondary md:translate-x-0 md:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Barra lateral"
        aria-hidden={!sidebarOpen}
      >
        <SidebarPanel
          user={user}
          currentPath={currentPath}
          items={items}
          onClose={closeSidebar}
        />
      </aside>
    </>
  )
}
