import type { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`border-b border-slate-100 px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}

export interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>
}

export interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div
      className={`border-t border-slate-100 px-4 py-3 ${className}`}
    >
      {children}
    </div>
  )
}
