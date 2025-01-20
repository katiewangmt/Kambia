'use client'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ boxes }) {
  const handleCheckout = async () => {
    try {
      // Call the checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boxes: boxes.filter(box => box.macarons.length > 0)
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        // Redirect to Stripe checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error('Stripe redirect error:', error);
          alert('Failed to redirect to checkout. Please try again.');
        }
      } else {
        throw new Error('No session ID received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={!boxes || boxes.length === 0}
      className="checkout-button"
    >
      Checkout
    </button>
  );
} 