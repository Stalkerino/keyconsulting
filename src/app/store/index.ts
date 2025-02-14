import { ActionReducerMap } from '@ngrx/store';
import { taskReducer, TaskState } from './task.reducer';

export interface AppState {
  tasks: TaskState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
};