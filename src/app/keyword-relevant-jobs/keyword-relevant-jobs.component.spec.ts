import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordRelevantJobsComponent } from './keyword-relevant-jobs.component';

describe('KeywordRelevantJobsComponent', () => {
  let component: KeywordRelevantJobsComponent;
  let fixture: ComponentFixture<KeywordRelevantJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordRelevantJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordRelevantJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
