import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRunScheduleComponent } from './auto-run-schedule.component';

describe('AutoRunScheduleComponent', () => {
  let component: AutoRunScheduleComponent;
  let fixture: ComponentFixture<AutoRunScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoRunScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRunScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
