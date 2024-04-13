import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPanComponent } from './view-pan.component';

describe('ViewPanComponent', () => {
  let component: ViewPanComponent;
  let fixture: ComponentFixture<ViewPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPanComponent]
    });
    fixture = TestBed.createComponent(ViewPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
