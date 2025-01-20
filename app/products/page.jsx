'use client'

import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

// Correct way to initialize Stripe on client side
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const cinzel = Cinzel({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700']
})

export default function ProductsPage() {
  const [selectedFlavor, setSelectedFlavor] = useState(null)
  const [boxes, setBoxes] = useState([{
    id: 1,
    macarons: []
  }])  // Start with one empty box
  const [isAdding, setIsAdding] = useState(false)  // New state to track additions
  
  const scrollableRef = useRef(null)  // Reference for the scrollable div

  // Only scroll on additions
  useEffect(() => {
    if (isAdding && scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
      setIsAdding(false);  // Reset the flag
    }
  }, [boxes, isAdding])

  const macarons = [
    { id: 1, name: 'Matcha Strawberry', price: 3.75, image: '/kambia-product-photos/matcha-strawberry/matcha-strawberry1.jpeg' },
    { id: 2, name: 'Lemon', price: 3.75, image: '/kambia-product-photos/lemon/lemon1.jpeg' },
    { id: 3, name: 'Pumpkin Spice', price: 3.75, image: '/kambia-product-photos/pumpkin-spice/pumpkin-spice1.jpeg' },
    { id: 4, name: 'Apple Pie', price: 3.75, image: '/kambia-product-photos/apple-pie/apple-pie1.jpeg' },
    { id: 5, name: "S'mores", price: 3.75, image: '/kambia-product-photos/smores/smores1.jpeg' },
    { id: 6, name: 'Coconut', price: 3.75, image: '/kambia-product-photos/coconut/coconut1.jpeg' },
  ]

  const addToCart = (macaron, e) => {
    e.stopPropagation();
    const currentBox = boxes[boxes.length - 1];
    
    if (currentBox.macarons.length < 4) {
      setIsAdding(true);  // Set flag before updating boxes
      const updatedBoxes = boxes.map((box, index) => {
        if (index === boxes.length - 1) {
          return { ...box, macarons: [...box.macarons, macaron] };
        }
        return box;
      });
      setBoxes(updatedBoxes);
    }
  }

  const addNewBox = () => {
    setIsAdding(true);  // Set flag before adding new box
    setBoxes([...boxes, {
      id: boxes.length + 1,
      macarons: []
    }]);
  }

  const calculateBoxTotal = (macarons) => {
    return macarons.reduce((sum, macaron) => sum + macaron.price, 0).toFixed(2);
  }

  const deleteBox = (boxId) => {
    const updatedBoxes = boxes.filter(box => box.id !== boxId);
    
    if (updatedBoxes.length === 0) {
      setBoxes([{
        id: 1,
        macarons: []
      }]);
    } else {
      // Renumber the remaining boxes sequentially
      const reorderedBoxes = updatedBoxes.map((box, index) => ({
        ...box,
        id: index + 1
      }));
      setBoxes(reorderedBoxes);
    }
  }

  const isCheckoutEnabled = () => {
    // Check if all boxes except the last one are full (4 macarons)
    // and if there's at least one box with macarons
    return boxes.every((box, index) => {
      if (index === boxes.length - 1) {
        // Last box should either be full or empty
        return box.macarons.length === 0 || box.macarons.length === 4;
      }
      // All other boxes must be full
      return box.macarons.length === 4;
    }) && boxes.some(box => box.macarons.length === 4);
  }

  const handleCheckout = async () => {
    try {
      console.log('Starting checkout...')
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boxes: boxes.filter(box => box.macarons.length > 0)
        }),
      })

      const data = await response.json()
      
      if (data.sessionId) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        
        if (result.error) {
          console.error('Stripe redirect error:', result.error);
          alert('Failed to initiate checkout. Please try again.');
        }
      } else {
        console.error('No session ID received');
        alert('Failed to initiate checkout. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  }

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
        overflowX: 'hidden',
        height: '100vh'
      }}>
        <div style={{ 
          width: '100%',
          paddingTop: '1.3rem',
          paddingLeft: '4rem',
        }}>
          <h1 className={cinzel.className} style={{ 
            fontSize: '3.3rem'
          }}>
            Our Flavors
          </h1>
          <p style={{
            color: '#B22222',
            fontSize: '0.85rem',
            paddingBottom: '1.2rem',
            marginTop: '-1.5rem'
          }}>
            * Allergy Warning: Nuts, Eggs, Dairy
          </p>
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
              <div style={{ padding: '1rem', position: 'relative' }}>
                <h3 className={cinzel.className} style={{ 
                  fontSize: '1.75rem',
                  marginBottom: '0.25rem'
                }}>
                  {macaron.name}
                </h3>
                <p style={{ 
                  color: '#666',
                  fontSize: '1.5rem'
                }}>
                  ${macaron.price.toFixed(2)}
                </p>
                <button
                  className={cinzel.className}
                  style={{
                    position: 'absolute',
                    bottom: '2.1rem',
                    right: '1.2rem',
                    backgroundColor: '#fbf5ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                  }}
                  onClick={(e) => addToCart(macaron, e)}
                >
                  🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right container with cart */}
      <div style={{
        width: '25%',
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 className={cinzel.className} style={{ 
          fontSize: '2.8rem',
          padding: '1rem',
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          Your Cart
        </h2>

        <div 
          ref={scrollableRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            marginTop: '-2.5rem',
            marginBottom: '80px'
          }}
        >
          {boxes.map((box, boxIndex) => (
            <div key={box.id} style={{
              backgroundColor: 'white',
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'  // Space between title and X
                }}>
                  <button
                    onClick={() => deleteBox(box.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ff0000',
                      cursor: 'pointer',
                      fontSize: '1.4rem',
                      padding: '0 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                  <h3 className={cinzel.className} style={{
                    fontSize: '1.2rem'
                  }}>
                    Box {box.id} ({box.macarons.length}/4)
                  </h3>
                </div>
                <p className={cinzel.className} style={{
                  color: '#666',
                  fontSize: '1.2rem'
                }}>
                  ${calculateBoxTotal(box.macarons)}
                </p>
              </div>
              
              {box.macarons.map((item, itemIndex) => (
                <div key={itemIndex} style={{
                  padding: '0.25rem',
                  paddingLeft: '2.2rem',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <p className={cinzel.className}>{item.name}</p>
                </div>
              ))}
              
              {boxIndex === boxes.length - 1 && box.macarons.length === 4 && (
                <button 
                  className={cinzel.className}
                  onClick={addNewBox}
                  style={{
                    width: '50%',
                    padding: '0.5rem',
                    marginTop: '1rem',
                    backgroundColor: '#736f8a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block'
                  }}
                >
                  Add New Box
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Checkout button */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button 
            className={cinzel.className}
            style={{
              width: '80%',
              padding: '1rem',
              backgroundColor: isCheckoutEnabled() ? '#736f8a' : '#cccccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isCheckoutEnabled() ? 'pointer' : 'not-allowed',
              fontSize: '1.1rem'
            }}
            onClick={handleCheckout}
            disabled={!isCheckoutEnabled()}
          >
            {isCheckoutEnabled() ? 'Checkout' : 'Complete Boxes to Checkout'}
          </button>
        </div>
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

