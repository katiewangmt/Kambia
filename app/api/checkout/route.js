import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Correct way to initialize Stripe on server side
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export async function POST(req) {
  try {
    // Get the items from the request
    const body = await req.json();
    const { boxes } = body;

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Macaron Box',
            description: '4 Macarons per Box',
          },
          unit_amount: 1500, // $15.00
        },
        quantity: boxes.length, // Number of boxes
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    });

    // Return the session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 