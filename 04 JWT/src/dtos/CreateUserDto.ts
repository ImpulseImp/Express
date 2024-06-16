import { JwtPayloadType } from '../types/jwtPayload';
import { Request } from 'express';
export type CreateUserDto = Request & {
  user?: JwtPayloadType;
};
