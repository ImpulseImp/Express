import * as express from 'express-serve-static-core';

//extend the request interface
declare global {
  namespace Express {
    interface Request {
      customField?: string;
    }
  }
}
