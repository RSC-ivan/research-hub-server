"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catch_async_util_1 = __importDefault(require("../utils/catch-async.util"));
const app_error_util_1 = __importDefault(require("../utils/app-error.util"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../users/user"));
const { promisify } = require("util");
/**
 * Verify that user accessing the routes is authenticated
 * and adding that user into Request object for later use
 */
const isAuth = (0, catch_async_util_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new app_error_util_1.default("You are not logged in! please login to get access.", 401));
    }
    const decoded = yield promisify(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET_KEY);
    const currentUser = yield user_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new app_error_util_1.default("The user belonging to this user no longer exist!", 401));
    }
    req.user = currentUser;
    next();
}));
exports.default = isAuth;
