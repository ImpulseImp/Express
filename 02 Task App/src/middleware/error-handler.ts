import { Request, NextFunction, Response, ErrorRequestHandler } from 'express';
import { ResponseError } from '../types/response-error';
import { CustomAPIError } from '../errors/custom-error';
export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  console.log(err);
  return res.status(500).send({ msg: err.message });
};
