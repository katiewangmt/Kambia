'use client'
import Link from 'next/link'
import { Cinzel, Montserrat } from 'next/font/google'
import { useState, useEffect } from 'react'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400']
})
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
          transition: 'opacity 2s ease-in-out'
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
          transition: 'opacity 2s ease-in-out'
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
              transition: 'opacity 2s ease-in-out'
            }}
            className={montserrat.className}
          >
            View Flavors
          </Link>
        </div>
      </div>
    </div>
  )
} 