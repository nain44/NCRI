import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountImporterComponent } from './edit-account-importer.component';

describe('EditAccountImporterComponent', () => {
  let component: EditAccountImporterComponent;
  let fixture: ComponentFixture<EditAccountImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
