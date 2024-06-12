import { Request, Response } from 'express-serve-static-core';
import { Task } from '../models/Task';
import { CreateTaskDto } from '../dtos/CreateUser.dto';
import { asyncWrapper } from '../middleware/async';
import { NextFunction } from 'express';
import { createCustomError } from '../errors/custom-error';
export const getAllTasks = asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const tasks = await Task.find({});
  return res.json({ tasks: tasks });
});

export const createTask = asyncWrapper(async function (
  req: Request<{}, {}, CreateTaskDto>,
  res: Response
) {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
});

export const getSingleTask = asyncWrapper(async function (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { id: taskID } = req.params;
  const task = await Task.findById(taskID).exec();
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

export const updateTask = asyncWrapper(async function (
  req: Request<{ id: string }, {}, CreateTaskDto>,
  res: Response
) {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}` });
  }
  res.status(200).json({ task });
});

export const deleteTask = asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
