import {Todo} from '../models/todo';
import {v4 as uuid} from 'uuid';

export const createNewTodo = (text: string): Todo => ({
  id: uuid(),
  completed: false,
  text
});
