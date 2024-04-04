import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharComponent } from './aadhar.component';

describe('AadharComponent', () => {
  let component: AadharComponent;
  let fixture: ComponentFixture<AadharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AadharComponent]
    });
    fixture = TestBed.createComponent(AadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
