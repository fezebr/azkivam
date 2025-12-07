import { apiClient } from '@/services/api.service'
import type { GetProductsRequest, GetProductsResponse } from '@/models/products/product.models'

export async function getProducts(params: GetProductsRequest = {}): Promise<GetProductsResponse> {
  //TODO: change 2 to 1 :)))
  const { size = 10, page = 1, categoryId, merchantIds = [] } = params
  const url = categoryId ? `/products/${categoryId}` : '/products'
  const query = {
    size,
    page,
  }

  const { data } = await apiClient.post<GetProductsResponse>(
    url,
    { merchantIds },
    { params: query },
  )

  return data
}
