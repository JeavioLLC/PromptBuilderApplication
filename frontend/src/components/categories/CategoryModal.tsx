import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { CategoryModalProps, CategoryFormData } from '../../types/category'

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSubmit
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || ''
      })
    } else {
      setFormData({ name: '', description: '' })
    }
  }, [category, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setLoading(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Failed to save category:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'New Category'}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid rgba(226, 232, 240, 0.6)',
              borderRadius: '12px',
              fontSize: '16px',
              transition: 'all 0.2s',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              color: '#374151',
              boxSizing: 'border-box'
            }}
            placeholder="Enter category name"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid rgba(226, 232, 240, 0.6)',
              borderRadius: '12px',
              fontSize: '16px',
              transition: 'all 0.2s',
              resize: 'none',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              color: '#374151',
              minHeight: '80px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter category description"
            disabled={loading}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px' }}>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!formData.name.trim()}
            style={{ flex: 1 }}
          >
            {category ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CategoryModal
