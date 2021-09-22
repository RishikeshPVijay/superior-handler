import { createProxy } from './createProxy';
import { ErrorClass } from './ErrorClass';

export class NotFoundError extends ErrorClass {
  constructor(message: string = 'Not Found', error: {} | string) {
    super(404, 'Not Found', message, error);
    this.name = this.constructor.name;
  }
}

const NotFound = (message?: string, error?: {} | string) => createProxy(message, error, NotFoundError);

export default NotFound;
