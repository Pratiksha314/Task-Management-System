import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Tasks, Comments } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private BASE_URL = 'http://localhost:8000'; // FastAPI server URL

  private readonly http = inject(HttpClient);

  // Tasks
  getTasksByProjectId$(project_id: string): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.BASE_URL}/tasks/project/${project_id}/tasks`);
  }

  createTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.BASE_URL}/tasks`, task);
  }

  editTask(task: Tasks): Observable<Tasks> {
    if (!task.id) {
      throw new Error('Task id is required for edit');
    }

    return this.http.patch<Tasks>(`${this.BASE_URL}/tasks/${task.id}`, task);
  }

  // Comments
  getCommentsForTask(task_id: string): Observable<Comments[]>{
    return this.http.get<Comments[]>(`${this.BASE_URL}/comments/task/${task_id}/comments`);
  }

  addComment(comment: Comments): Observable<Comments>{
    return this.http.post<Comments>(`${this.BASE_URL}/comments`, comment);
  }
}
