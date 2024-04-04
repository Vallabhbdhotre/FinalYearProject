import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedLyoutComponent } from './authenticated-lyout.component';

describe('AuthenticatedLyoutComponent', () => {
  let component: AuthenticatedLyoutComponent;
  let fixture: ComponentFixture<AuthenticatedLyoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticatedLyoutComponent]
    });
    fixture = TestBed.createComponent(AuthenticatedLyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
