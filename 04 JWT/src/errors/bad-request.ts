import { CustomAPIError } from './custom-error';
import { StatusCodes } from 'http-status-codes';

export class BadRequestError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// export const createCustomError = (msg: string, statusCode: number) => {
//   return new CustomAPIError(msg);
// };
