"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_util_1 = __importDefault(require("../utils/app-error.util"));
/*
  Add restriction to what role can only access the route
*/
const restrictTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new app_error_util_1.default("You do not have permission to perform this action", 403));
    }
    next();
};
exports.default = restrictTo;
