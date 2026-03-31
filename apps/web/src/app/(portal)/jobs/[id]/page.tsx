import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  JobDetailHero,
  JobDetailStats,
  JobDetailDescription,
  JobDetailEstablishmentCard,
  JobDetailSidebar,
} from '@/components/job-detail'
import { getServiceOffer } from '@/lib/fetch-service-offer-server'
import { mapServiceOfferDetailToJobDetail } from '@/lib/map-service-offer-to-job-detail'
import type { JobDetailData } from '@/types/job-detail'

const MOCK_JOBS: Record<string, JobDetailData> = {
  a1: {
    id: 'a1',
    title: 'Garçom',
    subtitle: 'The Gourmet Kitchen • Experiência em fine dining',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAW1RxAO887yLScWhSslsjVxBAFSSIH_xY-ySmKU-fFybSYBrVZAHzUjTomfeWeIziV2zGCixM0QlyDj_3JbVkrxXtGb_hJe4zml1jYeaYB8kqmvMiZ5P7ZpOgSzD0CQIVhFhfLWew7BXEWAmEU9dky8_Noy7HLRDl4lzxiKjfu0UxG_UMUoIxUYmcoLHU6AZ_JDXOlihqIQPvT7vYMDqi88dqvKRImNXm8oAvQWzYLO1Go4FRea33uvzkKEQk_VgWBbR9kkaVUfe8',
    tags: [
      { label: 'Preenchimento urgente', variant: 'urgent' },
      { label: 'Premium', variant: 'premium' },
    ],
    date: '24 out 2023',
    shift: '17:00 – 23:00',
    rate: 'R$ 28,50/h',
    total: 'R$ 171,00',
    description:
      'Procuramos um garçom experiente para nossa equipe em um serviço de sexta à noite. O candidato ideal tem experiência em restaurantes de alto padrão, boa comunicação e aparência profissional. Você será responsável pelo atendimento às mesas, apresentação de vinhos e pela experiência do cliente.',
    skills: ['Fine Dining', 'Conhecimento em vinhos', 'Point of Sale'],
    establishment: {
      name: 'The Gourmet Kitchen',
      description:
        'Estabelecimento estrelado Michelin conhecido por seu menu sazonal e padrões de serviço impecáveis. Trabalhar conosco significa estar com os melhores do setor.',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA-nsVWRoMPCMEdaH6POL4INmaEZY_Ek1YvWO7138BngsoCv3PJyVrQBiJqX5xB8j4hzklD7efq2Qmvz-2sdA4zrDizAj-DjhyzBM-YJQS_AwFRQHic4nAEJNdu24_PWZjBFhfFGv2CSE0hT8P6mep-Q-KMeY9aYCE6y0x5_5Gfe7Bk9MJ0tEjEI4-hg2YfLSU207I5eaUV6l2GW43dF5l7a5xwKcQRllkLtZDWcfaMjsp93RrLGRUdrPvsFlu8gwt8Klj3Mkro1_A',
      rating: '4,9/5',
      verified: true,
    },
    location: {
      address: '742 Evergreen Terrace,\nManhattan, NY 10001',
      directionsUrl: 'https://www.google.com/maps',
    },
    summary: [
      { label: 'Função', value: 'Garçom líder' },
      { label: 'Experiência', value: '2+ anos' },
      { label: 'Uniforme', value: 'Black tie' },
      { label: 'Refeições', value: 'Incluídas' },
    ],
    otherRoles: [
      { id: 'a2', role: 'Auxiliar de cozinha', timeLabel: 'Amanhã • 10:00', rate: 'R$ 22/h' },
      { id: 'a3', role: 'Bartender', timeLabel: 'Sáb • 19:00', rate: 'R$ 30/h' },
    ],
  },
  a2: {
    id: 'a2',
    title: 'Auxiliar de cozinha',
    subtitle: 'Pasta House • Preparo e organização',
    date: '25 out 2023',
    shift: '10:00 – 18:00',
    rate: 'R$ 22/h',
    total: 'R$ 176,00',
    description:
      'Auxiliar de cozinha para apoio em preparo, organização e limpeza. Experiência com ritmo acelerado e trabalho em equipe.',
    skills: ['Preparo de alimentos', 'Organização', 'Limpeza'],
    establishment: {
      name: 'Pasta House',
      description: 'Cozinha italiana com foco em massa fresca e ambiente dinâmico.',
      rating: '4,7/5',
      verified: true,
    },
    location: { address: 'Upper East, Nova York' },
    summary: [
      { label: 'Função', value: 'Auxiliar de cozinha' },
      { label: 'Experiência', value: '1+ ano' },
      { label: 'Uniforme', value: 'Fornecido' },
      { label: 'Refeições', value: 'Incluídas' },
    ],
  },
  a3: {
    id: 'a3',
    title: 'Bartender',
    subtitle: 'Sky Lounge • Bebidas e atendimento ao bar',
    date: '26 out 2023',
    shift: '19:00 – 02:00',
    rate: 'R$ 30/h',
    total: 'R$ 210,00',
    description:
      'Bartender para coquetelaria e atendimento ao bar em ambiente premium.',
    skills: ['Coquetelaria', 'Atendimento', 'Organização'],
    establishment: {
      name: 'Sky Lounge',
      description: 'Lounge no topo com vista e carta de drinks elaborados.',
      rating: '4,8/5',
      verified: false,
    },
    location: { address: 'Rooftop, Centro' },
    summary: [
      { label: 'Função', value: 'Bartender' },
      { label: 'Experiência', value: '2+ anos' },
      { label: 'Uniforme', value: 'Padrão do local' },
      { label: 'Refeições', value: 'Incluídas' },
    ],
  },
}

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const fromApi = await getServiceOffer(id)
  if (fromApi) {
    const job = mapServiceOfferDetailToJobDetail(fromApi, id)
    return {
      title: `${job.title} - Grove Opportunities`,
      description: job.description.slice(0, 160),
    }
  }
  const job = MOCK_JOBS[id]
  if (!job) return { title: 'Vaga não encontrada' }
  return {
    title: `${job.title} - Grove Opportunities`,
    description: job.description.slice(0, 160),
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const fromApi = await getServiceOffer(id)
  const job: JobDetailData | undefined = fromApi
    ? mapServiceOfferDetailToJobDetail(fromApi, id)
    : MOCK_JOBS[id]

  if (!job) notFound()

  return (
    <main className="flex-1">
      <JobDetailHero job={job} />
      <div className="mx-auto max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-8 lg:grid lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <JobDetailStats job={job} />
          <JobDetailDescription job={job} />
          <JobDetailEstablishmentCard establishment={job.establishment} />
        </div>
        <aside className="mt-8 lg:mt-0">
          <JobDetailSidebar job={job} />
        </aside>
      </div>
    </main>
  )
}
