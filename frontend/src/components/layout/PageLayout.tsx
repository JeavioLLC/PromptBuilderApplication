import React from 'react'

interface PageLayoutProps {
  children?: React.ReactNode
  className?: string
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`page-container ${className}`}>
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default PageLayout
