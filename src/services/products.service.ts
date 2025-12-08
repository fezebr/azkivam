import type { RouteLocationNormalized, Router } from 'vue-router'

export function parseMerchantIdsFromQuery(query: RouteLocationNormalized['query']): number[] {
  const merchantIdsParam = query.merchantIds

  if (merchantIdsParam) {
    return Array.isArray(merchantIdsParam)
      ? merchantIdsParam.map((id) => Number(id)).filter((id) => !isNaN(id))
      : merchantIdsParam
          .split(',')
          .map((id) => Number(id.trim()))
          .filter((id) => !isNaN(id))
  }

  return []
}

export function buildMerchantQuery(merchantIds: number[]): Record<string, string | undefined> {
  const query: Record<string, string | undefined> = {}

  if (merchantIds && merchantIds.length > 0) {
    query.merchantIds = merchantIds.join(',')
  }

  return query
}

export function navigateToCategoryProducts(
  router: Router,
  route: RouteLocationNormalized,
  categoryId: number,
  slug: string,
): void {
  router.push({
    name: 'category-products',
    params: {
      categoryId: String(categoryId),
      slug: slug,
    },
    query: route.query,
  })
}

export function navigateToProducts(router: Router, route: RouteLocationNormalized): void {
  router.push({
    name: 'products',
    query: route.query,
  })
}
