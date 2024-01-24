import { NextFunction, Request, Response } from "express";
import AppError from "./app-error.util";

/**
 * Handle all the errors the app encountered and provide a response
 */

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status,
      message: err.message,
      error: err,
    });
  } else {
    res.status(statusCode).json({
      status,
      message: "Something went wrong on the server!",
    });
  }
};

export default errorHandler;
