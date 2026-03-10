import { CreateShiftForm } from '@/components/create-shift'

export const metadata = {
  title: 'Criar vaga de turno - Grove Opportunities',
  description: 'Publique uma vaga de turno para encontrar profissionais.',
}

export default function PostShiftPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 px-4 py-8 lg:px-8">
      <CreateShiftForm />
    </main>
  )
}
