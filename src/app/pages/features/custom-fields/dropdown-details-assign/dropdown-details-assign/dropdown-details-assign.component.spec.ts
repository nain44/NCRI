import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDetailsAssignComponent } from './dropdown-details-assign.component';

describe('DropdownDetailsAssignComponent', () => {
  let component: DropdownDetailsAssignComponent;
  let fixture: ComponentFixture<DropdownDetailsAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownDetailsAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownDetailsAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
