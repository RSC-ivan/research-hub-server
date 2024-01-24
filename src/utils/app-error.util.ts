/**
  Custom Error which have additional attributes
  statusCode - let the developer add statusCode on error
  status - provide status (fail or error) based on the statusCode provided
*/

export default class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }
}
