import React from 'react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [, forceUpdate] = React.useState(0)

  React.useEffect(() => {
    const handleCurrencyChange = () => {
      forceUpdate(prev => prev + 1)
    }
    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  return (
    <div className="page home">
      <section className="hero">
        <h1>Preserve craftsmanship. Empower artisans.</h1>
        <p>Authentic tribal handicrafts — directly from artisan communities.</p>
      </section>

      <section className="catalog">
        <h2>Featured Crafts</h2>
        <div className="grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
