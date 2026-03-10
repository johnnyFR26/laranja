/**
 * Tipos para a tela de detalhes da vaga (service request / job).
 */

export interface JobDetailEstablishment {
  name: string
  description: string
  logoUrl?: string | null
  rating?: string
  verified?: boolean
}

export interface JobDetailLocation {
  address: string
  /** URL para abrir no maps (ex.: Google Maps) */
  directionsUrl?: string
}

export interface JobDetailSummaryItem {
  label: string
  value: string
}

export interface JobDetailOtherRole {
  id: string
  role: string
  timeLabel: string
  rate: string
}

export interface JobDetailData {
  id: string
  title: string
  /** Ex.: "The Gourmet Kitchen • Fine Dining Experience" */
  subtitle: string
  heroImageUrl?: string | null
  /** Tags ex.: "Urgent Fill", "Premium" */
  tags?: { label: string; variant: 'urgent' | 'premium' }[]
  date: string
  shift: string
  rate: string
  total: string
  description: string
  skills: string[]
  establishment: JobDetailEstablishment
  location: JobDetailLocation
  summary: JobDetailSummaryItem[]
  otherRoles?: JobDetailOtherRole[]
}
