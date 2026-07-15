import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProjectDialogComponent } from './create-project-dialog';

describe('CreateProjectDialogComponent', () => {
  let component: CreateProjectDialogComponent;
  let fixture: ComponentFixture<CreateProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the form values on submit', () => {
    const emitSpy = spyOn(component.projectCreated, 'emit');

    component.projectForm.setValue({
      name: 'Alpha',
      description: 'Project description',
      owner: 'alice',
    });

    component.onSubmit(new Event('submit'));

    expect(emitSpy).toHaveBeenCalledWith({
      name: 'Alpha',
      description: 'Project description',
      owner: 'alice',
    });
  });
});
