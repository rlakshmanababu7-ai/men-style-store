import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import './Cart.css'
import toast from 'react-hot-toast'

function Cart({ fetchCartCount }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch cart data from Supabase
  const fetchCart = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCartItems(data || [])
    } catch (err) {
      console.error('Fetch cart error:', err)
      toast.error('Failed to load cart. Check Supabase config.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId)

      if (error) throw error

      setCartItems((prev) => prev.filter((item) => item.id !== itemId))
      fetchCartCount()
      toast.success('Item removed from cart')
    } catch (err) {
      console.error('Remove from cart error:', err)
      toast.error('Failed to remove item')
    }
  }

  // Calculate total
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  if (loading) {
    return (
      <div className="page-container container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container" id="cart-page">
      <div className="container">
        <div className="cart-header">
          <div>
            <h1 className="section-title">Shopping Cart</h1>
            <p className="section-subtitle">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link to="/" className="btn btn-secondary">
            ← Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart" id="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <Link to="/" className="btn btn-primary btn-lg">
              🛍️ Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items-list" id="cart-items-list">
              {cartItems.map((item, idx) => (
                <div
                  className="cart-item glass-card"
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.product_name} />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.product_name}</h3>
                    <div className="cart-item-meta">
                      <span className="cart-item-tag">
                        <span className="tag-label">Size:</span> {item.size}
                      </span>
                      <span className="cart-item-tag">
                        <span className="tag-label">Color:</span> {item.color}
                      </span>
                      <span className="cart-item-tag">
                        <span className="tag-label">Qty:</span> {item.quantity || 1}
                      </span>
                    </div>
                    <div className="cart-item-bottom">
                      <span className="price cart-item-price">
                        ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                      </span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                        id={`remove-${item.id}`}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary glass-card" id="cart-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-delivery">
                    {totalPrice >= 999 ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Discount</span>
                  <span style={{ color: 'var(--green)' }}>-₹0</span>
                </div>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span className="price summary-total-price">
                  ₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString('en-IN')}
                </span>
              </div>
              {totalPrice < 999 && (
                <p className="free-delivery-hint">
                  Add ₹{(999 - totalPrice).toLocaleString('en-IN')} more for free delivery!
                </p>
              )}
              <Link to="/checkout" className="btn btn-primary btn-lg checkout-btn" id="checkout-btn">
                📦 Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
