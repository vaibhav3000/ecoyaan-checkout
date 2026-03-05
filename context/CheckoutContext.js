'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const CheckoutContext = createContext(null)

const initialAddress = {
  fullName: '',
  email: '',
  phone: '',
  pinCode: '',
  city: '',
  state: '',
}

export function CheckoutProvider({ children, initialCartData }) {
  const [cartData, setCartData] = useState(initialCartData)
  const [address, setAddress] = useState(initialAddress)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const updateAddress = useCallback((field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }))
  }, [])

  const updateQuantity = useCallback((productId, delta) => {
    setCartData(prev => ({
      ...prev,
      cartItems: prev.cartItems
        .map(item =>
          item.product_id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0),
    }))
  }, [])

  const removeItem = useCallback((productId) => {
    setCartData(prev => ({
      ...prev,
      cartItems: prev.cartItems.filter(item => item.product_id !== productId),
    }))
  }, [])

  const placeOrder = useCallback(() => {
    const id = 'ECO' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(id)
    setOrderPlaced(true)
    return id
  }, [])

  const subtotal = cartData?.cartItems?.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  ) ?? 0

  const shippingFee = cartData?.shipping_fee ?? 0
  const discount = cartData?.discount_applied ?? 0
  const grandTotal = subtotal + shippingFee - discount

  return (
    <CheckoutContext.Provider
      value={{
        cartData,
        cartItems: cartData?.cartItems ?? [],
        address,
        updateAddress,
        updateQuantity,
        removeItem,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
        orderPlaced,
        orderId,
        subtotal,
        shippingFee,
        discount,
        grandTotal,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider')
  return ctx
}
