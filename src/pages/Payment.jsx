import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrency, convertPrice } from '../utils/currency'
import products from '../data/products.json'

export default function Payment() {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [currency, setCurrency] = React.useState(getCurrency())
  const [cartItems, setCartItems] = React.useState([])
  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    const handleCurrencyChange = () => {
      setCurrency(getCurrency())
    }
    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  React.useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('th_cart') || '[]')
      const enriched = items.map(it => {
        const prod = products.find(p => p.id === it.id)
        return prod ? { ...prod, qty: it.qty || 1 } : null
      }).filter(Boolean)
      
      setCartItems(enriched)
      const totalUSD = enriched.reduce((s, p) => s + (p.priceUSD * p.qty), 0)
      setTotal(totalUSD)
    } catch {
      setCartItems([])
      setTotal(0)
    }
  }, [currency])

  function pay(e) {
    e.preventDefault()
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      navigate('/')
      return
    }
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      localStorage.removeItem('th_cart')
      window.dispatchEvent(new Event('cartUpdated'))
      setLoading(false)
      alert(`Payment processed (mock) in ${currency}. Thank you for your purchase!`)
      navigate('/')
    }, 900)
  }

  if (cartItems.length === 0) {
    return (
      <div className="page payment">
        <div className="center">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before proceeding to payment.</p>
          <button className="btn" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page payment">
      <h2>Payment</h2>
      <p>This is a mock payment page. No real charges will be made.</p>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Order Summary</h3>
        <p>Items: {cartItems.length}</p>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '8px' }}>
          Total: {convertPrice(total)} <small>{currency}</small>
        </p>
      </div>

      <form className="card payment-card" onSubmit={pay}>
        <label>Card number</label>
        <input placeholder="4242 4242 4242 4242" required />

        <label>Name on card</label>
        <input placeholder="Full name" required />

        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Expiry</label>
            <input placeholder="MM/YY" required />
          </div>

          <div style={{ width: 120 }}>
            <label>CVV</label>
            <input placeholder="123" required />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Processing…' : `Pay ${convertPrice(total)} ${currency}`}
          </button>
        </div>
      </form>
    </div>
  )
}
