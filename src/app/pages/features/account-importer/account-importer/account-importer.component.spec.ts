import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountImporterComponent } from './account-importer.component';

describe('AccountImporterComponent', () => {
  let component: AccountImporterComponent;
  let fixture: ComponentFixture<AccountImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
