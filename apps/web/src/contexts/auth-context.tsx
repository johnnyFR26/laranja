'use client'

import type { ReactNode } from 'react'
import { useAuthStore } from '@/stores/auth-store'

export { useAuthStore }

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>
}
