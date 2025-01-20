'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // You can verify the payment here if needed
    if (sessionId) {
      console.log('Payment successful, session ID:', sessionId)
    }
  }, [sessionId])

  return (
    <div className="success-container">
      <h1>Thank you for your order!</h1>
      <p>We'll send you a confirmation email shortly.</p>
    </div>
  )
} 