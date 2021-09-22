import { ErrorClass } from './ErrorClass';
import { NextFunction, Request, Response } from 'express';
import { ResponseFunction } from './with-handler';

interface ErrorObj {
  message: string;
  error: {} | string;
  statusCode: number;
}

function middleware(body: (req: Request, done: (responseFn: ResponseFunction) => void) => void) {
  return (req: Request, res: Response, next: NextFunction) => {
    const handler = (arg: ErrorObj) => {
      if (!arg) return next();
      if (arg.error || arg.message) {
        const data = {
          message: arg.message,
          error: arg.error || undefined,
        };
        return res.status(arg.statusCode as number).json(data);
      }
    };
    body(req, handler);
  };
}

export default middleware;
