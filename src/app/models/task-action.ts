import { Task } from "./task.model";

export type TaskActionType = 'DONE' | 'EDIT' | 'DELETE';
export type ActionTaskType = {action: TaskActionType, task: Task};