'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe if you need to verify the session
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// Create a separate component for the content that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // You can verify the payment here if needed
    if (sessionId) {
      console.log('Payment successful, session ID:', sessionId)
    }
  }, [sessionId])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>Thank you for your order!</h1>
      <p>We'll send you a confirmation email shortly.</p>
    </div>
  )
}

// Main component wrapped with Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
} 