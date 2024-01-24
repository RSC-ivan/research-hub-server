"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_validation_1 = require("./auth.validation");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const router = (0, express_1.Router)();
router.post("/signup", auth_validation_1.signupValidation, validator_middleware_1.default, auth_controller_1.default.signup);
router.post("/login", auth_validation_1.loginValidation, validator_middleware_1.default, auth_controller_1.default.login);
exports.default = router;
