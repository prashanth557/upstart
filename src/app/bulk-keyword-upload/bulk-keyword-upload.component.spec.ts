import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkKeywordUploadComponent } from './bulk-keyword-upload.component';

describe('BulkKeywordUploadComponent', () => {
  let component: BulkKeywordUploadComponent;
  let fixture: ComponentFixture<BulkKeywordUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkKeywordUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkKeywordUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
