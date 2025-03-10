'use client'

import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { flavorDetails } from './flavorDetails'

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
    width: '30%',
    backgroundColor: '#f5f5f5',
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      width: '100%',
      position: 'fixed',
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
  const [cartHeight, setCartHeight] = useState(27) // Initial height in vh
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(27)
  const cartRef = useRef(null)
  
  const scrollableRef = useRef(null)  // Reference for the scrollable div

  // Add new state for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          padding-bottom: 30vh !important; /* Reduced from 45vh to 35vh */
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
          position: fixed !important;  /* Changed from sticky to fixed */
          bottom: 0 !important;
          top: auto !important;
          z-index: 1000 !important;
          box-shadow: 0 -4px 6px rgba(0,0,0,0.1) !important;
          transition: height 0.3s ease-out !important;
        }
        
        /* Prevent body scroll when cart is expanded */
        body.cart-expanded {
          overflow: hidden;
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
        
        /* Prevent pull-to-refresh but allow scrolling */
        html, body {
          overscroll-behavior-y: none;
          position: relative; /* Changed from fixed */
          width: 100%;
          height: auto; /* Changed from 100% */
        }
        
        /* Products container styles */
        .products-container {
          width: 100% !important;
          height: auto !important;
          position: relative !important;
          z-index: 1;
        }
        
        /* Cart container styles */
        .cart-container {
          position: fixed !important;
          bottom: 0 !important;
          width: 100% !important;
          z-index: 1000 !important;
          touch-action: pan-y !important;
          -webkit-overflow-scrolling: touch !important;
        }
        
        /* Cart drag handle styles */
        .cart-header {
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        .drag-handle {
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
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

  // Add touch event handlers
  const handleTouchStart = useCallback((e) => {
    if (windowWidth > 768) return // Only enable on mobile
    // Prevent default only if touching the drag handle or cart header
    if (e.target.closest('.drag-handle') || e.target.closest('.cart-header')) {
      e.preventDefault();
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setStartHeight(cartHeight);
    }
  }, [windowWidth, cartHeight]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const deltaY = startY - e.touches[0].clientY;
    // Increase sensitivity by multiplying deltaY by 2 for faster response
    const newHeight = startHeight + (deltaY / window.innerHeight * 100 * 2); 
    // Change max height to 95vh
    setCartHeight(Math.min(Math.max(27, newHeight), 85));
  }, [isDragging, startY, startHeight]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // Snap to either expanded (95vh) or collapsed (36vh) state
    setCartHeight(cartHeight > 55 ? 85 : 27);
  }, [cartHeight]);

  // Add event listeners
  useEffect(() => {
    const cart = cartRef.current
    if (!cart) return

    cart.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      cart.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  // Update the handleCartExpansion effect
  useEffect(() => {
    // Only run on client-side and mobile
    if (typeof window === 'undefined' || windowWidth > 768) return;

    const productsContainer = document.querySelector('.products-container');
    
    const handleCartExpansion = () => {
      if (cartHeight > 27) {
        if (productsContainer) {
          productsContainer.style.position = 'relative';
          productsContainer.style.width = '100%';
          productsContainer.style.height = 'auto';
          productsContainer.style.paddingBottom = `${cartHeight + 10}vh`; // Added extra padding
        }
      } else {
        if (productsContainer) {
          productsContainer.style.position = '';
          productsContainer.style.width = '';
          productsContainer.style.height = '';
          productsContainer.style.paddingBottom = '35vh'; // Updated default padding
        }
      }
    };

    handleCartExpansion();

    return () => {
      if (productsContainer) {
        productsContainer.style.position = '';
        productsContainer.style.width = '';
        productsContainer.style.height = '';
        productsContainer.style.paddingBottom = '35vh'; // Updated cleanup padding
      }
    };
  }, [cartHeight, windowWidth]);

  // Don't render content until we know the window width
  if (isLoading) {
    return null // or a loading spinner if you prefer
  }

  const macarons = [
    { 
      id: 1, 
      name: 'Cheesecake', 
      price: 3.75, 
      images: [
        '/kambia-product-photos/cheesecake/cheesecake1.jpeg',
        '/kambia-product-photos/cheesecake/cheesecake2.jpeg',
        '/kambia-product-photos/cheesecake/cheesecake3.jpeg',
        '/kambia-product-photos/cheesecake/cheesecake4.jpeg'
      ]
    },
    { 
      id: 2, 
      name: 'Coffee', 
      price: 3.75, 
      images: [
        '/kambia-product-photos/coffee/coffee1.jpeg',
        '/kambia-product-photos/coffee/coffee2.jpeg',
        '/kambia-product-photos/coffee/coffee3.jpeg'
      ]
    },
    { 
      id: 3, 
      name: 'Chocolate Strawberry', 
      price: 3.75, 
      images: [
        '/kambia-product-photos/chocolate-strawberry/chocolate-strawberry1.jpeg',
        '/kambia-product-photos/chocolate-strawberry/chocolate-strawberry2.jpeg',
        '/kambia-product-photos/chocolate-strawberry/chocolate-strawberry3.jpeg',
        '/kambia-product-photos/chocolate-strawberry/chocolate-strawberry4.jpeg'
      ]
    },
    { 
      id: 4, 
      name: 'Double Chocolate', 
      price: 3.75, 
      images: [
        '/kambia-product-photos/double-chocolate/double-chocolate1.jpeg',
        '/kambia-product-photos/double-chocolate/double-chocolate2.jpeg'
      ]
    },
    { 
      id: 5, 
      name: 'Matcha Strawberry', 
      price: 3.75, 
      images: [
        '/kambia-product-photos/matcha-strawberry/matcha-strawberry1.jpeg',
        '/kambia-product-photos/matcha-strawberry/matcha-strawberry2.jpeg',
        '/kambia-product-photos/matcha-strawberry/matcha-strawberry3.jpeg'
      ]
    },
    { 
      id: 6, 
      name: 'S\'mores', 
      price: 3.75, 
      images: [
        '/kambia-product-photos/smores/smores1.jpeg',
        '/kambia-product-photos/smores/smores2.jpeg',
        '/kambia-product-photos/smores/smores3.jpeg'
      ]
    }
    // { 
    //   id: 7, 
    //   name: "Lemon", 
    //   price: 3.75, 
    //   images: [
    //     '/kambia-product-photos/lemon/lemon1.jpeg',
    //     '/kambia-product-photos/lemon/lemon2.jpeg'      ]
    // },
    // { 
    //   id: 8, 
    //   name: "Apple Pie", 
    //   price: 3.75, 
    //   images: [
    //     '/kambia-product-photos/apple-pie/apple-pie1.jpeg',
    //     '/kambia-product-photos/apple-pie/apple-pie2.jpeg'
    //   ]
    // },
    // { 
    //   id: 9, 
    //   name: "Pumpkin Spice", 
    //   price: 3.75, 
    //   images: [
    //     '/kambia-product-photos/pumpkin-spice/pumpkin-spice1.jpeg',
    //     '/kambia-product-photos/pumpkin-spice/pumpkin-spice2.jpeg'
    //   ]
    // },
    // { 
    //   id: 10, 
    //   name: "Coconut", 
    //   price: 3.75, 
    //   images: [
    //     '/kambia-product-photos/coconut/coconut1.jpeg',
    //     '/kambia-product-photos/coconut/coconut2.jpeg',
    //     '/kambia-product-photos/coconut/coconut3.jpeg'
    //   ]
    // }
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

  // Add function to handle image navigation
  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedFlavor) {
      setCurrentImageIndex((prev) => 
        prev === selectedFlavor.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedFlavor) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedFlavor.images.length - 1 : prev - 1
      );
    }
  };

  // Reset image index when modal closes
  const handleCloseModal = () => {
    setSelectedFlavor(null);
    setCurrentImageIndex(0);
  };

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
                    src={macaron.images[0]}
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
      <div 
        ref={cartRef}
        className="cart-container" 
        style={{
          ...styles.cartContainer,
          height: windowWidth <= 768 ? `${cartHeight}vh` : '100vh',
          transition: windowWidth <= 768 && isDragging ? 'none' : 'height 0.3s ease-out',
          overflowY: windowWidth <= 768 && cartHeight > 36 ? 'auto' : 'hidden',
          backgroundColor: '#f5f5f5',
          touchAction: windowWidth <= 768 ? 'none' : 'auto' // Prevent default touch behavior
        }}
      >
        {/* Only show drag handle on mobile */}
        {windowWidth <= 768 && (
          <div className="cart-header">
            <div
              className="drag-handle"
              style={{
                width: '50px',
                height: '4px',
                backgroundColor: '#ddd',
                borderRadius: '2px',
                margin: '8px auto',
                cursor: 'grab'
              }}
            />
          </div>
        )}
        
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
          zIndex: 1000,
          padding: '1rem' // Add padding to ensure modal doesn't touch screen edges on mobile
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.7rem',
            borderRadius: '8px',
            width: '90%',
            position: 'relative',
            maxWidth: '400px',      // Same max-width for all devices
            maxHeight: '600px',     // Fixed max-height for all devices
            height: '90%',          // Take up 90% of available height
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto'          // Center in available space
          }}>
            <button 
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                border: 'none',
                background: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                zIndex: 2,
                color: '#666'
              }}
            >
              ×
            </button>
            
            {/* Image container - keep this fixed */}
            <div style={{ 
              position: 'relative', 
              paddingTop: '60%',
              marginTop: '1rem',
              marginBottom: '1rem',
              width: '100%',
              maxWidth: '450px',
              flexShrink: 0  // Prevent image from shrinking
            }}>
              <Image
                src={selectedFlavor.images[currentImageIndex]}
                alt={selectedFlavor.name}
                fill
                style={{ 
                  objectFit: 'cover', 
                  borderRadius: '4px',
                  objectPosition: 'center center'
                }}
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  zIndex: 1,
                  color: '#666'
                }}
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  zIndex: 1,
                  color: '#666'
                }}
              >
                ›
              </button>
              
              {/* Image counter */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}>
                {currentImageIndex + 1}/{selectedFlavor.images.length}
              </div>
            </div>
            
            {/* Scrollable content container */}
            <div style={{
              overflowY: 'auto',
              flex: 1,
              paddingRight: '10px'  // Add space for scrollbar
            }}>
              <h3 className={cinzel.className} style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                {selectedFlavor.name}
              </h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {flavorDetails[selectedFlavor.name]?.description}
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 className={cinzel.className} style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Ingredients
                </h4>
                <p style={{ color: '#666' }}>
                  {flavorDetails[selectedFlavor.name]?.ingredients.join(', ')}
                </p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 className={cinzel.className} style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Allergens
                </h4>
                <p style={{ color: '#B22222' }}>
                  Contains: {flavorDetails[selectedFlavor.name]?.allergens.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

