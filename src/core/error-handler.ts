import { NextFunction, Request, Response } from 'express';
import BadRequest from './_BadRequestError';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'MongoError') {
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue)[0];
      const resp = BadRequest(`${key} already exists`);
      return res.status(resp.statusCode).json({
        message: resp.message,
        error: resp.error,
      });
    }
  }
  return res.status(500).json({ message: 'Server Error' });
};
