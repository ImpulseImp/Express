import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getSingleTask,
  getAllTasks,
  updateTask,
} from '../handlers/tasks';

const router = Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask);

export default router;
