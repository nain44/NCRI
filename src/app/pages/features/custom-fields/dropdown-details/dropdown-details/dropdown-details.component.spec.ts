import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDetailsComponent } from './dropdown-details.component';

describe('DropdownDetailsComponent', () => {
  let component: DropdownDetailsComponent;
  let fixture: ComponentFixture<DropdownDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
