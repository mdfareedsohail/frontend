import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productsStatic from '../data/products.json' // keep this import
import { convertPrice, getCurrency } from '../utils/currency'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [, forceUpdate] = React.useState(0)

  React.useEffect(() => {
    const handleCurrencyChange = () => {
      forceUpdate(prev => prev + 1)
    }
    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  React.useEffect(() => {
    // Debug logs to help you see what's going on in the browser console
    console.log('[ProductPage] route id:', id)
    console.log('[ProductPage] static products import exists?', Array.isArray(productsStatic), 'length=', productsStatic ? productsStatic.length : 0)

    // Try static import first
    if (Array.isArray(productsStatic) && productsStatic.length > 0) {
      const found = productsStatic.find((p) => String(p.id) === String(id))
      if (found) {
        setProduct(found)
        setLoading(false)
        return
      }
      // If not found in static import, try fetching the JSON file directly (fallback)
    }

    // Fallback: fetch the JSON file (useful if import failed due to path or Vite caching)
    fetch('/src/data/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products.json: ' + res.status)
        return res.json()
      })
      .then((arr) => {
        console.log('[ProductPage] fetched products count:', Array.isArray(arr) ? arr.length : 'not-array')
        const found = Array.isArray(arr) ? arr.find((p) => String(p.id) === String(id)) : null
        if (found) {
          setProduct(found)
          setLoading(false)
        } else {
          setError(`Product with id "${id}" not found in products list (checked ${arr.length} items).`)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error('[ProductPage] fetch error:', err)
        setError('Unable to load products list. See console for details.')
        setLoading(false)
      })
  }, [id])

  function addToCart() {
    if (!product) return
    const cart = JSON.parse(localStorage.getItem('th_cart') || '[]')
    const existingIndex = cart.findIndex((item) => item.id === product.id)
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1
    } else {
      cart.push({ id: product.id, qty: 1 })
    }
    localStorage.setItem('th_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    navigate('/cart')
  }

  if (loading) return <div className="center">Loading product…</div>

  if (error) return (
    <div className="center">
      <h3>Product not found</h3>
      <p style={{ color: '#c0392b' }}>{error}</p>
      <p>Try returning to the <button className="btn" onClick={() => navigate('/')}>homepage</button>.</p>
      <hr />
      <small>Open DevTools → Console to see product debug logs.</small>
    </div>
  )

  if (!product) return (
    <div className="center">
      <h3>Product not found</h3>
      <p>No product matched the ID <strong>{id}</strong>.</p>
      <p><button className="btn" onClick={() => navigate('/')}>Back to home</button></p>
      <small>Check browser console for details.</small>
    </div>
  )

  return (
    <div className="page product-page">
      <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div className="info">
          <h2>{product.title}</h2>
          <p className="tribe">By: {product.tribe} artisans</p>
          <p className="price">{convertPrice(product.priceUSD)} <small>{getCurrency()}</small></p>
          <p>{product.description}</p>
          <button className="btn" onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}
