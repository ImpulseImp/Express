import { Request, Response } from 'express-serve-static-core';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { CreateUserQueryParams } from '../types/query-params';
import { User } from '../types/response';

export function getUsers(req: Request, res: Response) {
  res.json({ success: true, data: ['John', 'Impulse', 'Bob'] });
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ success: true, data: [id] });
}

export function createUser(
  req: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  res: Response<User | { success: false; msg: string }>
) {
  // req.customField.startsWith('a')
  const { email, password, username } = req.body;
  if (!password) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide a password' });
  }
  return res.status(201).json({
    success: true,
    data: [
      {
        id: Math.random(),
        email,
        username,
      },
    ],
  });
}
