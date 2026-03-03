'use client'

import type { ReactNode } from 'react'
import { useAppStore } from '@/stores/app-store'

export { useAppStore }

export interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <>{children}</>
}
