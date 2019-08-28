import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicSummaryDashboardComponent } from './organic-summary-dashboard.component';

describe('OrganicSummaryDashboardComponent', () => {
  let component: OrganicSummaryDashboardComponent;
  let fixture: ComponentFixture<OrganicSummaryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicSummaryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicSummaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
