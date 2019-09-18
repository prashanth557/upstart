import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingindicatorComponent } from './loadingindicator.component';

describe('LoadingindicatorComponent', () => {
  let component: LoadingindicatorComponent;
  let fixture: ComponentFixture<LoadingindicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingindicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
