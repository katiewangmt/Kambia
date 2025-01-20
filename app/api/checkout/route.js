import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
  }

  try {
    const { boxes } = await req.json();
    
    // Create line items from boxes
    const lineItems = boxes
      .filter(box => box.macarons.length > 0)
      .map(box => ({
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(box.macarons.reduce((sum, m) => sum + m.price, 0) * 100),
          product_data: {
            name: `Macaron Box (${box.macarons.length} pieces)`,
            description: box.macarons.map(m => m.name).join(', ')
          },
        },
      }));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/products`,
    });

    // Return the URL directly
    return NextResponse.json({ redirectUrl: session.url });

  } catch (error) {
    console.error('Stripe API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 