import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectApiService } from '../../services/projects-api-service';
import { TaskApiService } from '../../services/tasks-api-service';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of, map, forkJoin, Subject, merge, startWith, tap } from 'rxjs';
import { Project } from '../../interfaces/projects';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.html',
  styleUrls: ['./project-list-page.scss'],
  standalone: true,
  imports: [CreateProjectDialogComponent, TitleCasePipe],
})
export class ProjectListPageComponent {
  private readonly changeDetectRef = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectApiService);
  private readonly tasksSerivce = inject(TaskApiService);
  private readonly refreshProjects$ = new Subject<void>();

  readonly rawProjects = merge(
    this.projectService.getAllProjects$(),
    this.refreshProjects$.pipe(switchMap(() => this.projectService.getAllProjects$()))
  ).pipe(startWith([] as Project[]));

  isCreateDialogOpen = false;

  openCreateProjectDialog(): void {
    this.isCreateDialogOpen = true;
  }

  closeCreateProjectDialog(): void {
    this.isCreateDialogOpen = false;
  }

  handleCreateProject(project: Project): void {
    this.projectService.createNewProject(project).subscribe(() => {
      this.closeCreateProjectDialog();
      this.refreshProjects$.next();
      this.changeDetectRef.detectChanges();
    });
  }

  projectsWithOwners$ = this.rawProjects.pipe(
    switchMap(projects => {
      if (projects.length === 0) return of([]);

      const requests = projects.map(project =>
        forkJoin({
          tasks: this.tasksSerivce.getTasksByProjectId$(project.id!)
        }).pipe(
          map(({ tasks }) => ({ ...project, tasks }))
        )
      );

      return forkJoin(requests);
    })
  );

  readonly projectList = toSignal(this.projectsWithOwners$);


openDetailProjectTasks(project: Project): void {
  // 1. Use createUrlTree to build the clean Angular route path and query parameters
  const urlTree = this.router.createUrlTree(['/kanban-board', project.id], {
    queryParams: { projectName: project.name }
  });

  // 2. Serialize the tree into a clean string URL structure
  const url = this.router.serializeUrl(urlTree);

  // 3. Launch the new tab safely
  window.open(url, '_blank', 'noopener,noreferrer');
}
}
