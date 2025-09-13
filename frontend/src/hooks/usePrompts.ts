import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPrompt, deletePrompt, getPrompt, listPrompts, updatePrompt } from '@/api/prompts'

export function usePrompts(params?: { category_id?: number; search?: string }) {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['prompts', params],
    queryFn: () => listPrompts(params),
  })

  const createMutation = useMutation({
    mutationFn: createPrompt,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: { title?: string; content?: string; category_id?: number } }) =>
      updatePrompt(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePrompt(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] }),
  })

  const getById = (id: number) =>
    useQuery({
      queryKey: ['prompt', id],
      queryFn: () => getPrompt(id),
      enabled: !!id,
    })

  return { listQuery, createMutation, updateMutation, deleteMutation, getById }
}


