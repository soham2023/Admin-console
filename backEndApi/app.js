import express from "express";
import { config } from "dotenv";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (_req, res) => {
  res.send("Pong");
});

import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import miscRoutes from "./routes/miscellaneous.routes.js";

app.use('/api/v1/user', userRoutes);


app.all("*", (_req, res) => {
  res.status(404).send("OOPS!!! 404 Page Not Found");
});

export default app;
