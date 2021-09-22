export class ErrorClass extends Error {
  statusCode: number;
  statusMessage: string;
  error: {} | string;
  constructor(statusCode: number, statusMessage: string, message: string, error: {} | string = '') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}
