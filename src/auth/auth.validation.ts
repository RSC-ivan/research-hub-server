import { body } from "express-validator";
import User from "../users/user";

// Validation for login
export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email format!"),
  body("password").trim().notEmpty().withMessage("Password is required!"),
];

// Validation for signup
export const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required!"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Invalid email format!")
    .customSanitizer((email: string) => {
      if (email) return email.toLowerCase();
    })
    .custom(async (email: string) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("Email already exist!");
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters long!"),
];
