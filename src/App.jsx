import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import { supabase } from './services/supabase'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // Auth Session handling
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

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

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) return null
    if (!session) return <Navigate to="/login" />
    return children
  }

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="app">
        <Navbar cartCount={cartCount} user={session?.user} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home fetchCartCount={fetchCartCount} />} />
          <Route path="/product/:id" element={<ProductDetails fetchCartCount={fetchCartCount} />} />
          <Route path="/login" element={session ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={session ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart fetchCartCount={fetchCartCount} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout fetchCartCount={fetchCartCount} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
