import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    const success = await signup(email, password, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Failed to create account. Please try again.')
    }
  }

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
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Create a password"
                disabled={loading}
                style={{ paddingRight: '48px' }}
              />
            </div>
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
                'Create Account'
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
