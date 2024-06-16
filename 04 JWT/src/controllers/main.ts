import { Request, Response } from 'express';
import { userLoginType } from '../types/userLogin';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { BadRequestError } from '../errors';
export const login = async (req: Request, res: Response) => {
  const { username, password }: userLoginType = req.body;
  if (!username || !password) {
    throw new BadRequestError('please provide name and password');
  }
  // demo
  const id = new Date().getDate().toString();
  const token = jwt.sign(
    {
      id: id,
      username,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '30d' }
  );
  // console.log(username, password);

  // res.sendStatus(200).json({ msg: 'user created', token });
  // res.send('hello');
  res.json({
    msg: 'user created',
    token,
  });
};

export const dashboard = async (req: CreateUserDto, res: Response) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  if (!req.user) {
    throw new BadRequestError('Not authorized to access this route');
  }

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data ${luckyNumber}`,
  });
};
