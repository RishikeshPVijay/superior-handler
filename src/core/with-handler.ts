import { NextFunction, Request, Response, Router } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';

export interface ResponseFunction {
  message: string;
  data: {} | string;
  error: {} | string;
  statusCode: number;
}

export default (router: Router) => {
  const handle = async (
    path: string,
    routerInstance: Router,
    middlewares: RequestHandlerParams | null,
    body: any,
    type: string,
  ) => {
    if (!body && middlewares instanceof Function) {
      body = middlewares;
      middlewares = [];
    } else if (!middlewares) middlewares = [];
    else if (middlewares instanceof Function) middlewares = [middlewares];
    routerInstance[type as 'get' | 'post' | 'put'](
      path,
      ...middlewares,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const handler = (arg: ResponseFunction) => {
            if (arg.statusCode && (arg.data || arg.error || arg.message)) {
              const data = {
                message: arg.message,
                data: arg.data || undefined,
                error: arg.error,
              };
              return res.status(arg.statusCode).json(data);
            }
          };
          await body(req, handler, res, next);
        } catch (err) {
          next(err);
        }
      },
    );
  };

  return {
    postReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction) => void) => void,
    ) => handle(path, router, middlewares, body, 'post'),

    getReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction) => void) => void,
    ) => handle(path, router, middlewares, body, 'get'),

    putReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction) => void) => void,
    ) => handle(path, router, middlewares, body, 'put'),
  };
};
