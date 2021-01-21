import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMultiTargetComponent } from './assign-multi-target.component';

describe('AssignMultiTargetComponent', () => {
  let component: AssignMultiTargetComponent;
  let fixture: ComponentFixture<AssignMultiTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignMultiTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMultiTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
