export class SuccessClass {
  statusCode: number;
  statusMessage: string;
  message: string;
  data: string | {};

  constructor(statusCode: number, statusMessage: string, message: string, data: {} | string) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.message = message;
    this.data = data;
  }
}
