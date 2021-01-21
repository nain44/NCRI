import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollbackStatusComponent } from './rollback-status.component';

describe('RollbackStatusComponent', () => {
  let component: RollbackStatusComponent;
  let fixture: ComponentFixture<RollbackStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollbackStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollbackStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
