import express from 'express';
import { notFound } from './middleware/not-found';

import 'dotenv/config';
// import * as dotenv from 'dotenv';
// dotenv.config();

import { connectDB } from './db/connect';
import tasksRouter from './router/tasks';
import { errorHandlerMiddleware } from './middleware/error-handler';

const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1/tasks', tasksRouter);
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
