import type { FreelancerTalentCardData } from '@/components/cards/freelancer-talent-card'
import type { FreelancerDetailData, ShiftOption } from '@/types/freelancer-detail'

/** IDs com perfil mock para SEO / listagem até existir API pública de freelancers. */
export const PUBLIC_FREELANCER_MOCK_IDS = ['1', '2', '3', '4', '5', '6'] as const

export const MOCK_FREELANCER_TALENTS: FreelancerTalentCardData[] = [
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfdg0sN6PeNUVRef1wSSB1Rj0JdldNTZe8c9m3pi98S5bQEQBk5HqNnm4Whn4PEqKuuImVX_fGO0c_FsM-szaIdloZVqww99CxpapLCi2G_jpLno2iKJdsnVXV-QwGsR35oB43IPRGi9cGZoKlc-ll4axQf1beEt8rS11hJLaXqe4oVTS3vTNh5AFZKmVDdLdjrWRX3rKV1Nl2b6hPwvaBArb6gCUYj9e9uCG3Nc8BY-kFdr3LnjLaND0fc-rNlfRNnOLMQ560cJg',
  },
  {
    id: '5',
    name: 'Sarah Jenkins',
    pricePerHour: '$30',
    role: 'Waiter',
    specialty: 'Waiter • Event Hospitality',
    topRated: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0whs5KpOYUKA0-MxIi3C7-KU-3-B1C_1Am-PxwE-IxcVcIjw5obMSt8qGfTQUaALwH5oHW81-Dk3iyBw-kzKdXHpixuc8F_1fir_NrqNNXGrUyoPdQxhT2B3qCyYJLJfOSqES7DUustpoJ7rTtwzuKiprMaj3SiDgC_Fqxe7ejjXPIG6QYZ0lOlpZVN0vojZhe5uTwlW-Zbhldm0acK56WAaTvGWAgpAD4_687Y1SaQev2QKeZbnxq0WScIc48n2PsJvIGTdv7xE',
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

const MOCK_FREELANCERS_DETAIL: Record<string, FreelancerDetailData> = {
  '1': {
    id: '1',
    name: 'Marcus Chen',
    role: 'Waiter',
    specialty: 'Professional Waiter',
    experienceYears: 5,
    pricePerHour: '$32',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCprf9UlootX5M39HuYEL413fj8v_p0L6IPLpEEEP19oDeuQJy7kbHcH9YdiF10j868TybChE98paXjMrP9jllZz43ujeyYqitDyaKSBEEhrVZkX5ciLERN6wGrWJQzEKhxSve5StmfNmPJuiz5gcDg1xf3jMt6STAThHrn_wyNekqOgU7_RZz6K5pm9NwVFDwo9It0KtLBh11U7u0Mg6YRRvW2qAy8_p3eupSd8n3nKsSWm2k4t3qd6CW0YycgGaZo4ZD_jaf6Tk0',
    verified: true,
    rating: 4.9,
    reviewCount: 128,
    successRate: 98,
    totalShifts: 150,
    repeatBookings: 12,
    skills: ['French Fine Dining', 'Italian Modern', 'Pastry Arts', 'Molecular Gastronomy'],
    online: true,
  },
  '2': {
    id: '2',
    name: 'Elena Rodriguez',
    role: 'Kitchen Assistant',
    specialty: 'Kitchen Assistant • Pastry Specialist',
    experienceYears: 4,
    pricePerHour: '$28',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2NlvZmXltkcRuA15qVORiINBjYnGw63Z3c8RcI8kGy3wtS0KISZcdMNR-ehfjzN1KJncFjsXS5PdGnlpk0QFG8at6OZk41l9E-Q9tGbXHq6fM-f8YNkb_DYZ_KQHCg3YjOQuw4VXsgMlEVoDjZE7EorEvtmUiiDFDLhQ-SLzEN3ypKufdAAmtYWeya-q0oBlPuHp4PaAoNIO7nRgureQCo0Xp94gS51-LuuHd_B51qj4WA6DlnBZJCB6F9Hdw1vL7KhUa0IB8p4',
    verified: true,
    rating: 4.8,
    reviewCount: 86,
    successRate: 97,
    totalShifts: 120,
    repeatBookings: 8,
    skills: ['Pastry Arts', 'Food Preparation', 'Deep Cleaning Protocol'],
    online: false,
  },
}

export const MOCK_FREELANCER_SHIFTS: ShiftOption[] = [
  { id: 's1', title: 'Head Line Cook', subtitle: 'Tonight, 5:00 PM - 11:00 PM' },
  { id: 's2', title: 'Grill Station Expert', subtitle: 'Friday, Oct 24 • Dinner' },
  { id: 's3', title: 'Sous Chef (Prep)', subtitle: 'Saturday, Oct 25 • All Day' },
]

export const DEFAULT_FREELANCER_DETAIL: FreelancerDetailData = {
  id: 'unknown',
  name: 'Alex Rivera',
  role: 'Executive Chef',
  specialty: 'Executive Chef',
  experienceYears: 12,
  pricePerHour: '$45',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCfMrlDGgS_CuXomLTq1sJOYf40o_HmdqzG2C9tpQz9E9kPXxuPLpcSdll1U3_A65mDrzG8ZT7kJ8JxjXBSAt9s-4hO004a1wXNscr9ACACL7YsBW2090ZFna1JreAGIvWkUQ0MTxtXronfT2Q3E0T7YLY2eFwOkRmJhHCOq0-QchjObiIUf45e4gqBQcq_ZwPJop5dSr7MS3L00LOesIoZ9u9Zkon6WwVAiwuosi6MpqgV_FW2oI7M5niamcjInZeEv09sE3curPo',
  verified: true,
  rating: 4.9,
  reviewCount: 128,
  successRate: 98,
  totalShifts: 150,
  repeatBookings: 12,
  skills: ['French Fine Dining', 'Italian Modern', 'Pastry Arts', 'Molecular Gastronomy'],
  online: true,
}

export function resolvePublicFreelancerDetail(id: string): FreelancerDetailData {
  if (!id) return DEFAULT_FREELANCER_DETAIL
  return (
    MOCK_FREELANCERS_DETAIL[id] ?? {
      ...DEFAULT_FREELANCER_DETAIL,
      id,
      name: 'Freelancer',
    }
  )
}
