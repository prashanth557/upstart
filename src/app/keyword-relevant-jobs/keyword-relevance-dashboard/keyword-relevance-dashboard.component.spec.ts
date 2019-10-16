import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordRelevanceDashboardComponent } from './keyword-relevance-dashboard.component';

describe('KeywordRelevanceDashboardComponent', () => {
  let component: KeywordRelevanceDashboardComponent;
  let fixture: ComponentFixture<KeywordRelevanceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordRelevanceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordRelevanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
