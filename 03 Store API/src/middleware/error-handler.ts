import { Request, NextFunction, Response, ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  return res.status(500).send({ msg: err.message });
};
