import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { UserProfile } from '../../types/navigation'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()

  const userProfile: UserProfile = {
    name: 'Admin User',
    role: 'Administrator',
    isOnline: true
  }

  // Add body class for Sarathi styling
  React.useEffect(() => {
    document.body.className = 'text-gray-800'
    return () => {
      document.body.className = ''
    }
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)' 
    }}>
      <Sidebar 
        currentPath={location.pathname}
        userProfile={userProfile}
      />
      
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
