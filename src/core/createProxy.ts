export function createProxy(message?: string, error?: {} | string, cls?: any) {
  if (typeof message === 'object' && !error) {
    error = message;
    message = undefined;
  }
  return new cls(message, error);
}
