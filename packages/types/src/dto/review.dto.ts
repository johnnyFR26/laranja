export interface ReviewDto {
  id: string
  serviceOfferId: string
  authorId: string
  targetId: string
  rating: number
  comment: string | null
  createdAt: string
}

export interface CreateReviewDto {
  serviceOfferId: string
  authorId: string
  targetId: string
  rating: number
  comment?: string | null
}

export interface UpdateReviewDto {
  rating?: number
  comment?: string | null
}
