import { SuccessClass } from './SuccessClass';

class SuccessResponse extends SuccessClass {
  constructor(message: string = 'ok', data: {} | string = '') {
    super(200, 'ok', message, data);
  }
}

function createProxy(message?: string, data?: {} | string, cls?: any) {
  if (typeof message === 'object' && !data) {
    data = message;
    message = undefined;
  }
  return new cls(message, data);
}

const Success = (message?: string, data?: {} | string) => createProxy(message, data, SuccessResponse);

export default Success;
