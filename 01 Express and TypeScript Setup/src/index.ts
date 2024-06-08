import express, { NextFunction, Request, Response, urlencoded } from 'express';
import usersRouter from './router/users';

const app = express();

const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(`<h1>Home Page</h1>`);
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
