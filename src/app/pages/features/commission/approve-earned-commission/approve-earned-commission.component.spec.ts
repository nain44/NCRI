import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEarnedCommissionComponent } from './approve-earned-commission.component';

describe('ApproveEarnedCommissionComponent', () => {
  let component: ApproveEarnedCommissionComponent;
  let fixture: ComponentFixture<ApproveEarnedCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEarnedCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEarnedCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
