import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, UserCheck, LogOut, User, Shield } from 'lucide-react'
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
                  background: 'none'
                })
              }}
            >
              <IconComponent size={18} style={{ marginRight: 12 }} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Logout */}
      <Link
        to="/profile"
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            color: '#9ca3af',
            fontWeight: 600,
          }}>
            <User size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>{user?.name || 'niki'}</div>
            <div style={{ color: '#6b7280', fontSize: 13 }}>{user?.email || 'niki@jeavio.com'}</div>
          </div>
        </div>
      </Link>
      <div style={{ padding: '0 16px 16px 16px' }}>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#374151',
            fontWeight: 500,
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            marginTop: 4,
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar