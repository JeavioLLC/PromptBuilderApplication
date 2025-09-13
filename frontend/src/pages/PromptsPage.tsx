import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePrompts } from '@/hooks/usePrompts'
import { useCategories } from '@/hooks/useCategories'
import type { Prompt } from '@/api/types'
import { Search, PlusCircle, Eye, Edit, Trash2 } from 'lucide-react'

export default function PromptsPage() {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const navigate = useNavigate()
  const { listQuery, deleteMutation } = usePrompts({ search, category_id: categoryId })
  const { categoriesQuery } = useCategories()

  const data = listQuery.data || []
  const loading = listQuery.isLoading

  const usePromptFromLibrary = (prompt: Prompt) => {
    navigate('/', { state: { initialPrompt: prompt.content } })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800">Prompt Library</h2>
        <button
          onClick={() => navigate('/prompts/new')}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Prompt</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or content..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full md:w-48 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 px-3 py-2"
              value={categoryId || ''}
              onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">Filter by Category</option>
              {categoriesQuery.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((prompt: Prompt) => (
              <div key={prompt.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <Link to={`/prompts/${prompt.id}`}>
                    <h4 className="font-semibold text-lg text-blue-600 hover:underline cursor-pointer">
                      {prompt.title}
                    </h4>
                  </Link>
                  <p className="text-sm text-gray-600 truncate max-w-lg mt-1">
                    {prompt.content}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>Category: <strong>{prompt.category_name}</strong></span>
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {prompt.usage_count}
                    </span>
                    {prompt.variables && prompt.variables.length > 0 && (
                      <span>Variables: {prompt.variables.join(', ')}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => usePromptFromLibrary(prompt)}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Use This Prompt
                  </button>
                  <Link
                    to={`/prompts/${prompt.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(prompt.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    title="Delete"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {data.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No prompts found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


