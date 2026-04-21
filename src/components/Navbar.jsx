import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

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

        {/* Desktop Navigation */}
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            id="nav-home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link
            to="/cart"
            className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
            id="nav-cart"
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">🛒</span>
            Cart
            {cartCount > 0 && (
              <span className="cart-badge" id="cart-badge">{cartCount}</span>
            )}
          </Link>
          <Link
            to="/checkout"
            className={`nav-link ${isActive('/checkout') ? 'active' : ''}`}
            id="nav-checkout"
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">📦</span>
            Checkout
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          id="hamburger-btn"
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
