import express from "express";
const router = express.Router();
import Booking from "../models/Booking.js";

router.post("/book-room", async (req, res) => {
  try {
    const { roomName, price, date } = req.body;

    const newBooking = new Booking({ roomName, price, date });
    await newBooking.save();

    res.json({ success: true, message: "Room booked!" });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong!" });
  }
});

export default router;
