import { api } from './client'
import { Prompt } from './types'

export interface ListPromptsParams {
  category_id?: number
  search?: string
}

export async function listPrompts(params?: ListPromptsParams): Promise<Prompt[]> {
  const { data } = await api.get<Prompt[]>('/prompts', { params })
  return data
}

export async function getPrompt(id: number): Promise<Prompt> {
  const { data } = await api.get<Prompt>(`/prompts/${id}`)
  return data
}

export interface SavePromptInput {
  title: string
  content: string
  category_id: number
}

export async function createPrompt(input: SavePromptInput): Promise<Prompt> {
  const { data } = await api.post<Prompt>('/prompts', input)
  return data
}

export async function updatePrompt(id: number, input: Partial<SavePromptInput>): Promise<Prompt> {
  const { data } = await api.put<Prompt>(`/prompts/${id}` , input)
  return data
}

export async function deletePrompt(id: number): Promise<void> {
  await api.delete(`/prompts/${id}`)
}


