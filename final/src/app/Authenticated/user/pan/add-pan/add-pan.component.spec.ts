import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanComponent } from './add-pan.component';

describe('AddPanComponent', () => {
  let component: AddPanComponent;
  let fixture: ComponentFixture<AddPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPanComponent]
    });
    fixture = TestBed.createComponent(AddPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
