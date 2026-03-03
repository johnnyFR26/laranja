'use client'

import type { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/auth-context'
import { AppProvider } from '@/contexts/app-context'

export interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  )
}
