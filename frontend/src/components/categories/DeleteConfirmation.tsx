import React from 'react'
import { Trash2 } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { DeleteConfirmationProps } from '../../types/category'

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  category,
  onConfirm
}) => {
  if (!category) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Category"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#fef2f2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Trash2 size={24} style={{ color: '#dc2626' }} />
          </div>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 4px 0'
            }}>
              Delete Category
            </h3>
            <p style={{
              color: '#64748b',
              margin: 0,
              fontSize: '14px'
            }}>
              This action cannot be undone
            </p>
          </div>
        </div>
        
        <p style={{
          color: '#374151',
          fontSize: '16px',
          margin: 0
        }}>
          Are you sure you want to delete <strong>"{category.name}"</strong>?
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button
            variant="secondary"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            style={{ flex: 1 }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmation
