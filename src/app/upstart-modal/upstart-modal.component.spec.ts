import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstartModalComponent } from './upstart-modal.component';

describe('UpstartModalComponent', () => {
  let component: UpstartModalComponent;
  let fixture: ComponentFixture<UpstartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpstartModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpstartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
