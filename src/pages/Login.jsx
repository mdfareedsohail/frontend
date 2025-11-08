import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setCurrency } from '../utils/currency'

export default function Login() {
  const navigate = useNavigate()
  const existingUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('th_user') || 'null')
    } catch {
      return null
    }
  }, [])
  
  const [form, setForm] = React.useState({ 
    name: existingUser?.name || '', 
    email: existingUser?.email || '', 
    password: '', 
    country: existingUser?.country || 'USD' 
  })

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function submit(e) {
    e.preventDefault()
    const user = { name: form.name, email: form.email, country: form.country }
    localStorage.setItem('th_user', JSON.stringify(user))
    setCurrency(form.country)
    window.dispatchEvent(new Event('userUpdated'))
    navigate('/')
  }

  return (
    <div className="page login">
      <form className="card" onSubmit={submit}>
        <h2>{existingUser ? 'Update Account' : 'Create account / Login'}</h2>
        {existingUser && <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Welcome back, {existingUser.name}!
        </p>}

        <label>Your name</label>
        <input name="name" placeholder="Your name" value={form.name} onChange={onChange} required />

        <label>Email</label>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />

        <label>Password</label>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />

        <label>Preferred currency / location</label>
        <select name="country" value={form.country} onChange={onChange}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>

        <button className="btn" type="submit">{existingUser ? 'Update' : 'Continue'}</button>
      </form>
    </div>
  )
}
