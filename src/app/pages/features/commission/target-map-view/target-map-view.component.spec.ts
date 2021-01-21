import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetMapViewComponent } from './target-map-view.component';

describe('TargetMapViewComponent', () => {
  let component: TargetMapViewComponent;
  let fixture: ComponentFixture<TargetMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
