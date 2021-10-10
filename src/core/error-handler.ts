import { NextFunction, Request, Response } from 'express';
import { ErrorObj } from './middleware';
import { ResponseFunction } from './with-handler';

const errorHandler = ({ debug = false }: { debug: boolean }) => {
  return {
    handler: (
      body: (
        err: Error,
        done: (responseFn: ResponseFunction) => void
      ) => void
    ) => {
      return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (debug) process.stderr.write(`${err.stack || err.message || err}\n`);
        const handle = (arg: ErrorObj) => {
          if (!arg) {
            process.stderr.write(`${new Error('done handler argument required')}\n`);
            process.exit(1);
          }
          const data = {
            message: arg.message,
            error: arg.error
          };
          return res.status(arg.statusCode).json(data);
        }
        body(err, handle);
      }
    }
  }
}

export default errorHandler;
