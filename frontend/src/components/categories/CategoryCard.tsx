import React from 'react'
import { Edit3, Trash2, FolderOpen } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { CategoryCardProps } from '../../types/category'

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
  index = 0
}) => {
  return (
    <Card
      variant="glass"
      padding="lg"
      hoverable
      className="category-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}>
            <FolderOpen size={28} style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
          </div>
          <div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: 'rgba(255, 255, 255, 0.95)',
              margin: '0 0 4px 0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              {category.name}
            </h3>
            <div style={{
              width: '40px',
              height: '3px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%)',
              borderRadius: '2px'
            }}></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: '0.7' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(category)}
            title="Edit category"
            style={{ padding: '12px' }}
          >
            <Edit3 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(category)}
            title="Delete category"
            style={{ 
              padding: '12px',
              '--hover-bg': 'rgba(255, 107, 107, 0.3)',
              '--hover-border': 'rgba(255, 107, 107, 0.5)'
            } as React.CSSProperties}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <p style={{ 
        color: 'rgba(255, 255, 255, 0.8)', 
        fontSize: '16px', 
        lineHeight: '1.6',
        margin: '0',
        position: 'relative',
        zIndex: 1,
        fontWeight: '400'
      }}>
        {category.description || 'No description provided'}
      </p>

      {/* Subtle Corner Accent */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
        borderRadius: '0 24px 0 60px'
      }}></div>
    </Card>
  )
}

export default CategoryCard
