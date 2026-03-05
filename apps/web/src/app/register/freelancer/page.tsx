import { FreelancerRegistrationForm } from '@/components/register/freelancer-registration-form'

export const metadata = {
  title: 'Cadastro de Freelancer - Grove Opportunities',
  description: 'Junte-se à rede de profissionais de hospitalidade.',
}

export default function RegisterFreelancerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <FreelancerRegistrationForm />
    </div>
  )
}
