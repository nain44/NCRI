import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommissionComponent } from './my-commission.component';

describe('MyCommissionComponent', () => {
  let component: MyCommissionComponent;
  let fixture: ComponentFixture<MyCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
