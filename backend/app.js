import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// ✅ Allow frontend (Vite) to call backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1/reservation", reservationRouter);
app.use("/api", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

// ❗ Connect to DB only here (NOT in server.js)
dbConnection();

// Error Middleware
app.use(errorMiddleware);

export default app;
