import { Response, Request, NextFunction } from 'express';
import { CustomAPIError } from '../errors/custom-error';
import { JwtPayloadType } from '../types/jwtPayload';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UnauthenticatedError } from '../errors';

export const authenticationMiddleware = async (
  req: CreateUserDto,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  console.log(authHeader === 'Bearer null');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }
  const token = authHeader.split(' ')[1];
  console.log(token);
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadType;
    console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   throw new UnauthenticatedError('No token provided')
  // }
  next();
};
