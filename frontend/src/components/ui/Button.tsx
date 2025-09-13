import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled || loading ? 0.6 : 1,
  }

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
    },
    secondary: {
      background: '#f1f5f9',
      color: '#374151',
      border: '1px solid #e2e8f0',
    },
    danger: {
      background: '#dc2626',
      color: 'white',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
    },
    ghost: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
    }
  }

  const sizes = {
    sm: { padding: '8px 16px', fontSize: '14px', gap: '6px' },
    md: { padding: '12px 20px', fontSize: '16px', gap: '8px' },
    lg: { padding: '16px 24px', fontSize: '18px', gap: '12px' },
  }

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
  }

  return (
    <button
      style={buttonStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {children}
    </button>
  )
}

export default Button
