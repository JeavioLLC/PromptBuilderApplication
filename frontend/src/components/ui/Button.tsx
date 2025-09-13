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
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="loading-spinner" style={{ width: '16px', height: '16px' }} />
      )}
      {children}
    </button>
  )
}

export default Button
