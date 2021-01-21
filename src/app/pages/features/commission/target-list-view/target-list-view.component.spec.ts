import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetListViewComponent } from './target-list-view.component';

describe('TargetListViewComponent', () => {
  let component: TargetListViewComponent;
  let fixture: ComponentFixture<TargetListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
