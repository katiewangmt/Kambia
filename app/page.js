'use client'
import Link from 'next/link'
import { Cinzel, Montserrat } from 'next/font/google'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400']
})
const montserrat = Montserrat({ subsets: ['latin'] })

function HomeContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsVisible(true)
    // Show modal if payment_success is in URL
    if (searchParams.get('payment_success')) {
      setShowModal(true)
      // Clean up URL
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/images/macarons-background.JPG")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }}>
      <div style={{
        padding: '20px',
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'left',
        position: 'relative',
        marginTop: 'clamp(20px, 5vh, 40px)',
        marginLeft: 'clamp(20px, 5vw, 60px)',
      }}>
        <h1 style={{
          fontSize: 'clamp(48px, 10vw, 110px)',
          color: 'white',
          fontWeight: '200',
          letterSpacing: '0.06em',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          margin: '0',
          marginBottom: '0.1em',
        }} className={cinzel.className}>
          KAMBIA
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 3vw, 23px)',
          color: '#fffde8',
          letterSpacing: '0.09em',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          margin: '0',
          marginBottom: '2em',
        }} className={montserrat.className}>
          Crafting moments of delight! 𓌉◯𓇋
        </p>
        <div style={{
          margin: '0',
          marginTop: '0.5em',
        }}>
          <Link 
            href="/products"
            style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 48px)',
              border: '1px solid white',
              borderRadius: '9999px',
              color: 'white',
              fontSize: 'clamp(16px, 3vw, 24px)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              textDecoration: 'underline',
              textDecorationColor: '#962a24',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              display: 'inline-block',
            }}
            className={montserrat.className}
          >
            View Flavors
          </Link>
        </div>
      </div>

      {/* Success Modal Popup */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            position: 'relative',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                border: 'none',
                background: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            <h2 className={cinzel.className} style={{
              color: '#333',
              marginBottom: '1rem',
              fontSize: '1.8rem'
            }}>
              Thank you for your order!
            </h2>
            <p className={montserrat.className} style={{
              color: '#666',
              marginBottom: '1rem'
            }}>
              We'll send you a confirmation email shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
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
      <HomeContent />
    </Suspense>
  )
} 