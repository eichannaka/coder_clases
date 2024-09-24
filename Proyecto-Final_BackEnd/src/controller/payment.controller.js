import Stripe from "stripe";
import dotenv from "dotenv";
import Logger from "../utils/winston.js";
import cartsService from "../services/carts.services.js";
dotenv.config();
const stripe_publc_key = process.env.PUBLIC_KEY_STRIPE;
const stripe_secret_key = process.env.SECRET_KEY_STRIPE;
const stripe = new Stripe(stripe_secret_key);

export const createCheckOut = async (req, res) => {
  const { cart: cid } = req.body;
  try {
    const cart = await cartsService.getOneCartById(cid);
    const lineItems = cart.products.map((producto) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: producto._id.title,
        },
        unit_amount: producto._id.price * 100, // El precio debe estar en centavos
      },
      quantity: producto.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `https://e-commercecoderhouse-production.up.railway.app/paymentSucces`,
      cancel_url: `https://e-commercecoderhouse-production.up.railway.app/paymentCanceled`,
    });
    res.json({
      status: "succsess",
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    Logger.error("Error en createCheckOut crontroller", error);
    res.status(500).json({ status: "error", message: "Error en el servidor" });
  }
};
