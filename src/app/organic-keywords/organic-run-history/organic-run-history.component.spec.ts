import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicRunHistoryComponent } from './organic-run-history.component';

describe('OrganicRunHistoryComponent', () => {
  let component: OrganicRunHistoryComponent;
  let fixture: ComponentFixture<OrganicRunHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicRunHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicRunHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
