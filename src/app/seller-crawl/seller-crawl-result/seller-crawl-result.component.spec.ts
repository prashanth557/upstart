import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCrawlResultComponent } from './seller-crawl-result.component';

describe('SellerCrawlResultComponent', () => {
  let component: SellerCrawlResultComponent;
  let fixture: ComponentFixture<SellerCrawlResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCrawlResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCrawlResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
