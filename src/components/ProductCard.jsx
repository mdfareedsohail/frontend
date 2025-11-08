import React from 'react'
import { Link } from 'react-router-dom'
import { convertPrice, getCurrency } from '../utils/currency'

export default function ProductCard({ product }) {
  const [, forceUpdate] = React.useState(0)

  React.useEffect(() => {
    const handleCurrencyChange = () => {
      forceUpdate(prev => prev + 1)
    }
    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  if (!product) return null

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="meta">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{product.title}</h3>
        </Link>
        <p className="tribe">By: {product.tribe} artisans</p>
        <p className="price">{convertPrice(product.priceUSD)} <small>{getCurrency()}</small></p>
        <Link to={`/product/${product.id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  )
}
