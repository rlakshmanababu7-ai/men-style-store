import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { supabase } from './supabaseClient'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState(null)

  // Fetch cart count from Supabase
  const fetchCartCount = async () => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select('id')

      if (error) throw error
      setCartCount(data ? data.length : 0)
    } catch (err) {
      console.log('Cart count fetch error:', err.message)
    }
  }

  useEffect(() => {
    fetchCartCount()
  }, [])

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home showToast={showToast} fetchCartCount={fetchCartCount} />} />
          <Route path="/product/:id" element={<ProductDetails showToast={showToast} fetchCartCount={fetchCartCount} />} />
          <Route path="/cart" element={<Cart showToast={showToast} fetchCartCount={fetchCartCount} />} />
          <Route path="/checkout" element={<Checkout showToast={showToast} fetchCartCount={fetchCartCount} />} />
        </Routes>

        {/* Toast Notification */}
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            <span>{toast.type === 'success' ? '✅' : '❌'}</span>
            {toast.message}
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
