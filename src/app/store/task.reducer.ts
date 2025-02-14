import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { addTask, editTask, deleteTask, markAsDoneTask, markAsUndoneTask } from './task.actions';

export interface TaskState {
  tasks: { [key: string]: Task };
}

export const initialState: TaskState = {
  tasks: {},
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: { ...state.tasks, [task.id]: task },
  })),
  on(editTask, (state, { task }) => ({
    ...state,
    tasks: { ...state.tasks, [task.id]: task },
  })),
  on(deleteTask, (state, { id }) => {
    const { [id]: removed, ...remainingTasks } = state.tasks;
    return { ...state, tasks: remainingTasks };
  }),
  on(markAsDoneTask, (state, { task }) => ({
    ...state,
    tasks: { ...state.tasks, [task.id]: { ...task, completed: true } },
  })),
  on(markAsUndoneTask, (state, { task }) => ({
    ...state,
    tasks: { ...state.tasks, [task.id]: { ...task, completed: false } },
  })),
);