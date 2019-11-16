import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCrawlLastrunComponent } from './seller-crawl-lastrun.component';

describe('SellerCrawlLastrunComponent', () => {
  let component: SellerCrawlLastrunComponent;
  let fixture: ComponentFixture<SellerCrawlLastrunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCrawlLastrunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCrawlLastrunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
