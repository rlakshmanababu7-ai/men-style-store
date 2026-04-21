import React, { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import './Home.css'

function Home({ showToast, fetchCartCount }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeFilter === 'All' || product.category === activeFilter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchQuery])

  const categories = ['All', 'T-Shirt', 'Shirt']

  return (
    <div className="page-container" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge badge-accent">🔥 New Collection 2026</span>
            </div>
            <h1 className="hero-title">
              Discover the
              <span className="hero-title-highlight"> Coolest Styles </span>
              for Boys
            </h1>
            <p className="hero-subtitle">
              Premium T-Shirts & Shirts crafted for comfort and style.
              From casual hangouts to special occasions — we've got you covered.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">10+</span>
                <span className="hero-stat-label">Products</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-number">50+</span>
                <span className="hero-stat-label">Color Options</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-number">5</span>
                <span className="hero-stat-label">Sizes Available</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-grid">
              <div className="hero-img hero-img-1">
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop" alt="T-Shirt" />
              </div>
              <div className="hero-img hero-img-2">
                <img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop" alt="Shirt" />
              </div>
              <div className="hero-img hero-img-3">
                <img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop" alt="T-Shirt" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section container" id="products-section">
        <div className="products-header">
          <div>
            <h2 className="section-title">Our Collection</h2>
            <p className="section-subtitle">
              {filteredProducts.length} products available
            </p>
          </div>

          {/* Search */}
          <div className="search-box" id="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              id="search-input"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-tabs" id="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'All' && '🛍️'}
              {cat === 'T-Shirt' && '👕'}
              {cat === 'Shirt' && '👔'}
              <span>{cat === 'All' ? 'All Products' : `${cat}s`}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid" id="product-grid">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} style={{ animationDelay: `${idx * 0.08}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">😕</span>
            <h3>No products found</h3>
            <p>Try a different search term or category</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
