import { useState, useCallback } from 'react'
import { Category, CategoryFormData } from '../types/category'

// Mock data for now - will be replaced with real API calls
const mockCategories: Category[] = [
  { id: 1, name: 'General', description: 'General purpose prompts' },
  { id: 2, name: 'Technical', description: 'Technical documentation prompts' }
]

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createCategory = useCallback(async (data: CategoryFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newCategory: Category = {
        id: Date.now(),
        name: data.name,
        description: data.description,
        createdAt: new Date().toISOString()
      }
      
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      setError('Failed to create category')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCategory = useCallback(async (id: number, data: CategoryFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCategories(prev => prev.map(cat => 
        cat.id === id 
          ? { ...cat, ...data, updatedAt: new Date().toISOString() }
          : cat
      ))
    } catch (err) {
      setError('Failed to update category')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCategory = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCategories(prev => prev.filter(cat => cat.id !== id))
    } catch (err) {
      setError('Failed to delete category')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory
  }
}