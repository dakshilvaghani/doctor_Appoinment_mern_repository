import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import { Stripe } from "stripe";

// Create a function to handle checkout session creation
export const getCheckoutSession = async (req, res) => {
  try {
    // Get the currently booked doctor
    const doctor = await Doctor.findById(req.params.doctorid);
    const user = await User.findById(req.userid);

    // Create a new instance of the Stripe class
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorid,
      line_items: [
        {
          price_data: {
            currency: "bdt", // Replace with the appropriate currency code
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo], // Replace with the correct field from your Doctor model
            },
            //   unit_amount: 10100, // Replace with the appropriate unit amount (in cents)
          },
          quantity: 1,
        },
      ],
    });

    // Create a new booking instance
    const booking = new Booking({
      doctor: doctor.id,
      user: user.id,
      ticketPrice: doctor.ticketPrice, // Replace with the correct field from your Doctor model
      session: session.id,
    });

    // Save the booking to the database
    await booking.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Successfully paid",
      session,
    });
  } catch (err) {
    // Handle errors appropriately (send an error response or log the error)
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error occurred while creating the checkout session.",
    });
  }
};
