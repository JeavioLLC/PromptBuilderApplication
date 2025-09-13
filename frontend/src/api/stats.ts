import { api } from './client'
import { StatsResponse } from './types'

export async function fetchStats(): Promise<StatsResponse> {
  const { data } = await api.get<StatsResponse>('/stats')
  return data
}


