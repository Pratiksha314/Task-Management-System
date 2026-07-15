import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailPageComponent } from '../task-detail-page/task-detail-page';
import { TaskApiService } from '../../services/tasks-api-service';
import { Tasks } from '../../interfaces/tasks';

@Component({
  selector: 'app-kanban-board-page',
  templateUrl: './kanban-board-page.html',
  styleUrls: ['./kanban-board-page.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
})
export class KanbanBoardPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly detectRef = inject(ChangeDetectorRef);

  projectTitle = 'Website Redesign';

  private readonly tasksService = inject(TaskApiService);

  columns = ['To Do', 'In Progress', 'Done', 'Backlog'];
  tasks : Tasks[] = [];

  getTasksByStatus(status: string): Tasks[] {
    return this.tasks.filter(task => task.status === status);
  }

  constructor() {
    this.route.data.subscribe(data => {
      if (data['tasks']) {
        this.tasks = data['tasks'] as Tasks[];
      }
    });

    this.route.queryParamMap.subscribe(params => {
      const projectName = params.get('projectName');
      if (projectName) {
        this.projectTitle = decodeURIComponent(projectName);
      }
    });
  }

  private loadTasksFromServer(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId') ?? '';

    if (!projectId) {
      return;
    }

    this.tasksService.getTasksByProjectId$(projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.detectRef.detectChanges();
      },
      error: (error) => console.error('Error loading tasks', error)
    });
  }

  openTaskDialog(task?: Tasks): void {
    this.dialog.open(TaskDetailPageComponent, {
      data: task ?? {},
      width: '680px',
      maxHeight: '90vh',
    }).afterClosed().subscribe((result: Tasks | undefined) => {
      if (!result) {
        return;
      }

      const projectId = this.route.snapshot.paramMap.get('projectId') ?? '';
      const payload: Tasks = {
        ...result,
        project_id: result.project_id || projectId,
        project_name: result.project_name || this.projectTitle,
      };

      if (task?.id || result.id) {
        this.tasksService.editTask(payload).subscribe({
          next: () => {
            this.loadTasksFromServer();
          },
          error: (error) => console.error('Error editing task', error)
        });
      } else {
        this.tasksService.createTask(payload).subscribe({
          next: () => {
            this.loadTasksFromServer();
          },
          error: (error) => console.error('Error creating task', error)
        });
      }
    });
  }
}
