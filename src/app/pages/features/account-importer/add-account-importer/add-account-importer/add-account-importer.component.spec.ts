import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountImporterComponent } from './add-account-importer.component';

describe('AddAccountImporterComponent', () => {
  let component: AddAccountImporterComponent;
  let fixture: ComponentFixture<AddAccountImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
