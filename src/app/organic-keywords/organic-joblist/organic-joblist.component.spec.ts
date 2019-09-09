import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicJoblistComponent } from './organic-joblist.component';

describe('OrganicJoblistComponent', () => {
  let component: OrganicJoblistComponent;
  let fixture: ComponentFixture<OrganicJoblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicJoblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicJoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
