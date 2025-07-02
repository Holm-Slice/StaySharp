// 1) Import Stripe, using the secret key from env
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 2) The handler function Replit will call
export async function handler(req, res) {
  // 3) Parse the incoming booking data
  const { bookingData } = JSON.parse(req.body);

  // 4) Build line items array for Stripe
  const line_items = bookingData.services.map((svc) => ({
    price_data: {
      currency: "usd",
      product_data: { name: svc.title },
      unit_amount: Math.round(
        parseFloat(svc.price.replace(/[^0-9.]/g, "")) * 100,
      ),
    },
    quantity: 1,
  }));

  // 5) Create the Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.PUBLIC_URL}/success`,
    cancel_url: `${process.env.PUBLIC_URL}/cancel`,
    customer_email: bookingData.email,
  });

  // 6) Return the session URL to the client
  res.json({ url: session.url });
}
