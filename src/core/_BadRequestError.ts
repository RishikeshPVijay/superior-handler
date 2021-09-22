import { createProxy } from './createProxy';
import { ErrorClass } from './ErrorClass';

export class BadRequestError extends ErrorClass {
  constructor(message: string = 'Bad Request', error: {} | string = '') {
    super(400, 'Bad Request', message, error);
    this.name = this.constructor.name;
  }
}

const BadRequest = (message?: string, error?: {} | string) => createProxy(message, error, BadRequestError);

export default BadRequest;
