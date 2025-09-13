import { useQuery } from '@tanstack/react-query'
import { fetchStats } from '@/api/stats'
import type { Prompt, StatsResponse } from '@/api/types'
import { Eye, TrendingUp, FolderOpen } from 'lucide-react'

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery<StatsResponse>({ 
    queryKey: ['stats'], 
    queryFn: fetchStats 
  })

  if (error) {
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded-lg">
        Error loading dashboard: {String(error)}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FolderOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? '...' : data?.overview.total_categories || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Prompts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? '...' : data?.overview.total_prompts || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Usage</p>
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? '...' : data?.overview.total_usage || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Most Used Prompts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Most Used Prompts</h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data?.most_used_prompts?.map((prompt: Prompt) => (
                <div key={prompt.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-semibold text-lg text-blue-600">{prompt.title}</h4>
                    <p className="text-sm text-gray-600">{prompt.category_name}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {prompt.usage_count}
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-8">No prompts found</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recent Prompts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Prompts</h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data?.recent_prompts?.map((prompt: Prompt) => (
                <div key={prompt.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-semibold text-lg text-blue-600">{prompt.title}</h4>
                    <p className="text-sm text-gray-600">{prompt.category_name}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {prompt.updated_at ? new Date(prompt.updated_at).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-8">No recent prompts found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


