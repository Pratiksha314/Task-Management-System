import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupPageComponent } from './login-signup-page';

describe('LoginSignupPageComponent', () => {
  let component: LoginSignupPageComponent;
  let fixture: ComponentFixture<LoginSignupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupPageComponent]
    });
    fixture = TestBed.createComponent(LoginSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
