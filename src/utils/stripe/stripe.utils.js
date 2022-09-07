import { loadStripe } from "@stripe/stripe-js";

// loadStripe is what runs to identify the stripe instance we are using, so it requires stripe publishable key provided by stripe to identify it
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

// now we need to use it in our index.js, so that our whole app can use stripe functionalities
