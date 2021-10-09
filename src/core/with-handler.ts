import { NextFunction, Request, Response, Router } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { Header } from './_SetHeader';

export interface ResponseFunction {
  message: string;
  data: {} | string;
  error: {} | string;
  statusCode: number;
}

type Head = {
  header: Header
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
    routerInstance[type as 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head'](
      path,
      ...middlewares,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const handler = (arg: ResponseFunction, headers: Head) => {
            if (arg.statusCode && (arg.data || arg.error || arg.message)) {
              if (headers && headers.header) {
                for (const key of Object.keys(headers.header)) {
                  res.set(`${key}`, headers.header[key]);
                }
              }
              if (type !== 'head') {
                const data = {
                  message: arg.message,
                  data: arg.data || undefined,
                  error: arg.error,
                };
                return res.status(arg.statusCode).json(data);
              } else {
                return res.status(arg.statusCode).end();
              }
            }
            return res.sendStatus(500);
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
      body: (req: Request, done: (responseFn: ResponseFunction, setHeader: Header) => void) => void,
    ) => handle(path, router, middlewares, body, 'post'),

    getReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction, setHeader: Header) => void) => void,
    ) => handle(path, router, middlewares, body, 'get'),

    putReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction, setHeader: Header) => void) => void,
    ) => handle(path, router, middlewares, body, 'put'),

    deleteReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction, setHeader: Header) => void) => void,
    ) => handle(path, router, middlewares, body, 'delete'),

    patchReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction, setHeader: Header) => void) => void,
    ) => handle(path, router, middlewares, body, 'patch'),

    headReq: (
      path: string,
      middlewares: RequestHandlerParams | null,
      body: (req: Request, done: (responseFn: ResponseFunction, setHeader: Header) => void) => void,
    ) => handle(path, router, middlewares, body, 'head'),
  };
};
