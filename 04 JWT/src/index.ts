import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response, urlencoded } from 'express';
import mainRouter from './router/main';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';

const app = express();

const port = process.env.PORT || 3000;
//middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);
app.use(notFound);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
