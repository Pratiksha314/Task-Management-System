import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskApiService } from '../../services/tasks-api-service';
import { Tasks } from '../../interfaces/tasks';

@Injectable({
  providedIn: 'root',
})
export class KanbanBoardTasksResolver implements Resolve<Tasks[]> {
  constructor(private readonly taskApiService: TaskApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Tasks[]> {
    const projectId = String(route.paramMap.get('projectId'));
    return this.taskApiService.getTasksByProjectId$(projectId);
  }
}
