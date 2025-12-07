import { apiClient } from '@/services/api.service'
import type { GetCategoriesResponse } from '@/models/categories/categories.models'

export async function getCategories(): Promise<GetCategoriesResponse> {
  const { data } = await apiClient.get<GetCategoriesResponse>('/categories')
  return data
}
