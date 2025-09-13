import { api } from './client'
import { Category } from './types'

export async function listCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/categories')
  return data
}

export async function createCategory(input: Pick<Category, 'name' | 'description'>): Promise<Category> {
  const { data } = await api.post<Category>('/categories', input)
  return data
}

export async function updateCategory(id: number, input: Partial<Pick<Category, 'name' | 'description'>>): Promise<Category> {
  const { data } = await api.put<Category>(`/categories/${id}`, input)
  return data
}

export async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/categories/${id}`)
}


