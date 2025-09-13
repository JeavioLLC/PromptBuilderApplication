import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  hoverable?: boolean
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  onClick,
  hoverable = false
}) => {
  const cardClasses = [
    'card',
    `card--padding-${padding}`,
    hoverable ? 'card--hover' : '',
    onClick ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cardClasses}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
