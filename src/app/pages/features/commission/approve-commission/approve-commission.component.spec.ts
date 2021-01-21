import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCommissionComponent } from './approve-commission.component';

describe('ApproveCommissionComponent', () => {
  let component: ApproveCommissionComponent;
  let fixture: ComponentFixture<ApproveCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
