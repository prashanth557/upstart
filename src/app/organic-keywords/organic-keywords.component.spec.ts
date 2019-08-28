import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicKeywordsComponent } from './organic-keywords.component';

describe('OrganicKeywordsComponent', () => {
  let component: OrganicKeywordsComponent;
  let fixture: ComponentFixture<OrganicKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
