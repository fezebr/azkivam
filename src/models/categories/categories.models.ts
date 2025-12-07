export interface Category {
  id: number
  name: string
  slug: string
  enabled: boolean
  priority: number
  mapped: boolean
  parent: number | null
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
}

export interface GetCategoriesResponse {
  data: Category[]
}
