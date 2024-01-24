import { IUser } from "../../users/user";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
