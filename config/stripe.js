import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in .env");
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2024-06-20",
  typescript: false,
  maxNetworkRetries: 3,
});

export default stripe;