import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Correct way to initialize Stripe on server side
const stripe = new Stripe(process.env.FAKE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { boxes } = body;

    const lineItems = boxes.map(box => {
      if (box.macarons.length === 0) return null;

      // Create description of flavors for this box
      const flavorList = box.macarons.map(macaron => macaron.name).join(', ');
      const totalPrice = box.macarons.reduce((sum, macaron) => sum + macaron.price * 100, 0);

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Macaron Box ${box.id}`,
            description: `Flavors: ${flavorList}`,  // Add flavors to description
            metadata: {
              flavors: flavorList,  // Also store in metadata for reference
              boxId: box.id.toString()
            }
          },
          unit_amount: totalPrice,
        },
        quantity: 1,
      };
    }).filter(Boolean); // Remove any null items

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/products`,
      metadata: {
        totalBoxes: boxes.length.toString(),
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 