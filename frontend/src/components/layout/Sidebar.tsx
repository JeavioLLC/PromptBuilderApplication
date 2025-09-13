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
      width: '260px',
      flexShrink: 0,
      background: 'var(--shuttle-bg-card)',
      borderRight: '1px solid var(--shuttle-border)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shuttle-shadow-sm)',
      position: 'relative'
    }}>
      {/* Clean Header */}
      <div style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--shuttle-border-light)',
        background: 'var(--shuttle-bg-card)',
        padding: '0 24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--shuttle-text-primary)',
            margin: '0',
            letterSpacing: '-0.01em'
          }}>
            Prompt Builder
          </h1>
          <p style={{
            fontSize: '11px',
            color: 'var(--shuttle-text-muted)',
            margin: '2px 0 0 0',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            AI Assistant
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '500',
          color: 'var(--shuttle-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '12px',
          paddingLeft: '12px'
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
                padding: '12px 16px',
                borderRadius: 'var(--shuttle-radius)',
                fontWeight: '500',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                position: 'relative',
                margin: '2px 0',
                ...(active ? {
                  background: 'var(--shuttle-primary)',
                  color: 'var(--shuttle-text-on-primary)',
                  boxShadow: 'var(--shuttle-shadow-sm)'
                } : {
                  color: 'var(--shuttle-text-secondary)',
                  background: 'transparent'
                })
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'var(--shuttle-bg-hover)'
                  e.currentTarget.style.color = 'var(--shuttle-text-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--shuttle-text-secondary)'
                }
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '20px',
                  background: 'var(--shuttle-text-on-primary)',
                  borderRadius: '0 2px 2px 0'
                }} />
              )}
              <IconComponent size={18} style={{ marginRight: '12px' }} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Clean User Profile */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--shuttle-border-light)',
        background: 'var(--shuttle-bg-secondary)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'var(--shuttle-bg-card)',
          borderRadius: 'var(--shuttle-radius)',
          border: '1px solid var(--shuttle-border-light)',
          boxShadow: 'var(--shuttle-shadow-sm)'
        }}>
          <div style={{ position: 'relative' }}>
            <img 
              style={{
                height: '36px',
                width: '36px',
                borderRadius: 'var(--shuttle-radius-sm)',
                objectFit: 'cover',
                border: '2px solid var(--shuttle-border)',
                background: 'var(--shuttle-bg-secondary)'
              }}
              src={userProfile.avatar || "https://placehold.co/100x100/4a90a4/FFFFFF?text=AU"} 
              alt="User avatar" 
            />
            {userProfile.isOnline && (
              <div style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                height: '10px',
                width: '10px',
                background: 'var(--shuttle-success)',
                borderRadius: '50%',
                border: '2px solid var(--shuttle-bg-card)'
              }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--shuttle-text-primary)',
              margin: '0 0 1px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {userProfile.name}
            </p>
            <p style={{
              fontSize: '11px',
              color: 'var(--shuttle-text-muted)',
              margin: '0',
              display: 'flex',
              alignItems: 'center'
            }}>
              {userProfile.isOnline && (
                <span style={{
                  width: '6px',
                  height: '6px',
                  background: 'var(--shuttle-success)',
                  borderRadius: '50%',
                  marginRight: '6px'
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
