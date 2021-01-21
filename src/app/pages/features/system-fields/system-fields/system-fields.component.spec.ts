import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFieldsComponent } from './system-fields.component';

describe('SystemFieldsComponent', () => {
  let component: SystemFieldsComponent;
  let fixture: ComponentFixture<SystemFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
