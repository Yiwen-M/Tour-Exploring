import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51LSsasJGsFXZOmeI2uIOHR5NRLHhabnLif3okwkVUTSLZiVqSVb3GBjAP4eOB2WnspEEeLRwEDddPq08ob7khKpl00qR9DUegf'
);
export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
