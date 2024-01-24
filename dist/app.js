"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_error_util_1 = __importDefault(require("./utils/app-error.util"));
const error_handler_util_1 = __importDefault(require("./utils/error-handler.util"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
// Create instance of express
const app = (0, express_1.default)();
/* MIDDLEWARE */
// Set HTTP security header
app.use((0, helmet_1.default)());
// Development logging
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Transform request & response into json format
app.use(express_1.default.json({ limit: "10kb" }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
/* ROUTES */
app.use("/api/v1/auth", auth_route_1.default);
// If goes here, then route entered is invalid
app.all("*", (req, res, next) => {
    next(new app_error_util_1.default("The route you are accessing is not found on this server", 404));
});
// Last resort, give error response
app.use(error_handler_util_1.default);
exports.default = app;
