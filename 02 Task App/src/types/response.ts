import { Types } from 'mongoose';

export interface TaskResponse {
  _id: Types.ObjectId;
  name: string;
  completed: boolean;
  __v: number;
}
