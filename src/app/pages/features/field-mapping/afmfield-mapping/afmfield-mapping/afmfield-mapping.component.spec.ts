import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmfieldMappingComponent } from './afmfield-mapping.component';

describe('AfmfieldMappingComponent', () => {
  let component: AfmfieldMappingComponent;
  let fixture: ComponentFixture<AfmfieldMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfmfieldMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmfieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
