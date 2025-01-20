'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // You can verify the payment here if needed
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