import { Router } from "express";
import authController from "./auth.controller";
import { loginValidation, signupValidation } from "./auth.validation";
import validator from "../middlewares/validator.middleware";

const router = Router();

router.post("/signup", signupValidation, validator, authController.signup);
router.post("/login", loginValidation, validator, authController.login);

export default router;
