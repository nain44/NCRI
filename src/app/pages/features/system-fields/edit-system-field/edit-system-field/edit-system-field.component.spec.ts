import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemFieldComponent } from './edit-system-field.component';

describe('EditSystemFieldComponent', () => {
  let component: EditSystemFieldComponent;
  let fixture: ComponentFixture<EditSystemFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSystemFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSystemFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
