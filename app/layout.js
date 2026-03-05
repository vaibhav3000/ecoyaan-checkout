import './globals.css'

export const metadata = {
  title: 'Ecoyaan — Sustainable Checkout',
  description: 'Complete your eco-friendly purchase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="leaf-bg min-h-screen bg-cream-50">
        {children}
      </body>
    </html>
  )
}
