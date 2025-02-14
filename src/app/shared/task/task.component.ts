import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { ActionTaskType, TaskActionType } from '../../models/task-action';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatMenuModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Output() actionOnTask = new EventEmitter<ActionTaskType>();

  @Input() task: Task = { id: '', project: '', user: '', contract: '', completed: false };

  sendAction(action: TaskActionType, task: Task) {
    this.actionOnTask.emit({action, task});
  }

}
