import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from "./shared/task/task.component";
import { FilterType } from './models/filter-type.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from './models/task.model';
import { Store } from '@ngrx/store';
import { TaskState } from './store/task.reducer';
import { map } from 'rxjs/internal/operators/map';
import { combineLatestWith } from 'rxjs/operators';
import { ActionTaskType } from './models/task-action';
import { deleteTask, markAsDoneTask, markAsUndoneTask } from './store/task.actions';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FormModalComponent } from './shared/form-modal/form-modal.component';
import { FiltersComponent } from './shared/filters/filters.component';



@Component({
  selector: 'app-root',
  imports: [CommonModule, TaskComponent, MatIconModule, FiltersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private _filterSubject = new BehaviorSubject<FilterType>('ALL');
  private _searchTextSubject = new BehaviorSubject<string>('');

  tasks$: Observable<Task[]>;
  filter$ = this._filterSubject.asObservable();
  searchText$ = this._searchTextSubject.asObservable();
  filteredTasks$: Observable<Task[]>;

  constructor(private store: Store<{ tasks: TaskState }>, private matIconReg: MatIconRegistry) {
    this.tasks$ = this.store.select((state) => state.tasks.tasks).pipe(
      map((tasks) => {
        return tasks != null ? Object.values(tasks) : []
      })
    );
    this.filteredTasks$ = this.tasks$.pipe(
      combineLatestWith(this.filter$, this.searchText$),
      map(([tasks, filter, searchText]: [Task[], FilterType, string]) =>
        tasks.filter(task =>
          (filter === 'ALL' ||
           (filter === 'COMPLETED' && task.completed) ||
           (filter === 'UNFINISHED' && !task.completed)) &&
          task.project.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  }

  ngOnInit() {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }

  openDialog(task?: Task) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  taskActionManager(args: ActionTaskType) {
    switch (args.action) {
      case 'DELETE':
        this.deleteTask(args.task.id);
        break;
      case 'DONE':
        if (args.task.completed) {
          this.markAsUndoneTask(args.task);
        } else {
          this.markAsDoneTask(args.task);
        }
        break;
      case 'EDIT':
        this.editTask(args.task);
        break;
      default:
        console.error('No action could be done')
        break;
    }
  }

  onFilterChange(filter: FilterType) {
    this._filterSubject.next(filter);
  }

  onSearchTextChange(searchText: string) {
    this._searchTextSubject.next(searchText);
  }

  setFilter(filter: FilterType) {
    this._filterSubject.next(filter);
  }

  updateSearchText(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._searchTextSubject.next(inputElement.value);
  }

  deleteTask(id: string) {
    this.store.dispatch(deleteTask({ id }));
  }

  markAsDoneTask(task: Task) {
    this.store.dispatch(markAsDoneTask( { task } ));
  }

  markAsUndoneTask(task: Task) {
    this.store.dispatch(markAsUndoneTask( { task } ))
  }

  editTask(task: Task) {
    this.openDialog(task);
  }
}


