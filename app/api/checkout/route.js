import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { boxes } = body;

    // Create line items from boxes
    const lineItems = boxes.flatMap(box => {
      if (box.macarons.length === 0) return [];
      return [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Macaron Box ${box.id}`,
            description: `Box of ${box.macarons.length} macarons`,
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
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/products`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
} 