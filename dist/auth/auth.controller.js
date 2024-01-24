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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../users/user"));
const catch_async_util_1 = __importDefault(require("../utils/catch-async.util"));
const app_error_util_1 = __importDefault(require("../utils/app-error.util"));
// Generate a jwt token from user id
const signToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});
// A boilerplate function to send response with token & excluding the user password
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const _a = user.toObject(), { password } = _a, userInfo = __rest(_a, ["password"]);
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user: userInfo,
        },
    });
};
// Signup
const signup = (0, catch_async_util_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_1.default.create({
        name,
        email,
        password,
    });
    createSendToken(user, 201, res);
}));
// Login
const login = (0, catch_async_util_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email }).select("+password");
    if (!user || !(yield user.correctPassword(password, user.password))) {
        return next(new app_error_util_1.default("Incorrect email or password", 401));
    }
    createSendToken(user, 201, res);
}));
exports.default = {
    signup,
    login,
};
