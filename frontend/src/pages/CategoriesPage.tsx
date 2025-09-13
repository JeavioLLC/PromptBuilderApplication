import React, { useState } from 'react'
import { Plus, FolderOpen } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import { Category } from '../types/category'
import Button from '../components/ui/Button'
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
    <div style={{ 
      flex: 1, 
      overflowY: 'auto',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Animated Background Orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse',
        zIndex: 0
      }} />

      {/* Glass Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        margin: '32px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(25px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        overflow: 'hidden'
      }}>
        {/* Hero Header Section */}
        <div style={{
          padding: '64px 48px 48px 48px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'center'
        }}>
          {/* Floating Icon */}
          <div style={{
            display: 'inline-block',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            marginBottom: '24px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            animation: 'bounce 3s infinite'
          }}>
            <FolderOpen size={40} style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
          </div>

          {/* Title with Gradient Text */}
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '900', 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 16px 0',
            textShadow: '0 4px 8px rgba(0,0,0,0.1)',
            letterSpacing: '-0.02em'
          }}>
            Categories
          </h1>
          
          <p style={{ 
            fontSize: '22px', 
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 0 32px 0',
            fontWeight: '500',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Organize your prompts with beautiful, intelligent categories
          </p>

          {/* Enhanced Create Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleCreate}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Plus size={20} />
            <span>Create New Category</span>
          </Button>
        </div>

        {/* Main Content Area */}
        <div style={{ padding: '48px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                borderTop: '4px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px auto'
              }} />
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                Loading categories...
              </p>
            </div>
          ) : categories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{
                width: '96px',
                height: '96px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <FolderOpen size={48} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: 'rgba(255, 255, 255, 0.9)',
                margin: '0 0 8px 0'
              }}>
                No categories yet
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '16px',
                margin: '0 0 24px 0'
              }}>
                Create your first category to get started
              </p>
              <Button variant="ghost" onClick={handleCreate}>
                <Plus size={16} />
                <span>Create Category</span>
              </Button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
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
        </div>
      </div>

      {/* Modals */}
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
    </div>
  )
}

export default CategoriesPage