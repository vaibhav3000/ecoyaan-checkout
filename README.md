# 🌿 Ecoyaan Checkout Flow

A clean, responsive, multi-step checkout flow built with **Next.js 14 App Router**, **Tailwind CSS**, and **React Context API** — designed for an eco-friendly e-commerce platform.

---

## 🚀 Live Demo

> Deploy to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ecoyaan-checkout)

---

## ✨ Features

| Feature | Details |
|---|---|
| **SSR Data Fetching** | Cart data fetched server-side via Next.js Server Components (`cache: 'no-store'` = SSR behavior) |
| **Mock API Route** | `GET /api/cart` returns mock product data with simulated latency |
| **3-Step Checkout** | Cart → Shipping → Payment → Success |
| **Form Validation** | Real-time validation for email format, 10-digit phone, 6-digit PIN, required fields |
| **State Management** | React Context API (`CheckoutContext`) — persists cart + address across all steps |
| **Responsive Design** | Mobile-first, two-column layout on desktop |
| **Quantity Controls** | Add/remove items, update quantities live |
| **Animated UI** | CSS keyframe animations for step transitions, success screen confetti |

---

## 🗂️ Project Structure

```
ecoyaan-checkout/
├── app/
│   ├── layout.js               # Root layout with global CSS
│   ├── page.js                 # Cart page — SERVER COMPONENT (SSR)
│   ├── globals.css
│   ├── api/
│   │   └── cart/
│   │       └── route.js        # Mock API endpoint
│   ├── checkout/
│   │   ├── layout.js           # SSR wrapper for checkout route
│   │   └── page.js             # Shipping address form (Client Component)
│   ├── payment/
│   │   ├── layout.js           # SSR wrapper for payment route
│   │   └── page.js             # Payment & order review (Client Component)
│   └── success/
│       └── page.js             # Order success screen (Client Component)
├── components/
│   ├── Header.js               # Sticky nav header
│   ├── StepIndicator.js        # Checkout step progress bar
│   ├── CartClient.js           # Interactive cart UI
│   └── OrderSummaryPanel.js    # Reusable order summary sidebar
├── context/
│   └── CheckoutContext.js      # Global state: cart, address, order
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🏗️ Architectural Choices

### 1. Next.js App Router + Server Components for SSR

Each page's `layout.js` is a **Server Component** that calls `fetch('/api/cart', { cache: 'no-store' })`. The `cache: 'no-store'` directive makes this equivalent to `getServerSideProps` — data is fetched fresh on every request, server-side, before the HTML is sent to the client. The fetched data is passed into the `CheckoutProvider` as `initialCartData`.

```js
// Server Component — runs on the server per request
async function getCartData() {
  const res = await fetch(`${baseUrl}/api/cart`, { cache: 'no-store' })
  return res.json()
}

export default async function CartPage() {
  const cartData = await getCartData() // SSR!
  return (
    <CheckoutProvider initialCartData={cartData}>
      <CartClient />
    </CheckoutProvider>
  )
}
```

### 2. React Context API for State

`CheckoutContext` holds:
- `cartItems` — mutable (quantity changes, removals)
- `address` — updated by the shipping form
- `paymentMethod` — selected method
- Derived values: `subtotal`, `grandTotal`, `shippingFee`

The context is initialized with SSR data and stays hydrated client-side throughout the checkout flow.

### 3. Form Validation

Validation runs on `onBlur` (field-level) and on submit (full form). Errors are tracked per-field in local state. A `touched` map prevents showing errors before the user has interacted with a field.

### 4. Separation of Client & Server

- **Server Components** (layouts, page.js wrappers): handle data fetching
- **Client Components** (`'use client'`): handle interactivity, form state, navigation

---

## 🖥️ Running Locally

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ecoyaan-checkout.git
cd ecoyaan-checkout

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

No environment variables are required for local development.

### Building for Production

```bash
npm run build
npm start
```

### Deploying to Vercel

```bash
npm install -g vercel
vercel
```

---

## 🌿 Checkout Flow

```
/ (Cart)
  └──► /checkout (Shipping Address Form)
         └──► /payment (Order Review + Payment Selection)
                └──► /success?orderId=ECO123456 (Order Confirmed!)
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | Forest Green `#2e7d52` |
| Background | Warm Cream `#fdfaf4` |
| Accent | Terracotta `#c4622d` |
| Typography | Playfair Display (headings) + DM Sans (body) |

---

## 📦 Tech Stack

- **Next.js 14** — App Router, Server Components, API Routes
- **React 18** — Client Components, Context API, Hooks
- **Tailwind CSS** — Utility-first styling
- **Google Fonts** — Playfair Display, DM Sans
