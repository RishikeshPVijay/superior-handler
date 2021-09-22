import { createProxy } from './createProxy';
import { ErrorClass } from './ErrorClass';

export class ForbiddenError extends ErrorClass {
  constructor(message: string = 'Forbidden', error: {} | string = '') {
    super(403, 'Forbidden', message, error);
    this.name = this.constructor.name;
  }
}

const Forbidden = (message?: string, error?: {} | string) => createProxy(message, error, ForbiddenError);

export default Forbidden;
