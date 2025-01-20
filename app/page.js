'use client'
import Link from 'next/link'
import { Cinzel, Montserrat } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400']
})
const montserrat = Montserrat({ subsets: ['latin'] })

export default function HomePage() {
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
      top:0,
      left:0,
      background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/images/macarons-background.JPG")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div style={{
        position: 'absolute',
        top: '-4.1em',
        left: '48px',
        padding: '20px',
      }}>
        <h1 style={{
          fontSize: '110px',
          color: 'white',
          marginBottom: '-0.38em',
          fontWeight: '200',
          letterSpacing: '0.06em',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }} className={cinzel.className}>
          KAMBIA
        </h1>
        <p style={{
          fontSize: '23px',
          color: '#fffde8',
          marginLeft: '0.5em',
          marginBottom: '2.5em',
          letterSpacing: '0.09em',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }} className={montserrat.className}>
          Crafting moments of delight! 𓌉◯𓇋
        </p>
        <div style={{
          position: 'relative',
          top: '2.8em',
          left: '4.3em',
        }}>
          <Link 
            href="/products"
            style={{
              padding: '16px 48px',
              border: '1px solid white',
              borderRadius: '9999px',
              color: 'white',
              fontSize: '24px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              textDecoration: 'underline',
              textDecorationColor: '#962a24',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
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