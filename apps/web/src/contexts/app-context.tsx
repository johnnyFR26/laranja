'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useAppStore } from '@/stores/app-store'

export { useAppStore }

const THEME_KEY = 'grove-theme'

function getInitialTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(THEME_KEY) as
    | 'light'
    | 'dark'
    | 'system'
    | null
  if (stored === 'light' || stored === 'dark' || stored === 'system')
    return stored
  return 'system'
}

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (isDark) root.classList.add('dark')
  else root.classList.remove('dark')
}

export interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const theme = useAppStore((s) => s.theme)
  const hydrated = useRef(false)

  useEffect(() => {
    const initial = getInitialTheme()
    useAppStore.setState({ theme: initial })
    applyTheme(initial)
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    applyTheme(theme)
    if (typeof window !== 'undefined')
      window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return <>{children}</>
}
