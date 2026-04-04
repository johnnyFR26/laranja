import { FreelancerTalentCard } from '@/components/cards/freelancer-talent-card'
import { FreelancersFilters } from '@/components/freelancers/freelancers-filters'
import { FreelancersSearch } from '@/components/freelancers/freelancers-search'
import { MOCK_FREELANCER_TALENTS } from '@/lib/freelancers-public-mock'

export const metadata = {
  title: 'Freelancers de hospitalidade | Grove Opportunities',
  description:
    'Profissionais freelancers top-rated para restaurantes, hotéis e eventos. Encontre garçons, cozinha e mais.',
}

export default function FreelancersPage() {
  return (
    <div className="space-y-8">
      <FreelancersSearch />

      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-secondary dark:text-white">
          Encontre o seu staff ideal
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Freelancers selecionados para reforçar a sua operação em hospitalidade.
        </p>
      </header>

      <FreelancersFilters />

      <section
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-label="Freelancers"
      >
        {MOCK_FREELANCER_TALENTS.map((freelancer) => (
          <FreelancerTalentCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </section>

      <div className="mt-16 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-xl border-2 border-primary px-8 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-white"
        >
          Carregar mais talentos
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
