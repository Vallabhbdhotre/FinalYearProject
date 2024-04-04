import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAadharComponent } from './add-aadhar.component';

describe('AddAadharComponent', () => {
  let component: AddAadharComponent;
  let fixture: ComponentFixture<AddAadharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAadharComponent]
    });
    fixture = TestBed.createComponent(AddAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
