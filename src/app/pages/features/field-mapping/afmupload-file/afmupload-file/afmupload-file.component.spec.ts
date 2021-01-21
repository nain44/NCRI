import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmuploadFileComponent } from './afmupload-file.component';

describe('AfmuploadFileComponent', () => {
  let component: AfmuploadFileComponent;
  let fixture: ComponentFixture<AfmuploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfmuploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmuploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
