import React from 'react'

interface PageHeaderProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  icon, 
  title, 
  subtitle, 
  action, 
  className = '' 
}) => {
  return (
    <div className={`page-divider ${className}`}>
      <div className="page-header-content">
        <div className="page-header-info">
          {icon && (
            <div className="page-icon">
              {icon}
            </div>
          )}
          <div>
            <h1 className="page-title">{title}</h1>
          </div>
        </div>
        {action && action}
      </div>
      {subtitle && (
        <p className="page-subtitle">{subtitle}</p>
      )}
    </div>
  )
}

export default PageHeader
