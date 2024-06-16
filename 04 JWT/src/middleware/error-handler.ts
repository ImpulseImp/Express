import { Request, NextFunction, Response, ErrorRequestHandler } from 'express';
import { CustomAPIError } from '../errors/custom-error';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ msg: err.message });
};
