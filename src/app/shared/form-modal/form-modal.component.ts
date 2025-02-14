import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Store } from "@ngrx/store";
import { Task } from "../../models/task.model";
import { editTask, addTask } from "../../store/task.actions";

@Component({
  selector: 'app-dialog-form-modal',
  templateUrl: 'form-modal.component.html',
  styleUrl: 'form-modal.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class FormModalComponent {
  taskForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null }
  ) {
    // Initialize the form
    this.taskForm = this.fb.group({
      id: [''],
      project: ['', Validators.required],
      user: ['', Validators.required],
      contract: [''],
      completed: [false],
    });

    // If a task is provided, pre-fill the form (edit mode)
    if (this.data.task) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.data.task);
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.showError();
      return;
    }

    const task = this.taskForm.value;

    if (this.isEditMode) {
      this.store.dispatch(editTask({ task }));
    } else {
      task.id = Date.now().toString(); // Generate a unique ID for new tasks
      this.store.dispatch(addTask({ task }));
    }

    this.dialogRef.close(); // Close the dialog after submission
  }

  showError(): void {
    console.error('Form is invalid');
  }
}