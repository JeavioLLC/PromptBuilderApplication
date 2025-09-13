import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return false
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    const success = await signup(email, password, confirmPassword)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Failed to create account. Please try again.')
    }
  }

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'var(--error)' }
    if (password.length < 10) return { strength: 2, label: 'Medium', color: 'var(--warning)' }
    return { strength: 3, label: 'Strong', color: 'var(--success)' }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div 
      className="h-screen flex items-center justify-center px-4 relative" 
      style={{ background: 'var(--gradient-secondary)' }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)`
        }}
      />
      <div 
        className="w-full max-w-md relative card card--padding-lg"
        style={{
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border)'
        }}
      >
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div 
            className="mx-auto mb-6 flex items-center justify-center"
            style={{
              width: '80px',
              height: '80px',
              background: 'var(--gradient-accent)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <UserPlus size={32} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="m-0 mb-3" style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Create Account
          </h1>
          <p className="m-0" style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Join us today and start your journey with our platform
          </p>
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className="mb-6" style={{ 
            background: 'var(--error-light)', 
            color: 'var(--error)',
            padding: '16px 20px',
            fontSize: '14px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--error)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Shield size={16} />
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Create a password"
                disabled={loading}
                style={{ paddingRight: '48px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-secondary transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300"
                      style={{ 
                        width: `${(passwordStrength.strength / 3) * 100}%`,
                        background: passwordStrength.color
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              <CheckCircle size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                placeholder="Confirm your password"
                disabled={loading}
                style={{ paddingRight: '48px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-secondary transition-colors"
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className="mt-2 flex items-center gap-2">
                {password === confirmPassword ? (
                  <>
                    <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                    <span className="text-xs" style={{ color: 'var(--success)' }}>
                      Passwords match
                    </span>
                  </>
                ) : (
                  <span className="text-xs" style={{ color: 'var(--error)' }}>
                    Passwords do not match
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
              style={{
                background: loading ? 'var(--primary)' : 'var(--gradient-primary)',
                border: 'none',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '16px',
                fontWeight: '600',
                padding: '18px 28px'
              }}
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Enhanced Footer */}
        <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold transition-colors"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textDecoration: 'none'
              }}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
