import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="product-card-image-wrapper">
        {!imageLoaded && <div className="image-skeleton"></div>}
        <img
          src={product.colors[activeColor].image}
          alt={`${product.name} - ${product.colors[activeColor].name}`}
          className={`product-card-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="product-card-overlay">
          <span className="view-details-btn">View Details →</span>
        </div>
        <span className={`badge ${product.category === 'T-Shirt' ? 'badge-accent' : 'badge-cyan'} product-card-badge`}>
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>

        {/* Color Swatches */}
        <div className="product-card-colors">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              className={`color-swatch-mini ${activeColor === idx ? 'active' : ''}`}
              style={{ background: color.hex }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setActiveColor(idx)
                setImageLoaded(false)
              }}
              title={color.name}
              aria-label={`Color: ${color.name}`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="product-card-price-row">
          <span className="price product-card-price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="product-card-sizes">{product.sizes.length} sizes</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
