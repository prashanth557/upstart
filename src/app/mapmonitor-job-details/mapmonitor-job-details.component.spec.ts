import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmonitorJobDetailsComponent } from './mapmonitor-job-details.component';

describe('MapmonitorJobDetailsComponent', () => {
  let component: MapmonitorJobDetailsComponent;
  let fixture: ComponentFixture<MapmonitorJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmonitorJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmonitorJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
