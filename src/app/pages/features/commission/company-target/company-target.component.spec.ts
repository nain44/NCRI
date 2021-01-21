import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTargetComponent } from './company-target.component';

describe('CompanyTargetComponent', () => {
  let component: CompanyTargetComponent;
  let fixture: ComponentFixture<CompanyTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
