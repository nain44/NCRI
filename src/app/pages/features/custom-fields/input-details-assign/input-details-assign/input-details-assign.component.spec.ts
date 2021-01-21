import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDetailsAssignComponent } from './input-details-assign.component';

describe('InputDetailsAssignComponent', () => {
  let component: InputDetailsAssignComponent;
  let fixture: ComponentFixture<InputDetailsAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDetailsAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailsAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
