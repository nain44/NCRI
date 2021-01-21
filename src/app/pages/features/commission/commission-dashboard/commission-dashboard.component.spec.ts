import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionDashboardComponent } from './commission-dashboard.component';

describe('CommissionDashboardComponent', () => {
  let component: CommissionDashboardComponent;
  let fixture: ComponentFixture<CommissionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
