import type { CreateUserDto } from './user.dto.js'
import type { CreateAddressDto } from './address.dto.js'

/** Role slug for freelancer registration (e.g. waiter, kitchen-assistant, both) */
export type FreelancerRoleSlug = 'waiter' | 'kitchen-assistant' | 'both'

/** Day of week for availability */
export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

/** Shift slot */
export type ShiftSlot = 'morning' | 'evening'

/** Availability matrix: shift -> day -> available */
export type AvailabilityMatrix = Record<ShiftSlot, Partial<Record<DayOfWeek, boolean>>>

/** Compliance document URLs (after upload) */
export interface FreelancerComplianceDocumentsDto {
  foodHandlerPermit?: string | null
  alcoholLicense?: string | null
  idVerification?: string | null
}

/** Full freelancer registration payload (step 1–5) */
export interface FreelancerRegistrationDto {
  /** Step 1: maps to CreateUserDto + optional address */
  user: CreateUserDto
  address?: CreateAddressDto | null
  /** Step 2: selected role slug; backend can create UserRole(s) */
  roleSlug: FreelancerRoleSlug
  /** Step 3: skill labels/codes for display and filtering */
  skills: string[]
  /** Step 4: document URLs after upload */
  documents?: FreelancerComplianceDocumentsDto | null
  /** Step 5: when the freelancer is typically available */
  availability?: AvailabilityMatrix | null
}
