"use client";

import React from 'react';
import axios from 'axios';

function Billing() {
  // Function to handle payment when the user clicks 'Subscribe Now'
  const OnPayment = async (priceId: string) => {
    try {
      const resp = await axios.post('/api/create-subscription', { priceId });
      // Redirect to Stripe's Checkout page
      const { sessionId } = resp.data;
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while creating the subscription. Please try again.');
    }
  };

  // List of subscription plans
  const plans = [
    { name: 'Basic', price: 9.99, priceId: 'price_1P5Z52SJZvKYlo2C155Z52SJZvKYlo2C', features: ['100 AI generations', 'Email support', '1 user'] },
    { name: 'Pro', price: 19.99, priceId: 'price_1P5Z52SJZvKYlo2D155Z52SJZvKYlo2D', features: ['Unlimited AI generations', 'Priority support', '5 users'] },
    { name: 'Enterprise', price: 49.99, priceId: 'price_1P5Z52SJZvKYlo2E155Z52SJZvKYlo2E', features: ['Custom AI model', '24/7 phone support', 'Unlimited users'] },
  ];

  return (
    <div className="container mx-auto py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Choose Your Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {plans.map((plan, index) => (
          <div key={index} className="flex flex-col bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
              <p className="text-2xl font-semibold text-blue-600">${plan.price}<span className="text-lg text-gray-500">/month</span></p>
            </div>
            <div className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <button onClick={() => OnPayment(plan.priceId)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;