import { apiClient } from '@/services/api.service'
import type { GetMerchantsResponse } from '@/models/merchants/merchants.models'

export async function getMerchants(): Promise<GetMerchantsResponse> {
  const response = await apiClient.get<GetMerchantsResponse>('/merchants')
  return response.data
}

