import express from "express";
import AppError from "./utils/app-error.util";
import errorHandler from "./utils/error-handler.util";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./auth/auth.route";

// Create instance of express
const app = express();

/* MIDDLEWARE */
// Set HTTP security header
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Transform request & response into json format
app.use(express.json({ limit: "10kb" }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ROUTES */
app.use("/api/v1/auth", authRouter);

// If goes here, then route entered is invalid
app.all("*", (req, res, next) => {
  next(
    new AppError("The route you are accessing is not found on this server", 404)
  );
});

// Last resort, give error response
app.use(errorHandler);

export default app;
