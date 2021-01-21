import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogoComponent } from './change-logo.component';

describe('ChangeLogoComponent', () => {
  let component: ChangeLogoComponent;
  let fixture: ComponentFixture<ChangeLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
