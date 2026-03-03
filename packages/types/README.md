# @org/types

Pacote compartilhado de tipagens e DTOs do monorepo, alinhado às entidades do Prisma (addresses, users, roles, establishments, categories, service_offers, service_subscriptions, reviews).

## Uso

```ts
import {
  UserDto,
  CreateUserDto,
  AddressDto,
  ServiceOfferDto,
  ServiceOfferStatusDto,
} from '@org/types'
```

## Enums

- `UserStatusDto` — ACTIVE | INACTIVE | BANNED
- `BudgetTypeDto` — FIXED | HOURLY | NEGOTIABLE
- `ServiceOfferStatusDto` — DRAFT | OPEN | IN_PROGRESS | COMPLETED | CANCELLED
- `SubscriptionStatusDto` — PENDING | ACCEPTED | REJECTED | WITHDRAWN

## DTOs por entidade

| Entidade | DTOs |
|----------|------|
| Address | AddressDto, CreateAddressDto, UpdateAddressDto |
| User | UserDto, CreateUserDto, UpdateUserDto |
| Auth | LoginDto, AuthResponseDto, RegisterDto |
| Role | RoleDto, CreateRoleDto, UpdateRoleDto |
| UserRole | UserRoleDto, CreateUserRoleDto |
| Establishment | EstablishmentDto, CreateEstablishmentDto, UpdateEstablishmentDto |
| Category | CategoryDto, CreateCategoryDto, UpdateCategoryDto |
| ServiceOffer | ServiceOfferDto, CreateServiceOfferDto, UpdateServiceOfferDto |
| ServiceOfferRole | ServiceOfferRoleDto, CreateServiceOfferRoleDto |
| ServiceSubscription | ServiceSubscriptionDto, CreateServiceSubscriptionDto, UpdateServiceSubscriptionDto |
| Review | ReviewDto, CreateReviewDto, UpdateReviewDto |
