import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../interfaces/projects';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.html',
  styleUrls: ['./create-project-dialog.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CreateProjectDialogComponent {
  readonly closeDialog = output<Project | void>();
  readonly projectCreated = output<Project>();

  projectForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    owner_username: new FormControl<string>('', { nonNullable: true }),
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    const { name, description, owner_username } = this.projectForm.getRawValue();
    const project: Project = {
      name,
      description: description ?? '',
      owner_username,
    };

    this.projectCreated.emit(project);
  }

  close(): void {
    this.closeDialog.emit();
  }
}
