'use client'

import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700']
})

export default function ProductsPage() {
  const [selectedFlavor, setSelectedFlavor] = useState(null)
  
  const macarons = [
    { id: 1, name: 'Matcha Strawberry', price: 3.75, image: '/kambia-product-photos/matcha-strawberry/matcha-strawberry1.jpeg' },
    { id: 2, name: 'Lemon', price: 3.75, image: '/kambia-product-photos/lemon/lemon1.jpeg' },
    { id: 3, name: 'Pumpkin Spice', price: 3.75, image: '/kambia-product-photos/pumpkin-spice/pumpkin-spice1.jpeg' },
    { id: 4, name: 'Apple Pie', price: 3.75, image: '/kambia-product-photos/apple-pie/apple-pie1.jpeg' },
    { id: 5, name: "S'mores", price: 3.75, image: '/kambia-product-photos/smores/smores1.jpeg' },
    { id: 6, name: 'Coconut', price: 3.75, image: '/kambia-product-photos/coconut/coconut1.jpeg' },
  ]

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      margin: 0,
      position: 'fixed',
      top: 0
    }}>
      {/* Scrollable left container */}
      <div style={{
        width: '75%',
        padding: '0.5rem',
        backgroundColor: 'white',
        overflowY: 'auto',
        height: '100vh'
      }}>
        <div style={{ 
          width: '100%',
          paddingTop: '1.3rem',
          paddingLeft: '4rem',
        }}>
          <h1 className={cinzel.className} style={{ 
            fontSize: '2.5rem'
          }}>
            Our Flavors
          </h1>
        </div>

        {/* Flavor Grid with Flexbox */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.25rem',
          marginLeft: '4rem',
          padding: '1rem'
        }}>
          {macarons.map((macaron) => (
            <div 
              key={macaron.id}
              onClick={() => setSelectedFlavor(macaron)}
              style={{
                width: 'calc(33.333% - 0.25rem)',
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                backgroundColor: 'white',
                transform: 'scale(0.84)',
                transformOrigin: 'top left',
                margin: '-1rem'
              }}
            >
              <div style={{ position: 'relative', paddingTop: '100%' }}>
                <Image
                  src={macaron.image}
                  alt={macaron.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ paddingTop: '0.5rem', paddingInlineStart: '1rem' }}>
                <h3 className={cinzel.className} style={{ 
                  fontSize: '1.5rem'
                }}>
                  {macaron.name}
                </h3>
                <p style={{ 
                  color: '#666',
                  fontSize: '1.3rem'
                }}>
                  ${macaron.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed right container */}
      <div style={{
        width: '25%',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        textAlign: 'center'
      }}>
        <h2 className={cinzel.className} style={{ 
          fontSize: '2rem',
          textAlign: 'center'
        }}>
          Customize
        </h2>
      </div>

      {/* Flavor Modal */}
      {selectedFlavor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedFlavor(null)}
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
            <h3 className={cinzel.className} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              {selectedFlavor.name}
            </h3>
            {/* We'll get this data from a separate file */}
            <p>Description and ingredients will go here</p>
          </div>
        </div>
      )}
    </div>
  )
}

