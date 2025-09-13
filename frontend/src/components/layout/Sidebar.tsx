import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, UserCheck, Shield, LogOut, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface NavItem {
  path: string
  label: string
  icon: any
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/prompts', label: 'Prompt Library', icon: BookOpen },
  { path: '/contributions', label: 'My Contributions', icon: UserCheck },
  { path: '/admin', label: 'Admin Panel', icon: Shield },
]

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/')
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <aside style={{
      width: '260px',
      flexShrink: 0,
      background: 'var(--bg-main)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow)',
      position: 'relative',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {/* Clean Header */}
      <div style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-card)',
        padding: '0 24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: '0',
            letterSpacing: '-0.01em'
          }}>
            Sarathi
          </h1>
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
                borderRadius: 'var(--radius)',
                fontWeight: '500',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                position: 'relative',
                margin: '2px 0',
                ...(active ? {
                  background: 'var(--primary)',
                  color: 'var(--text-on-primary)',
                  boxShadow: 'var(--shadow-sm)'
                } : {
                  color: 'var(--text-secondary)',
                  background: 'transparent'
                })
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'var(--bg-hover)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
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
                  background: 'var(--text-on-primary)',
                  borderRadius: '0 2px 2px 0'
                }} />
              )}
              <IconComponent size={18} style={{ marginRight: '12px' }} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Logout */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-light)',
        background: 'var(--bg-secondary)'
      }}>
        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--border)'
          }}>
            <User size={18} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              margin: '0 0 1px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {user?.name || 'User'}
            </p>
            <p style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              margin: '0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: 'var(--radius)',
            fontWeight: '500',
            fontSize: '14px',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--error)'
            e.currentTarget.style.color = 'var(--text-on-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          <LogOut size={18} style={{ marginRight: '12px' }} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar