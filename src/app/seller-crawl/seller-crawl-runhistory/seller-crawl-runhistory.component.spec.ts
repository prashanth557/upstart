import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCrawlRunhistoryComponent } from './seller-crawl-runhistory.component';

describe('SellerCrawlRunhistoryComponent', () => {
  let component: SellerCrawlRunhistoryComponent;
  let fixture: ComponentFixture<SellerCrawlRunhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCrawlRunhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCrawlRunhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
