import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/projects';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {
  private BASE_URL = "http://localhost:8000/projects/"; // FastAPI server URL

  private readonly http = inject(HttpClient);

  getAllProjects$(): Observable<Project[]> {
    return this.http.get<Project[]>(this.BASE_URL);
  }

  // getProjectOwnerDetails$(username: string): Observable<User> {
  //   return this.http.get<User>(`${this.BASE_URL}/user/${username}`);
  // }

  createNewProject(new_project: Project): Observable<Project> {
    return this.http.post<Project>(this.BASE_URL, new_project);
  }
}
