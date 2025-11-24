import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

// CONNECT MONGO
dbConnection();

// ROUTES (after app is imported)
import bookingRoutes from "./routes/bookings.js";
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
});
