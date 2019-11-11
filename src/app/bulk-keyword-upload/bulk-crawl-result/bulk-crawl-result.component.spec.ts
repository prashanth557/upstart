import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCrawlResultComponent } from './bulk-crawl-result.component';

describe('BulkCrawlResultComponent', () => {
  let component: BulkCrawlResultComponent;
  let fixture: ComponentFixture<BulkCrawlResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkCrawlResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkCrawlResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
