import { Component, Inject, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Tasks, Comments } from '../../interfaces/tasks';
import { TaskApiService } from '../../services/tasks-api-service';
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIcon, DatePipe],
  templateUrl: './task-detail-page.html',
  styleUrls: ['./task-detail-page.scss']
})
export class TaskDetailPageComponent {
  private readonly changeDetectRef = inject(ChangeDetectorRef);
  private readonly commentsService = inject(TaskApiService);

  taskForm = new FormGroup<{
    id: FormControl<string | null>;
    project_id: FormControl<string>;
    project_name: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<string>;
    assigned_to: FormControl<string>;
    due_date: FormControl<Date | null>;
    priority: FormControl<string>;
    create_at: FormControl<string>;
    commentsControl: FormControl<Comment | null>;
  }>({
    id: new FormControl<string | null>(null),
    project_id: new FormControl('', { nonNullable: true }),
    project_name: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    status: new FormControl('To Do', { nonNullable: true }),
    assigned_to: new FormControl('', { nonNullable: true }),
    due_date: new FormControl(null, { nonNullable: true }),
    priority: new FormControl('Medium', { nonNullable: true }),
    create_at: new FormControl('', { nonNullable: true }),
    commentsControl: new FormControl<Comment | null>(null, { nonNullable: true }),
  });


  get taskTitle(): string {
    return this.taskForm.controls.title.value;
  }

  comments: Comments[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<TaskDetailPageComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Tasks
  ) {
    if (task) {
      this.taskForm.patchValue({
        id: task.id,
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        assigned_to: task.assigned_to,
        due_date: task.due_date,
        priority: task.priority,
      });

      this.commentsService.getCommentsForTask(task.id!).subscribe({
        next: (comments: Comments[]) => {
          this.comments.push(...comments);
          this.taskForm.controls.commentsControl.markAsTouched();
        },
        error: (error) => console.error('Error loading comments', error),
      });
    }
  }

  get taskId(): string {
    return this.taskForm.controls.id.value || '' ;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const { commentsControl, ...restData } = this.taskForm.value;
      this.dialogRef.close(restData);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  addCommentInTask(comment: string) {
    const form = this.taskForm.value;
    const task_id = form.id;
    if (task_id) {
      const new_comment = {
        task_id,
        user_name: form.assigned_to ?? '',
        comment,
      }
      this.commentsService.addComment(new_comment).subscribe(data => {
        this.comments.push(data as Comments);
        this.changeDetectRef.detectChanges();
        this.taskForm.controls.commentsControl.setValue(null);
      });
    }
  };
}
