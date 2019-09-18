import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmonitorLastRunJobDetailsComponent } from './mapmonitor-last-run-job-details.component';

describe('MapmonitorLastRunJobDetailsComponent', () => {
  let component: MapmonitorLastRunJobDetailsComponent;
  let fixture: ComponentFixture<MapmonitorLastRunJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmonitorLastRunJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmonitorLastRunJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
