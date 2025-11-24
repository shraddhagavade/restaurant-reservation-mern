import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  roomName: String,
  price: Number,
  date: String,
});

export default mongoose.model("Booking", bookingSchema);
