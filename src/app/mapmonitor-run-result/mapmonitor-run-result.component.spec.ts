import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmonitorRunResultComponent } from './mapmonitor-run-result.component';

describe('MapmonitorRunResultComponent', () => {
  let component: MapmonitorRunResultComponent;
  let fixture: ComponentFixture<MapmonitorRunResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmonitorRunResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmonitorRunResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
