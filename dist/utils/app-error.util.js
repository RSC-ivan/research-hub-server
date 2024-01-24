"use strict";
/**
  Custom Error which have additional attributes
  statusCode - let the developer add statusCode on error
  status - provide status (fail or error) based on the statusCode provided
*/
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
}
exports.default = AppError;
