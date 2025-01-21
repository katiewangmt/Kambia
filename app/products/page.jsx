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

// Add these CSS styles at the top of your file, after the imports
const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    margin: 0,
    position: 'fixed',
    top: 0,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      position: 'relative',
      height: 'auto',
      overflowX: 'hidden',
      width: '80vw',
      maxWidth: '90%'
    }
  },
  leftContainer: {
    width: '75%',
    padding: 0,  // Removed padding
    margin: 0,   // Removed margin
    backgroundColor: 'white',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100vh',
    '@media (max-width: 768px)': {
      width: '100vw',
      maxWidth: '100%',
      height: 'auto'
    }
  },
  titleContainer: {
    width: '100%',
    margin: 0,    // Removed margin
    padding: 0,   // Removed padding
    '@media (max-width: 768px)': {
      width: '100vw',
      maxWidth: '100%',
      textAlign: 'center'
    }
  },
  flavorGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem',
    marginLeft: '4rem',
    padding: '1rem',
    '@media (max-width: 768px)': {
      marginLeft: 0,
      gap: '1rem',
      flexDirection: 'column'
    }
  },
  flavorCard: {
    width: 'calc(33.333% - 0.25rem)',
    cursor: 'pointer',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    backgroundColor: 'white',
    transform: 'scale(0.84)',
    transformOrigin: 'top left',
    margin: '-1rem',
    '@media (max-width: 768px)': {
      width: 'calc(50% - 0.5rem)',
      transform: 'none',
      margin: 0
    }
  },
  cartContainer: {
    width: '26%',
    backgroundColor: '#f5f5f5',
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      width: '100%',
      height: '30vh',
      position: 'sticky',  // Changed from 'fixed' to 'sticky'
      bottom: 0,
      top: 'auto',
      zIndex: 1000,
      boxShadow: '0 -4px 6px rgba(0,0,0,0.1)'
    }
  },
  cartTitle: {
    fontSize: '2.8rem',
    padding: '1rem',
    marginTop: '3rem',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
      marginTop: '0.5rem',
      padding: '0.5rem'
    }
  }
};

