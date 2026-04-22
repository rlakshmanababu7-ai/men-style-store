import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'
import toast from 'react-hot-toast'
import './Navbar.css'

function Navbar({ cartCount, user }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    const { error } = await logout()
    if (error) {
      toast.error('Logout failed')
    } else {
      toast.success('Logged out')
      navigate('/login')
    }
  }

  // Get username from user metadata if available
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'

  return (
    <nav className="navbar" id="main-navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="navbar-logo">
          <span className="logo-icon">👕</span>
          <span className="logo-text">
            Boy<span className="logo-highlight">Style</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          
          {user && (
            <Link
              to="/cart"
              className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">🛒</span>
              Cart
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">👤</span>
                {username}
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="nav-btn signup-btn"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
