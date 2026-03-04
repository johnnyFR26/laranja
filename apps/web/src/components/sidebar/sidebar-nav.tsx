import Link from 'next/link'

export interface SidebarNavItem {
  href: string
  label: string
  icon: React.ReactNode
  active?: boolean
}

export interface SidebarNavProps {
  items: SidebarNavItem[]
  onNavigate?: () => void
}

export function SidebarNav({ items, onNavigate }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Navegação principal">
      {items.map((item) => {
        const isActive = item.active ?? false
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary-glow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
