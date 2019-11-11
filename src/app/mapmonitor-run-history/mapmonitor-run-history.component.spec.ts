import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmonitorRunHistoryComponent } from './mapmonitor-run-history.component';

describe('MapmonitorRunHistoryComponent', () => {
  let component: MapmonitorRunHistoryComponent;
  let fixture: ComponentFixture<MapmonitorRunHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmonitorRunHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmonitorRunHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
