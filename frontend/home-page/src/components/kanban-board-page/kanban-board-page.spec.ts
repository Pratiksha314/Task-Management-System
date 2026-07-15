import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardPageComponent } from './kanban-board-page';

describe('KanbanBoardPageComponent', () => {
  let component: KanbanBoardPageComponent;
  let fixture: ComponentFixture<KanbanBoardPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanBoardPageComponent]
    });
    fixture = TestBed.createComponent(KanbanBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
