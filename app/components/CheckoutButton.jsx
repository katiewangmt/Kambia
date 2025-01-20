'use client'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ boxes }) {
  const handleCheckout = async () => {
    try {
      // Only send boxes that have macarons
      const filledBoxes = boxes.filter(box => box.macarons.length > 0);
      
      if (filledBoxes.length === 0) {
        alert('Please add items to your cart before checking out.');
        return;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boxes: filledBoxes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('No session ID received');
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!boxes || boxes.every(box => box.macarons.length === 0)}
      style={{
        backgroundColor: '#736f8a',
        color: 'white',
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        width: '80%'
      }}
    >
      Checkout
    </button>
  );
} 