import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmEditFileInfoComponent } from './afm-edit-file-info.component';

describe('AfmEditFileInfoComponent', () => {
  let component: AfmEditFileInfoComponent;
  let fixture: ComponentFixture<AfmEditFileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfmEditFileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmEditFileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
