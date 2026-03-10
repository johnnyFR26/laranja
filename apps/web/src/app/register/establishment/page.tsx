import { EstablishmentRegistrationForm } from '@/components/register/establishment-registration-form'

export const metadata = {
  title: 'Cadastro de Estabelecimento - Grove Opportunities',
  description: 'Cadastre seu estabelecimento para contratar profissionais.',
}

export default function RegisterEstablishmentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <EstablishmentRegistrationForm />
    </div>
  )
}
