import { Schema, model } from 'mongoose';

export interface ITask {
  name: string;
  completed: boolean;
}

const TaskSchema = new Schema<ITask>({
  name: {
    type: String,
    required: [true, 'must provide a name'],
    minlength: [2, 'name must be longer than 1 character'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Task = model<ITask>('Task', TaskSchema);