export default function ProductsPage() {
  const [selectedFlavor, setSelectedFlavor] = useState(null)
  const [boxes, setBoxes] = useState([{
    id: 1,
    macarons: []
  }])  // Start with one empty box
  const [isAdding, setIsAdding] = useState(false)  // New state to track additions
  const [windowWidth, setWindowWidth] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const scrollableRef = useRef(null)  // Reference for the scrollable div

  // Only scroll on additions
  useEffect(() => {
    if (isAdding && scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
      setIsAdding(false);  // Reset the flag
    }
  }, [boxes, isAdding])

  // Then update your JSX to include these classes
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (max-width: 768px) {
        body {
          margin: 0;
          padding: 0;
        }
        
        /* Container styles */
        .responsive-container {
          flex-direction: column !important;
          position: relative !important;
          height: auto !important;
        }
        
        /* Left container styles */
        .products-container {
          width: 100% !important;
          height: auto !important;
          padding-bottom: 4.2vh !important;
        }
        
        /* Flavor grid styles */
        .flavor-grid {
          margin-left: 1rem !important;
          gap: 1rem !important;
        }
        
        /* Flavor card styles */
        .flavor-card {
          width: calc(50% - 0.5rem) !important;
          transform: none !important;
          margin: 0 !important;
        }
        
        /* Cart container styles */
        .cart-container {
          width: 100% !important;
          height: 36vh !important;  /* Changed from 20vh to 25vh (1/4 of screen) */
          position: sticky !important;
          bottom: 0 !important;
          top: auto !important;
          z-index: 1000 !important;
          box-shadow: 0 -4px 6px rgba(0,0,0,0.1) !important;
        }
        
        /* Cart title styles */
        .cart-title {
          font-size: 1.4rem !important;  /* Made slightly smaller */
          padding: 0.2rem !important;    /* Reduced padding */
          margin-top: 0.1rem !important; /* Reduced margin */
        }
        .cart-content {
          padding: 0.2rem !important;
          max-height: calc(25vh - 35px) !important;  /* Adjusted for new height */
        }
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    // Set the initial width
    setWindowWidth(window.innerWidth)
    setIsLoading(false)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Don't render content until we know the window width
  if (isLoading) {
    return null // or a loading spinner if you prefer
  }

  const macarons = [
    { id: 1, name: 'Cheesecake', price: 3.75, image: '/kambia-product-photos/cheesecake/cheesecake1.jpeg' },
    { id: 2, name: 'Coffee', price: 3.75, image: '/kambia-product-photos/coffee/coffee1.jpeg' },
    { id: 3, name: 'Chocolate Strawberry', price: 3.75, image: '/kambia-product-photos/chocolate-strawberry/chocolate-strawberry1.jpeg' },
    { id: 4, name: 'Double Chocolate', price: 3.75, image: '/kambia-product-photos/double-chocolate/double-chocolate1.jpeg' },
    { id: 5, name: 'Matcha Strawberry', price: 3.75, image: '/kambia-product-photos/matcha-strawberry/matcha-strawberry1.jpeg' },
    { id: 6, name: 'Lemon', price: 3.75, image: '/kambia-product-photos/lemon/lemon1.jpeg' },
    { id: 7, name: 'Pumpkin Spice', price: 3.75, image: '/kambia-product-photos/pumpkin-spice/pumpkin-spice1.jpeg' },
    { id: 8, name: 'Apple Pie', price: 3.75, image: '/kambia-product-photos/apple-pie/apple-pie1.jpeg' },
    { id: 9, name: "S'mores", price: 3.75, image: '/kambia-product-photos/smores/smores1.jpeg' },
    { id: 10, name: 'Coconut', price: 3.75, image: '/kambia-product-photos/coconut/coconut1.jpeg' },
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
      
      // Get Stripe.js instance
      const stripe = await stripePromise
      console.log('Stripe loaded')

      // Call your backend to create the Checkout Session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boxes: boxes.filter(box => box.macarons.length > 0)
        }),
      })

      console.log('API Response:', response)
      const data = await response.json()
      console.log('Session Data:', data)

      if (data.sessionId) {
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })

        if (result.error) {
          alert(result.error.message)
        }
      } else {
        console.error('No session ID received')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to initiate checkout. Please try again.')
    }
  }

  return (
    <div className="responsive-container" style={styles.container}>
      <div className="products-container" style={styles.leftContainer}>
        <div style={{ 
          width: '100%',
          paddingTop: windowWidth <= 768 ? '0.5rem' : '1.3rem',
          paddingLeft: windowWidth <= 768 ? '0rem' : '3rem',
          textAlign: windowWidth <= 768 ? 'center' : 'left'
        }}>
          <h1 className={cinzel.className} style={{ 
            fontSize: '3.3rem'
          }}>
            Our Flavors
          </h1>
          <p style={{
            color: '#B22222',
            fontSize: '0.85rem',
            paddingBottom: windowWidth <= 768 ? '1.2rem' : '2rem',
            marginTop: '-1.5rem'
          }}>
            * Allergy Warning: Nuts, Eggs, Dairy
          </p>
        </div>

        {/* Wrapper div for centering */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          {/* Flavor Grid with Flexbox */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1rem',
            maxWidth: '1400px',
            paddingLeft: windowWidth <= 768 ? '1rem' : '4rem',
            paddingRight: windowWidth <= 768 ? '1rem' : '4rem',
            justifyContent: 'flex-start'
          }}>
            {macarons.map((macaron) => (
              <div 
                key={macaron.id}
                className="flavor-card"
                onClick={() => setSelectedFlavor(macaron)}
                style={styles.flavorCard}
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
                  <h2 className={cinzel.className} style={{ 
                    fontSize: windowWidth <= 768 ? '1.3rem' : '1.75rem',  // Smaller on mobile
                    marginBottom: '0.25rem'
                  }}>
                    {macaron.name}
                  </h2>
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
      </div>

      {/* Right container with cart */}
      <div className="cart-container" style={styles.cartContainer}>
        <h1 className={cinzel.className} style={{ 
          fontSize: windowWidth <= 768 ? '1.5rem' : '2.9rem',
          padding: '1rem',
          marginTop: windowWidth <= 768 ? '0rem' : '3rem',
          paddingBottom: windowWidth <= 768 ? '2rem' : '1rem',
          textAlign: 'center'
        }}>
          Your Cart
        </h1>

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

