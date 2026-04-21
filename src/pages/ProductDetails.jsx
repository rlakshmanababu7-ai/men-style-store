import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import products from '../data/products'
import './ProductDetails.css'

function ProductDetails({ showToast, fetchCartCount }) {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Reset when product changes
  useEffect(() => {
    setSelectedColor(0)
    setSelectedSize('')
    setImageLoaded(false)
  }, [id])

  if (!product) {
    return (
      <div className="page-container container">
        <div className="not-found">
          <span className="not-found-icon">🔍</span>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">← Back to Shop</Link>
        </div>
      </div>
    )
  }

  // Add to Cart function - saves to Supabase
  const addToCart = async () => {
    if (!selectedSize) {
      showToast('Please select a size first!', 'error')
      return
    }

    setIsAdding(true)

    try {
      const cartItem = {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        size: selectedSize,
        color: product.colors[selectedColor].name,
        image: product.colors[selectedColor].image,
        quantity: 1
      }

      const { data, error } = await supabase
        .from('cart')
        .insert([cartItem])

      if (error) throw error

      showToast(`${product.name} added to cart!`, 'success')
      fetchCartCount()
    } catch (err) {
      console.error('Add to cart error:', err)
      showToast('Failed to add to cart. Check Supabase config.', 'error')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="page-container" id="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb" id="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-link">{product.category}s</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-detail-layout">
          {/* Left - Image Gallery */}
          <div className="product-gallery" id="product-gallery">
            <div className="gallery-main">
              {!imageLoaded && <div className="image-skeleton gallery-skeleton"></div>}
              <img
                src={product.colors[selectedColor].image}
                alt={`${product.name} - ${product.colors[selectedColor].name}`}
                className={`gallery-main-img ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
              />
              <span className={`badge ${product.category === 'T-Shirt' ? 'badge-accent' : 'badge-cyan'} gallery-badge`}>
                {product.category}
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="gallery-thumbnails">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  className={`gallery-thumb ${selectedColor === idx ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedColor(idx)
                    setImageLoaded(false)
                  }}
                  id={`thumb-${idx}`}
                >
                  <img src={color.image} alt={color.name} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="product-info" id="product-info">
            <div className="product-info-header">
              <span className={`badge ${product.category === 'T-Shirt' ? 'badge-accent' : 'badge-cyan'}`}>
                {product.category}
              </span>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price-tag">
                <span className="price product-main-price">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="price-label">Inclusive of all taxes</span>
              </div>
            </div>

            <div className="product-divider"></div>

            {/* Color Selection */}
            <div className="product-option-group" id="color-selector">
              <label className="option-label">
                Color: <span className="option-value">{product.colors[selectedColor].name}</span>
              </label>
              <div className="color-swatches">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`color-swatch ${selectedColor === idx ? 'active' : ''}`}
                    style={{ background: color.hex }}
                    onClick={() => {
                      setSelectedColor(idx)
                      setImageLoaded(false)
                    }}
                    title={color.name}
                    id={`color-${idx}`}
                    aria-label={`Select color: ${color.name}`}
                  >
                    {selectedColor === idx && (
                      <span className="swatch-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="product-option-group" id="size-selector">
              <label className="option-label">
                Size: <span className="option-value">{selectedSize || 'Select a size'}</span>
              </label>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    id={`size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-divider"></div>

            {/* Add to Cart */}
            <button
              className="btn btn-primary btn-lg add-to-cart-btn"
              onClick={addToCart}
              disabled={isAdding}
              id="add-to-cart-btn"
            >
              {isAdding ? (
                <>
                  <span className="spinner"></span> Adding...
                </>
              ) : (
                <>🛒 Add to Cart</>
              )}
            </button>

            {/* Features */}
            <div className="product-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <span>On orders above ₹999</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <span>7-day return policy</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <strong>Premium Quality</strong>
                  <span>100% genuine products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
