import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User, { IUser } from "../users/user";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async.util";
import AppError from "../utils/app-error.util";

// Generate a jwt token from user id
const signToken = (id: Types.ObjectId) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// A boilerplate function to send response with token & excluding the user password
const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  const { password, ...userInfo } = user.toObject();

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: userInfo,
    },
  });
};

// Signup
const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    createSendToken(user, 201, res);
  }
);

// Login
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 201, res);
  }
);

export default {
  signup,
  login,
};
