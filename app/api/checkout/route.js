import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { boxes } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      line_items: boxes.map(box => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Macaron Box',
            description: `${box.macarons.length} Macarons: ${box.macarons.map(m => m.name).join(', ')}`,
          },
          unit_amount: Math.round(box.macarons.reduce((sum, m) => sum + m.price, 0) * 100),
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 