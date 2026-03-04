import { FreelancerTalentCard } from '@/components/cards/freelancer-talent-card'
import { FreelancersFilters } from '@/components/freelancers/freelancers-filters'
import type { FreelancerTalentCardData } from '@/components/cards/freelancer-talent-card'
import { FreelancersSearch } from '@/components/freelancers/freelancers-search'

const MOCK_TALENTS: FreelancerTalentCardData[] = [
  {
    id: '1',
    name: 'Marcus Chen',
    pricePerHour: '$32',
    role: 'Waiter',
    specialty: 'Professional Waiter • 5 yrs exp.',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCprf9UlootX5M39HuYEL413fj8v_p0L6IPLpEEEP19oDeuQJy7kbHcH9YdiF10j868TybChE98paXjMrP9jllZz43ujeyYqitDyaKSBEEhrVZkX5ciLERN6wGrWJQzEKhxSve5StmfNmPJuiz5gcDg1xf3jMt6STAThHrn_wyNekqOgU7_RZz6K5pm9NwVFDwo9It0KtLBh11U7u0Mg6YRRvW2qAy8_p3eupSd8n3nKsSWm2k4t3qd6CW0YycgGaZo4ZD_jaf6Tk0',
  },
  {
    id: '2',
    name: 'Elena Rodriguez',
    pricePerHour: '$28',
    role: 'Kitchen Assistant',
    specialty: 'Kitchen Assistant • Pastry Specialist',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2NlvZmXltkcRuA15qVORiINBjYnGw63Z3c8RcI8kGy3wtS0KISZcdMNR-ehfjzN1KJncFjsXS5PdGnlpk0QFG8at6OZk41l9E-Q9tGbXHq6fM-f8YNkb_DYZ_KQHCg3YjOQuw4VXsgMlEVoDjZE7EorEvtmUiiDFDLhQ-SLzEN3ypKufdAAmtYWeya-q0oBlPuHp4PaAoNIO7nRgureQCo0Xp94gS51-LuuHd_B51qj4WA6DlnBZJCB6F9Hdw1vL7KhUa0IB8p4',
  },
  {
    id: '3',
    name: 'David Miller',
    pricePerHour: '$35',
    role: 'Waiter',
    specialty: 'Waiter • Wine Sommelier Certified',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKPI5FAoPy0vf6nXBJshiXz9H0CdRcOQwsmwLfUMzlKLOrVrAz7yIzJMpHR4U0nMzUKIMxenBbnh6p4Z437luGxzyDZnRnWDOFeAeHwX47FV3kkFRDsaxLoJhWMmKEFB4z9Bk2ZjuTZdC632sPO6qe7J0Gtul6a7HuIhK9it7s5kgss409OT-EhhrrSjQyKxWOL4g-XfvZ634sWVNdIOsomvAa0bIZzVH7R_IcPA8TXJFZw06O4C__ZQXBYoe8s9EQotuIrgYfh6U',
  },
  {
    id: '4',
    name: 'Jordan Parks',
    pricePerHour: '$24',
    role: 'Kitchen Assistant',
    specialty: 'Kitchen Assistant • High Speed Prep',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfdg0sN6PeNUVRef1wSSb1Rj0JdldNTZe8c9m3pi98S5bQEQBk5HqNnm4Whn4PEqKuuImVX_fGO0c_FsM-szaIdloZVqww99CxpapLCi2G_jpLno2iKJdsnVXV-QwGsR35oB43IPRGi9cGZoKlc-ll4axQf1beEt8rS11hJLaXqe4oVTS3vTNh5AFZKmVDdLdjrWRX3rKV1Nl2b6hPwvaBArb6gCUYj9e9uCG3Nc8BY-kFdr3LnjLaND0fc-rNlfRNnOLMQ560cJg',
  },
  {
    id: '5',
    name: 'Sarah Jenkins',
    pricePerHour: '$30',
    role: 'Waiter',
    specialty: 'Waiter • Event Hospitality',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0whs5KpOYUKA0-MxIi3C7-KU-3-B1C_1Am-PxwE-IxcVcIjw5obMSt8qGfTQUaALwH5oHW81-Dk3iyBw-kzKdXHpixuc7F_1fir_NrqNNXGrUyoPdQxhT2B3qCyYJLJfOSqES7DUustpoJ7rTtwzuKiprMaj3SiDgC_Fqxe7ejjXPIG6QYZ0lOlpZVN0vojZhe5uTwlW-Zbhldm0acK56WAaTvGWAgpAD4_687Y1SaQev2QKeZbnxq0WScIc48n2PsJvIGTdv7xE',
  },
  {
    id: '6',
    name: 'Liam Thompson',
    pricePerHour: '$26',
    role: 'Kitchen Assistant',
    specialty: 'Kitchen Assistant • Dish & Prep Master',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSr05knJ3aNEYkbQORaiwVyelwm9FdbQUC7gtg2GIuojGFz8LRaFzKtMIWcIRjC_BDLLEJDq_X6uwvSDfroi7pEAsHWD0o02W6FHOBqZa9dpPkzL4jGKw7ntEIsI-ZlGkuYEG-W4WIGq9Ixwka43RfyGhMuHNVktWywkCmjOenCorV5Xcb4L2U9V_BcAOF0o8xOoj7EwqK3VG0WDiAwlnUZRzH5py7lBvBbHE6gTGLYLN7WeQ5oybikGzhID0rBxFbdl33ihCL_PM',
  },
]

export const metadata = {
  title: 'Find Your Prime Staff - Grove Opportunities',
  description: 'Hand-picked top-rated freelancers ready to boost your operations.',
}

export default function FreelancersPage() {
  return (
    <div className="space-y-8">
      <FreelancersSearch />

      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-secondary dark:text-white">
          Find Your Prime Staff
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Hand-picked top-rated freelancers ready to boost your operations.
        </p>
      </header>

      <FreelancersFilters />

      <section
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-label="Freelancers"
      >
        {MOCK_TALENTS.map((freelancer) => (
          <FreelancerTalentCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </section>

      <div className="mt-16 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-xl border-2 border-primary px-8 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-white"
        >
          Load More Talent
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
