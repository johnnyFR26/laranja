'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'

const MOCK_USER = {
  name: 'Marco',
  establishmentName: 'La Trattoria Milano',
  avatarUrl: null,
}

export interface PortalShellProps {
  children: React.ReactNode
}

export function PortalShell({ children }: PortalShellProps) {
  const pathname = usePathname() ?? '/'

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar user={MOCK_USER} currentPath={pathname} />
      <main className="flex-1 overflow-auto p-4 pl-14 pt-14 md:ml-64 md:p-8">
        {children}
      </main>
    </div>
  )
}
