export interface Product {
  id: string
  name: string
  slug: string
  available: boolean
  categoryId: number
  categoryName: string
  minPrice: number
  maxPrice: number
  imageUrl: string
  azkivam: boolean
  hidden: boolean
  merchantName: string
  merchantId: number
}

export interface GetProductsResponse {
  data: Product[]
  total: number
  page: number
  size: number
}

export interface GetProductsRequest {
  size?: number
  page?: number
  categoryId?: number
  merchantIds?: number[]
}
