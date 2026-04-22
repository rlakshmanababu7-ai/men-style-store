import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, logout } from '../services/auth'
import toast from 'react-hot-toast'
import './Auth.css'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser()
      if (!userData) {
        navigate('/login')
      } else {
        setUser(userData)
      }
      setLoading(false)
    }

    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    const { error } = await logout()
    if (error) {
      toast.error('Logout failed')
    } else {
      toast.success('Logged out')
      navigate('/login')
    }
  }

  if (loading) return <div className="auth-container"><div className="loader"></div></div>

  return (
    <div className="container">
      <div className="dashboard-container">
        <div className="auth-header">
          <h2>User Dashboard</h2>
          <p>Welcome back, {user?.username || 'User'}</p>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Username</span>
            <span className="info-value">{user?.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Member Since</span>
            <span className="info-value">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Login Method</span>
            <span className="info-value">
              {user?.app_metadata?.provider === 'google' ? 'Google OAuth' : 'Email/Password'}
            </span>
          </div>
        </div>

        <button 
          className="auth-btn" 
          onClick={handleLogout}
          style={{ marginTop: '2rem', width: '100%', backgroundColor: '#ef4444' }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
