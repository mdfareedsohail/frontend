import React from 'react'
import products from '../data/products.json'
import { useNavigate } from 'react-router-dom'
import { convertPrice, getCurrency } from '../utils/currency'

export default function Cart() {
  const navigate = useNavigate()
  const [, forceUpdate] = React.useState(0)
  
  function loadCart() {
    try {
      const cart = JSON.parse(localStorage.getItem('th_cart') || '[]')
      // Filter out products that no longer exist
      return cart.filter(item => products.find(p => p.id === item.id))
    } catch {
      return []
    }
  }

  const [items, setItems] = React.useState(loadCart)

  React.useEffect(() => {
    const handleCurrencyChange = () => {
      forceUpdate(prev => prev + 1)
    }
    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  React.useEffect(() => {
    localStorage.setItem('th_cart', JSON.stringify(items))
    window.dispatchEvent(new Event('cartUpdated'))
  }, [items])

  function remove(index) {
    const copy = items.slice()
    copy.splice(index, 1)
    setItems(copy)
  }

  function changeQty(index, delta) {
    const copy = items.slice()
    copy[index].qty = Math.max(1, (copy[index].qty || 1) + delta)
    setItems(copy)
  }

  const enriched = items
    .map(it => {
      const prod = products.find(p => p.id === it.id)
      if (!prod) return null
      return { ...prod, qty: it.qty || 1 }
    })
    .filter(Boolean)

  const totalUSD = enriched.reduce((s, p) => s + (p.priceUSD * p.qty), 0)

  function checkout() {
    navigate('/payment')
  }

  return (
    <div className="page cart">
      <h2>Your Cart</h2>
      {enriched.length === 0 ? <p>Cart is empty.</p> : (
        <div>
          <ul className="cart-list">
            {enriched.map((p, idx) => (
              <li key={p.id}>
                <img src={p.image} alt={p.title} />
                <div className="cart-meta">
                  <strong>{p.title}</strong>
                  <div>{convertPrice(p.priceUSD)} <small>{getCurrency()}</small></div>
                  <div className="qty-controls">
                    <button onClick={() => changeQty(idx, -1)}>-</button>
                    <span>{p.qty}</span>
                    <button onClick={() => changeQty(idx, +1)}>+</button>
                  </div>
                </div>
                <div className="cart-actions">
                  <button onClick={() => remove(idx)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Total: {convertPrice(totalUSD)} <small>{getCurrency()}</small></p>
            <button className="btn" onClick={checkout}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  )
}
