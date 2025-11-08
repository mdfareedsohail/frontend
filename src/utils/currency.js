const KEY = 'th_currency'

export function setCurrency(code) {
  try { localStorage.setItem(KEY, code) } catch (e) {}
}

export function getCurrency() {
  try { return localStorage.getItem(KEY) || 'USD' } catch (e) { return 'USD' }
}

// Mock static rates (replace with live API for production)
const RATES = { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.79, JPY: 156.2 }

export function convertPrice(usd) {
  const cur = getCurrency()
  const rate = RATES[cur] || 1
  return (usd * rate).toFixed(2)
}
