import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCommissionDashboardComponent } from './approve-commission-dashboard.component';

describe('ApproveCommissionDashboardComponent', () => {
  let component: ApproveCommissionDashboardComponent;
  let fixture: ComponentFixture<ApproveCommissionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCommissionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCommissionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
