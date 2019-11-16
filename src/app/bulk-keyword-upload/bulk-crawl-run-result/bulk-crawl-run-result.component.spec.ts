import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicKeywordRunResultComponent } from './organic-keyword-run-result.component';

describe('OrganicKeywordRunResultComponent', () => {
  let component: OrganicKeywordRunResultComponent;
  let fixture: ComponentFixture<OrganicKeywordRunResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicKeywordRunResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicKeywordRunResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
