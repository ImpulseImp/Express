import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import { connectDB } from './db/connect';
import productRouter from './router/products';

import { errorHandlerMiddleware } from './middleware/error-handler';
import { notFound } from './middleware/not-found';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/products', productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
