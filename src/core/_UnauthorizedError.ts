import { createProxy } from './createProxy';
import { ErrorClass } from './ErrorClass';

export class UnauthorizedError extends ErrorClass {
  constructor(message: string = 'Unauthorized', error: {} | string = '') {
    super(401, 'Unauthorized', message, error);
    this.name = this.constructor.name;
  }
}

const Unauthorized = (message?: string, error?: {} | string) => createProxy(message, error, UnauthorizedError);

export default Unauthorized;
