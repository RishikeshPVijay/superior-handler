import { createProxy } from './createProxy';
import { ErrorClass } from './ErrorClass';

export class ServerErrorClass extends ErrorClass {
  constructor(message: string = 'Server Error', error: {} | string = '') {
    super(500, 'Server Error', message, error);
    this.name = this.constructor.name;
  }
}

const ServerError = (message?: string, error?: {} | string) => createProxy(message, error, ServerErrorClass);

export default ServerError;
