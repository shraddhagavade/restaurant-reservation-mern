import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import app from "./app.js";

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`✅ SERVER HAS STARTED AT PORT ${process.env.PORT}`);
});


