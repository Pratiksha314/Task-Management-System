import { Routes } from '@angular/router';
import { KanbanBoardPageComponent } from '../components/kanban-board-page/kanban-board-page';
import { KanbanBoardTasksResolver } from '../components/kanban-board-page/kanban-board-tasks.resolver';
import { LoginSignupPageComponent } from '../components/login-signup-page/login-signup-page';
import { ProjectListPageComponent } from '../components/project-list-page/project-list-page';
import { authGuard } from '../services/auth.guard';

export const routes: Routes = [
  // 1. Give your login page an explicit 'login' path name
  { path: 'login', component: LoginSignupPageComponent },

  // 2. Redirect empty root paths ('') directly to your login path
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'project-list', component: ProjectListPageComponent, canActivate: [authGuard] },
  {
    path: 'kanban-board/:projectId',
    component: KanbanBoardPageComponent,
    resolve: {
      tasks: KanbanBoardTasksResolver,
    },
    canActivate: [authGuard],
  },

  // 3. Optional: Redirect all unknown typo paths back to login
  { path: '**', redirectTo: 'login' }
];
