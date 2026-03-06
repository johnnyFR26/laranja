# Validators (Zod + react-hook-form)

Um arquivo de validação por página/fluxo que possui formulário. Use com `@hookform/resolvers/zod` e `useForm`.

| Arquivo | Página/Formulário |
|---------|-------------------|
| `login.ts` | `/login` – LoginForm |
| `register.ts` | Registro auth (POST /auth/register) – senha min 8 (OpenAPI) |
| `freelancer-registration.ts` | `/register/freelancer` – FreelancerRegistrationForm |

Novos formulários: crie um novo arquivo aqui (ex.: `forgot-password.ts`) e exporte o schema + tipo dos valores no `index.ts`.
