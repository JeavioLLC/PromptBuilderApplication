import React, { useState } from 'react'
import { Plus, FolderOpen } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import { Category } from '../types/category'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageLayout from '../components/layout/PageLayout'
import PageHeader from '../components/layout/PageHeader'
import CategoryCard from '../components/categories/CategoryCard'
import CategoryModal from '../components/categories/CategoryModal'
import DeleteConfirmation from '../components/categories/DeleteConfirmation'

const CategoriesPage: React.FC = () => {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const handleCreate = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = (category: Category) => {
    setDeletingCategory(category)
  }

  const handleModalSubmit = async (formData: { name: string; description: string }) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, formData)
    } else {
      await createCategory(formData)
    }
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteConfirm = async () => {
    if (deletingCategory) {
      await deleteCategory(deletingCategory.id)
      setDeletingCategory(null)
    }
  }

  return (
    <PageLayout>
      <PageHeader
        icon={<FolderOpen size={20} style={{ color: 'var(--shuttle-primary)' }} />}
        title="Categories"
        subtitle="Organize your prompts with custom categories for better management"
        action={
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={16} />
            <span>New Category</span>
          </Button>
        }
      />

      {loading ? (
        <Card className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">Loading categories...</p>
        </Card>
      ) : categories.length === 0 ? (
        <Card className="empty-state">
          <div className="empty-state__icon">
            <FolderOpen size={28} style={{ color: 'var(--shuttle-primary)' }} />
          </div>
          <h3 className="empty-state__title">No categories yet</h3>
          <p className="empty-state__description">
            Create your first category to organize your prompts
          </p>
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={16} />
            <span>Create Category</span>
          </Button>
        </Card>
      ) : (
        <div className="grid-auto-fit">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
              index={index}
            />
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCategory(null)
        }}
        category={editingCategory}
        onSubmit={handleModalSubmit}
      />

      <DeleteConfirmation
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        category={deletingCategory}
        onConfirm={handleDeleteConfirm}
      />
    </PageLayout>
  )
}

export default CategoriesPage