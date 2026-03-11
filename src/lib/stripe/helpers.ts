import Stripe from "stripe";

let stripeAdminPromise: Stripe | null = null;

export const getStripeAdmin = () => {
  if (!stripeAdminPromise) {
    stripeAdminPromise = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
      appInfo: {
        name: "AntiGravity Marketplace",
        version: "0.1.0"
      }
    });
  }
  return stripeAdminPromise;
};
