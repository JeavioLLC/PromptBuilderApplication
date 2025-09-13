import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Library, FolderOpen } from 'lucide-react'
import { SidebarProps, NavItem } from '../../types/navigation'

const navItems: NavItem[] = [
  { path: '/', label: 'Chat Assistant', icon: Home },
  { path: '/prompts', label: 'Prompt Library', icon: Library },
  { path: '/categories', label: 'Categories', icon: FolderOpen },
]

const Sidebar: React.FC<SidebarProps> = ({ currentPath, userProfile }) => {
  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }

  return (
    <aside style={{
      width: '280px',
      flexShrink: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(226, 232, 240, 0.6)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'white',
            margin: '0',
            letterSpacing: '-0.025em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Prompt Builder
          </h1>
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '4px 0 0 0',
            fontWeight: '500'
          }}>
            AI Assistant Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px',
          paddingLeft: '16px'
        }}>
          Navigation
        </div>
        
        {navItems.map((item) => {
          const active = isActive(item.path)
          const IconComponent = item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: '16px',
                fontWeight: '500',
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                ...(active ? {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 8px 25px -8px rgba(102, 126, 234, 0.6)',
                  transform: 'translateY(-2px)'
                } : {
                  color: '#475569',
                  background: 'transparent'
                })
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.08)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.color = '#667eea'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.color = '#475569'
                }
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  bottom: '0',
                  width: '4px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '0 4px 4px 0'
                }} />
              )}
              <IconComponent size={20} style={{ marginRight: '16px' }} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div style={{
        padding: '24px',
        borderTop: '1px solid rgba(226, 232, 240, 0.4)',
        background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ position: 'relative' }}>
            <img 
              style={{
                height: '48px',
                width: '48px',
                borderRadius: '12px',
                objectFit: 'cover',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              src={userProfile.avatar || "https://placehold.co/100x100/4F46E5/FFFFFF?text=AU"} 
              alt="User avatar" 
            />
            {userProfile.isOnline && (
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                height: '16px',
                width: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 2px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {userProfile.name}
            </p>
            <p style={{
              fontSize: '12px',
              color: '#64748b',
              margin: '0',
              display: 'flex',
              alignItems: 'center'
            }}>
              {userProfile.isOnline && (
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '50%',
                  marginRight: '8px'
                }} />
              )}
              {userProfile.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
