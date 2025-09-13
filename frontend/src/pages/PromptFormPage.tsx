import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { usePrompts } from '@/hooks/usePrompts'
import { useCategories } from '@/hooks/useCategories'
import { z } from 'zod'
import { Save, X } from 'lucide-react'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  category_id: z.number(),
})

type FormValues = z.infer<typeof schema>

export default function PromptFormPage() {
  const params = useParams<{ id: string }>()
  const location = useLocation()
  const id = params.id ? Number(params.id) : undefined
  const navigate = useNavigate()
  const { getById, createMutation, updateMutation } = usePrompts()
  const promptQuery = id ? getById(id) : undefined
  const { categoriesQuery } = useCategories()
  
  const [formData, setFormData] = useState<FormValues>({
    title: '',
    content: location.state?.initialContent || '',
    category_id: 0,
  })
  const [errors, setErrors] = useState<Partial<FormValues>>({})

  useEffect(() => {
    if (promptQuery?.data) {
      const p = promptQuery.data
      setFormData({
        title: p.title,
        content: p.content,
        category_id: p.category_id,
      })
    }
  }, [promptQuery?.data])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const parsed = schema.safeParse(formData)
    if (!parsed.success) {
      const fieldErrors: Partial<FormValues> = {}
      parsed.error.issues.forEach((error: any) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof FormValues] = error.message as any
        }
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    const values = parsed.data

    if (id) {
      updateMutation.mutate(
        { id, input: values },
        { onSuccess: () => navigate('/prompts') }
      )
    } else {
      createMutation.mutate(values, { onSuccess: () => navigate('/prompts') })
    }
  }

  const isLoading = Boolean(id && promptQuery?.isLoading)
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Prompt' : 'Create New Prompt'}
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Prompt Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter a descriptive title for your prompt"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Prompt Content
              </label>
              <textarea
                id="content"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Use {variable} syntax to define variables"
              />
              {errors.content && (
                <p className="text-sm text-red-600 mt-1">{errors.content}</p>
              )}
            </div>

            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category_id"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.category_id ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value={0}>Select a category</option>
                {categoriesQuery.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/prompts')}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Prompt'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}


