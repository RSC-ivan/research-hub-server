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
exports.signupValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../users/user"));
// Validation for login
exports.loginValidation = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid email format!"),
    (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required!"),
];
// Validation for signup
exports.signupValidation = [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required!"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required!")
        .bail()
        .isEmail()
        .withMessage("Invalid email format!")
        .customSanitizer((email) => {
        if (email)
            return email.toLowerCase();
    })
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email });
        if (user)
            throw new Error("Email already exist!");
        return true;
    })),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 6 })
        .withMessage("Password should be atleast 6 characters long!"),
];
