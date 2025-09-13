import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import '../styles/login.css'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const success = await login(email, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Enhanced Header */}
        <div className="login-header">
          <div className="login-icon">
            <LogIn size={28} />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to continue your journey</p>
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div 
            className="login-error"
            style={{
              background: 'var(--error-light)',
              color: 'var(--error)',
              border: '1px solid var(--error)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-label" htmlFor="email">
              <Mail size={16} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="login-form-group">
            <label className="login-label" htmlFor="password">
              <Lock size={16} />
              Password
            </label>
            <div className="login-password-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input login-password-input"
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-submit">
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
                'Signing In...'
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Enhanced Footer */}
        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="login-footer-link"
              style={{
                fontWeight: '600',
                textDecoration: 'none',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage