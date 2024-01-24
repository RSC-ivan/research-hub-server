import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async.util";
import AppError from "../utils/app-error.util";
import jwt from "jsonwebtoken";
import User, { IUser } from "../users/user";
const { promisify } = require("util");

/**
 * Verify that user accessing the routes is authenticated
 * and adding that user into Request object for later use
 */

const isAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! please login to get access.", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this user no longer exist!", 401)
      );
    }

    req.user = currentUser;
    next();
  }
);

export default isAuth;
