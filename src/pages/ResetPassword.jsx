import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/auth'
import toast from 'react-hot-toast'
import './Auth.css'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    setLoading(true)

    try {
      const { error } = await resetPassword(password)
      if (error) throw error
      
      toast.success('Password updated successfully!')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Error updating password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>New Password</h2>
          <p>Set a secure password for your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="Min 6 characters" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm new password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
