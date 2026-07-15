import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListPageComponent } from './project-list-page';

describe('ProjectListPageComponent', () => {
  let component: ProjectListPageComponent;
  let fixture: ComponentFixture<ProjectListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListPageComponent]
    });
    fixture = TestBed.createComponent(ProjectListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
