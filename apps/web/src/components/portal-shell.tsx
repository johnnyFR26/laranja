'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { useAuth } from '@/hooks/use-auth'

export interface PortalShellProps {
  children: React.ReactNode
}

export function PortalShell({ children }: PortalShellProps) {
  const pathname = usePathname() ?? '/'
  const { user: authUser } = useAuth()
  const sidebarUser = authUser
    ? {
        name: authUser.name ?? authUser.email,
        establishmentName: authUser.roles?.includes('owner') ? undefined : undefined,
        avatarUrl: authUser.avatarUrl ?? null,
      }
    : null

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar user={sidebarUser} currentPath={pathname} />
      <main className="flex-1 overflow-auto p-4 pl-14 pt-14 md:ml-64 md:p-8">
        {children}
      </main>
    </div>
  )
}
