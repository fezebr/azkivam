export interface Category {
  id: string | number
  name: string
  numericId?: number
  children?: Category[]
}

export interface GetCategoriesResponse {
  data: Category[]
}

