import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmEditFieldMappingComponent } from './afm-edit-field-mapping.component';

describe('AfmEditFieldMappingComponent', () => {
  let component: AfmEditFieldMappingComponent;
  let fixture: ComponentFixture<AfmEditFieldMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfmEditFieldMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmEditFieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
