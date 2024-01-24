import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app-error.util";

/*
  Add restriction to what role can only access the route
*/

const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };

export default restrictTo;
