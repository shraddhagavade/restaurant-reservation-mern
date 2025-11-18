import express from "express";
import send_reservation from "../controller/reservation.js";

const router = express.Router();

// POST  /api/v1/reservation
router.post("/", send_reservation);

export default router;
