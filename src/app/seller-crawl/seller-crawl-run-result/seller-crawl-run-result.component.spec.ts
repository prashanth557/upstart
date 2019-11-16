import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCrawlRunResultComponent } from './seller-crawl-run-result.component';

describe('SellerCrawlRunResultComponent', () => {
  let component: SellerCrawlRunResultComponent;
  let fixture: ComponentFixture<SellerCrawlRunResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCrawlRunResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCrawlRunResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
