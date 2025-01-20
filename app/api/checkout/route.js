import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(req) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe key not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { boxes } = body;

    if (!boxes || !Array.isArray(boxes)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const lineItems = boxes.map(box => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Macaron Box (${box.macarons.length} pieces)`,
          description: box.macarons.map(m => m.name).join(', ')
        },
        unit_amount: Math.round(box.macarons.reduce((sum, m) => sum + m.price, 0) * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || ''}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || ''}/products`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 