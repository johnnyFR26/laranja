/**
 * Tipos para a tela de detalhes do freelancer e painel de contratação.
 */

export interface FreelancerDetailData {
  id: string
  name: string
  role: string
  specialty: string
  experienceYears: number
  avatarUrl?: string | null
  verified?: boolean
  rating?: number
  reviewCount?: number
  pricePerHour: string
  successRate?: number
  totalShifts?: number
  repeatBookings?: number
  skills?: string[]
  online?: boolean
}

export interface ShiftOption {
  id: string
  title: string
  subtitle: string
  icon?: string
}
