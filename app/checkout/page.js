'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/context/CheckoutContext'
import StepIndicator from '@/components/StepIndicator'
import OrderSummaryPanel from '@/components/OrderSummaryPanel'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
]

const FIELDS = [
  { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Priya Sharma', autoComplete: 'name', colSpan: 2 },
  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'priya@example.com', autoComplete: 'email', colSpan: 1 },
  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210', autoComplete: 'tel', colSpan: 1 },
  { key: 'pinCode', label: 'PIN Code', type: 'text', placeholder: '560001', autoComplete: 'postal-code', colSpan: 1 },
  { key: 'city', label: 'City', type: 'text', placeholder: 'Bengaluru', autoComplete: 'address-level2', colSpan: 1 },
]

function validate(address) {
  const errors = {}
  if (!address.fullName.trim()) errors.fullName = 'Full name is required'
  if (!address.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) errors.email = 'Enter a valid email'
  if (!address.phone.trim()) errors.phone = 'Phone number is required'
  else if (!/^\d{10}$/.test(address.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid 10-digit number'
  if (!address.pinCode.trim()) errors.pinCode = 'PIN code is required'
  else if (!/^\d{6}$/.test(address.pinCode)) errors.pinCode = 'Enter a valid 6-digit PIN'
  if (!address.city.trim()) errors.city = 'City is required'
  if (!address.state) errors.state = 'Please select a state'
  return errors
}

export default function CheckoutPage() {
  const router = useRouter()
  const { address, updateAddress, cartItems } = useCheckout()
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBlur = (key) => {
    setTouched(prev => ({ ...prev, [key]: true }))
    const errs = validate(address)
    setErrors(errs)
  }

  const handleChange = (key, value) => {
    updateAddress(key, value)
    if (touched[key]) {
      const errs = validate({ ...address, [key]: value })
      setErrors(prev => ({ ...prev, [key]: errs[key] }))
    }
  }

  const handleSubmit = async () => {
    const allTouched = Object.fromEntries(
      ['fullName','email','phone','pinCode','city','state'].map(k => [k, true])
    )
    setTouched(allTouched)
    const errs = validate(address)
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 400))
    router.push('/payment')
  }

  if (cartItems.length === 0) {
    router.push('/')
    return null
  }

  return (
    <main className="min-h-screen bg-cream-50 relative z-10">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator currentStep={2} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 animate-fade-up" style={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-forest-900">Shipping Address</h1>
                <p className="text-sm text-forest-400 font-body mt-1">Where should we deliver your eco-friendly order?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.map(field => (
                  <div
                    key={field.key}
                    className={field.colSpan === 2 ? 'sm:col-span-2' : ''}
                  >
                    <label className="block text-xs font-body font-semibold text-forest-700 mb-1.5 uppercase tracking-wide">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      value={address[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      onBlur={() => handleBlur(field.key)}
                      className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-forest-900 bg-cream-50 placeholder-forest-300 transition-all
                        ${touched[field.key] && errors[field.key]
                          ? 'border-terra-500 bg-red-50/30'
                          : 'border-cream-300 hover:border-forest-300'
                        }`}
                    />
                    {touched[field.key] && errors[field.key] && (
                      <p className="text-xs text-terra-500 font-body mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors[field.key]}
                      </p>
                    )}
                  </div>
                ))}

                {/* State Dropdown */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-body font-semibold text-forest-700 mb-1.5 uppercase tracking-wide">
                    State
                  </label>
                  <select
                    value={address.state}
                    onChange={e => handleChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-forest-900 bg-cream-50 transition-all appearance-none cursor-pointer
                      ${touched.state && errors.state
                        ? 'border-terra-500 bg-red-50/30'
                        : 'border-cream-300 hover:border-forest-300'
                      } ${!address.state ? 'text-forest-300' : ''}`}
                  >
                    <option value="" disabled>Select your state</option>
                    {INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {touched.state && errors.state && (
                    <p className="text-xs text-terra-500 font-body mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Note */}
              <div className="mt-6 p-4 rounded-xl bg-forest-50 border border-forest-100 flex gap-3">
                <span className="text-xl shrink-0">📦</span>
                <div>
                  <p className="text-sm font-body font-medium text-forest-700">Estimated Delivery</p>
                  <p className="text-xs text-forest-500 font-body mt-0.5">
                    Typically 3–5 business days. Shipped in 100% recycled packaging.
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => router.push('/')}
                  className="px-5 py-3 rounded-xl border border-cream-300 text-forest-600 hover:border-forest-300 font-body text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-eco flex-1 py-3 bg-forest-700 hover:bg-forest-600 text-white rounded-xl font-body font-semibold text-sm transition-all shadow-md shadow-forest-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Payment</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-2 animate-fade-up stagger-2" style={{ opacity: 0 }}>
            <div className="sticky top-24">
              <OrderSummaryPanel />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
