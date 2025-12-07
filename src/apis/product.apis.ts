import { apiClient } from '@/services/api.service'
import type { GetProductsRequest, GetProductsResponse } from '@/models/products/products.models'

export async function getProducts(params: GetProductsRequest = {}): Promise<GetProductsResponse> {
  //TODO: change 2 to 1 :)))
  const { size = 10, page = 2, categoryId, merchantIds = [] } = params

  const query = {
    size,
    page,
    ...(categoryId ? { categoryId } : {}),
  }

  const response = await apiClient.post<GetProductsResponse>(
    '/products',
    { merchantIds },
    { params: query },
  )

  return response.data
}
