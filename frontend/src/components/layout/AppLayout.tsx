import React from 'react'
import Sidebar from './Sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      background: 'var(--bg-main)' 
    }}>
      <Sidebar />
      
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        background: 'var(--bg-secondary)'
      }}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
