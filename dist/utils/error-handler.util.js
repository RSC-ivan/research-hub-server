"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handle all the errors the app encountered and provide a response
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            status,
            message: err.message,
            error: err,
        });
    }
    else {
        res.status(statusCode).json({
            status,
            message: "Something went wrong on the server!",
        });
    }
};
exports.default = errorHandler;
