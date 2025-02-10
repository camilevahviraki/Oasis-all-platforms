import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import postPayementIntent from '../postPayementIntent';
import StatusMessages, { useMessages } from './StatusMessages';

const BancontactForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('Jenny Rosen');
  const [messages, addMessage] = useMessages();

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage('Stripe.js has not yet loaded.');
      return;
    }

    const data = {
      paymentMethodType: 'bancontact',
      currency: 'eur',
    };

    const response = await postPayementIntent({ data });
    const { error: backendError, clientSecret } = response;

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage('Client secret returned');

    const {
      error: stripeError,
      paymentIntent,
    } = await stripe.confirmBancontactPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name,
        },
      },
      return_url: `${window.location.origin}order_payed/bancontact?return=true`,
    });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      addMessage(stripeError.message);
      return;
    }

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  return (
    <>
      <h1>Bancontact</h1>

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Pay</button>
      </form>

      <StatusMessages messages={messages} />
    </>
  );
};

// Component for displaying results after returning from
// bancontact redirect flow.
const BancontactReturn = () => {
  const stripe = useStripe();
  const [messages, addMessage] = useMessages();

  // Extract the client secret from the query string params.
  const query = new URLSearchParams(useLocation().search);
  const clientSecret = query.get('payment_intent_client_secret');

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const fetchPaymentIntent = async () => {
      const {
        error: stripeError,
        paymentIntent,
      } = await stripe.retrievePaymentIntent(clientSecret);
      if (stripeError) {
        addMessage(stripeError.message);
      }
      addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    };
    fetchPaymentIntent();
  }, [clientSecret, stripe, addMessage]);

  return (
    <>
      <h1>Thank you for choosing Bancontact</h1>
      <StatusMessages messages={messages} />
    </>
  );
};

const Bancontact = () => {
  const query = new URLSearchParams(useLocation().search);
  if (query.get('return')) {
    return <BancontactReturn />;
  }
  return <BancontactForm />;
};

export default Bancontact;
