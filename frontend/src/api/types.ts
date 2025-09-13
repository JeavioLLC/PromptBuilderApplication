export type ISODateString = string

export interface Category {
  id: number
  name: string
  description?: string
  created_at?: ISODateString | null
}

export interface Prompt {
  id: number
  title: string
  content: string
  variables: string[]
  category_id: number
  category_name?: string | null
  created_at?: ISODateString | null
  updated_at?: ISODateString | null
  usage_count: number
}

export interface StatsOverview {
  total_categories: number
  total_prompts: number
  total_usage: number
}

export interface CategoryBreakdownItem {
  category_name: string
  prompt_count: number
  total_usage: number
}

export interface StatsResponse {
  overview: StatsOverview
  recent_prompts: Prompt[]
  most_used_prompts: Prompt[]
  category_breakdown: CategoryBreakdownItem[]
}


