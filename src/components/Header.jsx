import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrency, setCurrency } from '../utils/currency'

export default function Header() {
  const navigate = useNavigate()
  const [currency, setCur] = React.useState(getCurrency())
  const [cartCount, setCartCount] = React.useState(0)
  const [user, setUser] = React.useState(null)

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem('th_user') || 'null')
    } catch {
      return null
    }
  }

  React.useEffect(() => {
    setUser(getUser())
    
    const handleUserUpdate = () => {
      setUser(getUser())
    }
    window.addEventListener('userUpdated', handleUserUpdate)
    return () => window.removeEventListener('userUpdated', handleUserUpdate)
  }, [])

  function getCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('th_cart') || '[]')
      return cart.reduce((sum, item) => sum + (item.qty || 1), 0)
    } catch {
      return 0
    }
  }

  React.useEffect(() => {
    setCartCount(getCartCount())
    
    // Listen for storage changes (when cart is updated in other tabs/components)
    const handleStorageChange = () => {
      setCartCount(getCartCount())
    }
    window.addEventListener('storage', handleStorageChange)
    
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', handleStorageChange)
    
    // Poll for changes (for same-tab updates)
    const interval = setInterval(() => {
      setCartCount(getCartCount())
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  function onChange(e) {
    setCurrency(e.target.value)
    setCur(e.target.value)
    // Trigger re-render for currency change
    window.dispatchEvent(new Event('currencyChanged'))
  }

  return (
    <header className="site-header">
      <div className="brand" onClick={() => navigate('/')}>Tribal Handicrafts</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        {user ? (
          <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{user.name}</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <select value={currency} onChange={onChange}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </nav>
    </header>
  )
}
