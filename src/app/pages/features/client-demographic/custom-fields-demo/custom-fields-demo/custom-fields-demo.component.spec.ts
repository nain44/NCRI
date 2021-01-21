import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldsDemoComponent } from './custom-fields-demo.component';

describe('CustomFieldsDemoComponent', () => {
  let component: CustomFieldsDemoComponent;
  let fixture: ComponentFixture<CustomFieldsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFieldsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
