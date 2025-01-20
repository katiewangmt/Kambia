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

    const lineItems = boxes.map(box => {
      if (box.macarons.length === 0) return null;

      const totalPrice = box.macarons.reduce((sum, macaron) => sum + macaron.price * 100, 0);
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Macaron Box`,
          },
          unit_amount: totalPrice,
        },
        quantity: 1,
      };
    }).filter(Boolean);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 