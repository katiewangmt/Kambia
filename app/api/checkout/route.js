import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Correct way to initialize Stripe on server side
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { boxes } = body;

    // Create line items from boxes
    const lineItems = boxes.flatMap(box => {
      if (box.macarons.length === 0) return [];
      
      // Create description with flavor list
      const flavorsList = box.macarons.map(macaron => macaron.name).join(', ');
      
      return [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Macaron Box ${box.id}`,
            description: `Flavors: ${flavorsList}`, // List all flavors in the description
          },
          unit_amount: box.macarons.reduce((sum, macaron) => sum + macaron.price * 100, 0), // Convert to cents
        },
        quantity: 1,
      }];
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?payment_success=true`,
      cancel_url: `${req.headers.get('origin')}/products`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
} 