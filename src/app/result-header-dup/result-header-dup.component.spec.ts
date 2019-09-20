import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHeaderDupComponent } from './result-header-dup.component';

describe('ResultHeaderDupComponent', () => {
  let component: ResultHeaderDupComponent;
  let fixture: ComponentFixture<ResultHeaderDupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultHeaderDupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHeaderDupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
