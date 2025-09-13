import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  hoverable?: boolean
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
  hoverable = false
}) => {
  const baseStyles = {
    borderRadius: '16px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick ? 'pointer' : 'default',
  }

  const variants = {
    default: {
      background: 'white',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    elevated: {
      background: 'white',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    }
  }

  const paddings = {
    sm: { padding: '16px' },
    md: { padding: '24px' },
    lg: { padding: '32px' },
  }

  const hoverStyles = hoverable ? {
    transform: 'translateY(-4px)',
    boxShadow: variant === 'glass' 
      ? '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
      : '0 20px 40px rgba(0, 0, 0, 0.15)'
  } : {}

  const cardStyle = {
    ...baseStyles,
    ...variants[variant],
    ...paddings[padding],
  }

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, hoverStyles)
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, {
            transform: 'translateY(0)',
            boxShadow: variants[variant].boxShadow
          })
        }
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export default Card
