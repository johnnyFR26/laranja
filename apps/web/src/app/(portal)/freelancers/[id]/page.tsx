import type { Metadata } from 'next'
import { FreelancerDetailPageClient } from '@/components/freelancers/freelancer-detail-page-client'
import { resolvePublicFreelancerDetail } from '@/lib/freelancers-public-mock'

interface FreelancerDetailPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5', '6'].map((id) => ({ id }))
}

export async function generateMetadata({ params }: FreelancerDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const freelancer = resolvePublicFreelancerDetail(id)
  const title = `${freelancer.name} — ${freelancer.role} | Grove Opportunities`
  const description = `${freelancer.specialty}. ${freelancer.experienceYears}+ anos de experiência. Contrate freelancers de hospitalidade na Grove Opportunities.`
  return {
    title,
    description: description.slice(0, 160),
    openGraph: { title, description: description.slice(0, 160) },
  }
}

export default async function FreelancerDetailPage({ params }: FreelancerDetailPageProps) {
  const { id } = await params
  const freelancer = resolvePublicFreelancerDetail(id)

  return <FreelancerDetailPageClient freelancer={freelancer} />
}
