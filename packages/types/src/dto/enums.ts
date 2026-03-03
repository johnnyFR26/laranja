export type UserStatusDto = 'ACTIVE' | 'INACTIVE' | 'BANNED'

export type BudgetTypeDto = 'FIXED' | 'HOURLY' | 'NEGOTIABLE'

export type ServiceOfferStatusDto =
  | 'DRAFT'
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export type SubscriptionStatusDto =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN'
