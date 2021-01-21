import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterDashboardComponent } from './importer-dashboard.component';

describe('ImporterDashboardComponent', () => {
  let component: ImporterDashboardComponent;
  let fixture: ComponentFixture<ImporterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
