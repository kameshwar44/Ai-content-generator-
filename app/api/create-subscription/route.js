
// pages/api/create-subscription.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use the secret key on the server-side
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  try {
    const { priceId } = await req.json(); // Extract the priceId from the request body

    // Create a Stripe Checkout session for a subscription
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1, // Always 1 for a subscription
        },
      ],
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/canceled`,
    });

    // Return the session ID to the frontend
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Error creating subscription' }, { status: 500 });
  }
}
