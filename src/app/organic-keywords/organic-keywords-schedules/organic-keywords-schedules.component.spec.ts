import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicKeywordsSchedulesComponent } from './organic-keywords-schedules.component';

describe('OrganicKeywordsSchedulesComponent', () => {
  let component: OrganicKeywordsSchedulesComponent;
  let fixture: ComponentFixture<OrganicKeywordsSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicKeywordsSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicKeywordsSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
