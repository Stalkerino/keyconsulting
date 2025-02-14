import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const editTask = createAction('[Task] Edit Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const markAsDoneTask = createAction('[Task] Mark ad done Task', props<{ task: Task }>());
export const markAsUndoneTask = createAction('[Task] Mark ad Undone Task', props<{ task: Task }>());