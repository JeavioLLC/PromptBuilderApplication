import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, deleteCategory, listCategories, updateCategory } from '@/api/categories'

export function useCategories() {
  const queryClient = useQueryClient()

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: listCategories,
  })

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: { name?: string; description?: string } }) =>
      updateCategory(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  return { categoriesQuery, createMutation, updateMutation, deleteMutation }
}


