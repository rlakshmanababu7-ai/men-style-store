import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword, getUser } from '../services/auth'
import toast from 'react-hot-toast'
import './Auth.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check if user is google user (we can't really know for sure without fetching, 
      // but if we fetch and check provider, it helps)
      // Actually Supabase returns error if you try to reset for external provider users usually
      
      const { error } = await forgotPassword(email)
      if (error) {
        if (error.message.includes('identity provider')) {
          toast.error('Please reset using Google')
          return
        }
        throw error
      }
      
      setSubmitted(true)
      toast.success('Reset link sent to your email!')
    } catch (error) {
      toast.error(error.message || 'Error sending reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>Enter your email to receive a reset link</p>
        </div>

        {!submitted ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? <div className="loader"></div> : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p style={{ color: 'var(--success-color)', marginBottom: '1.5rem' }}>
              We've sent a password reset link to your email. Please check your inbox.
            </p>
            <Link to="/login" className="auth-btn" style={{ textDecoration: 'none' }}>
              Back to Login
            </Link>
          </div>
        )}

        <div className="auth-footer">
          Return to <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
