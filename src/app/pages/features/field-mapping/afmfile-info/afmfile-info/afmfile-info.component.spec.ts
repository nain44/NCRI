import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfmfileInfoComponent } from './afmfile-info.component';

describe('AfmfileInfoComponent', () => {
  let component: AfmfileInfoComponent;
  let fixture: ComponentFixture<AfmfileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfmfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
