import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import './Checkout.css'
import toast from 'react-hot-toast'

function Checkout({ fetchCartCount }) {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  // Fetch cart for checkout summary
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Calculate total
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  const deliveryCharge = totalPrice >= 999 ? 0 : 99
  const grandTotal = totalPrice + deliveryCharge

  // Place order
  const placeOrder = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your address')
      return
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    setPlacing(true)

    try {
      // 1. Save order to Supabase
      const orderData = {
        customer_name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        items: cartItems,
        total: grandTotal
      }

      const { error: orderError } = await supabase
        .from('orders')
        .insert([orderData])

      if (orderError) throw orderError

      // 2. Clear cart from Supabase
      const { error: clearError } = await supabase
        .from('cart')
        .delete()
        .neq('id', 0)  // Delete all rows

      if (clearError) throw clearError

      // 3. Update cart count
      fetchCartCount()

      // 4. Show success
      setOrderPlaced(true)
      toast.success('Order placed successfully! 🎉')
    } catch (err) {
      console.error('Place order error:', err)
      toast.error('Failed to place order. Check Supabase config.')
    } finally {
      setPlacing(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="page-container container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="page-container container" id="order-success">
        <div className="order-success-wrapper">
          <div className="success-animation">
            <div className="success-circle">
              <span className="success-check">✓</span>
            </div>
          </div>
          <h1 className="success-title">Order Placed Successfully! 🎉</h1>
          <p className="success-subtitle">
            Thank you for your order, <strong>{formData.name}</strong>!
            <br />
            We'll deliver your items soon.
          </p>
          <div className="success-details glass-card">
            <div className="success-detail-row">
              <span>Total Paid</span>
              <span className="price">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="success-detail-row">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="success-detail-row">
              <span>Delivery To</span>
              <span>{formData.address}</span>
            </div>
          </div>
          <Link to="/" className="btn btn-primary btn-lg">
            🛍️ Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container" id="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1 className="section-title">Checkout</h1>
          <p className="section-subtitle">Complete your order</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">📦</div>
            <h2>No items to checkout</h2>
            <p>Add some items to your cart first.</p>
            <Link to="/" className="btn btn-primary btn-lg">
              🛍️ Go Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-layout">
            {/* Checkout Form */}
            <form className="checkout-form glass-card" onSubmit={placeOrder} id="checkout-form">
              <h3 className="form-section-title">📋 Delivery Information</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="form-input"
                  maxLength={10}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  className="form-input form-textarea"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg place-order-btn"
                disabled={placing}
                id="place-order-btn"
              >
                {placing ? (
                  <>
                    <span className="spinner"></span> Placing Order...
                  </>
                ) : (
                  <>✨ Place Order — ₹{grandTotal.toLocaleString('en-IN')}</>
                )}
              </button>
            </form>

            {/* Order Summary */}
            <div className="checkout-summary glass-card" id="checkout-summary">
              <h3 className="form-section-title">🛒 Order Summary</h3>

              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div className="checkout-item" key={item.id}>
                    <div className="checkout-item-image">
                      <img src={item.image} alt={item.product_name} />
                    </div>
                    <div className="checkout-item-info">
                      <span className="checkout-item-name">{item.product_name}</span>
                      <span className="checkout-item-meta">
                        {item.size} · {item.color}
                      </span>
                      <span className="price checkout-item-price">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? 'free-delivery' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Grand Total</span>
                <span className="price summary-total-price">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout
