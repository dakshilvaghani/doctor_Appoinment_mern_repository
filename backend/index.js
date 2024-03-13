import express from "express";
import cookieParser from "cookie-parser"; // Fix: Correct the module name
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
// import bookingRoute from "./Routes/booking.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// database connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  // Added missing arrow function syntax
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Corrected typo in option name
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err); // Changed log to error for better indication
  }
};

//middelware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Enable cookies across different domains
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute); //domain/api/v1/auth/register
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
// app.use("/api/v1/booking", bookingRoute);

// app.get("/", (req, res) => {
//   // Handle your request here
//   res.send("Hello, World!");
// });

app.listen(port, () => {
  // Call the connectDB function
  connectDB();
  console.log("Server is running on port " + port);
});
