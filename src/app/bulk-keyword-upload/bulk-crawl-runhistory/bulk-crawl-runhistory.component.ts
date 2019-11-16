import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BulkCrawlService } from '../../services/bulkcrawl.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bulk-crawl-runhistory',
  templateUrl: './bulk-crawl-runhistory.component.html',
  styleUrls: ['./bulk-crawl-runhistory.component.scss']
})
export class BulkKeywordRunHistoryComponent implements OnInit {

  headerTitle: String = 'Job Run History';
  productDetails: any = [];
  actionItems = [{ icon: 'View Result', route: '/keywordset/organicJobList' }];
  // Table Headers
  jobHeaders = ['Run Executed at', 'Status', 'View Result'];
  jobId: any;
  totalItems: number;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  isLoading: boolean;
  showErrorMessage: string;
  constructor(public route: ActivatedRoute, public router: Router, public service: BulkCrawlService) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params['jobId'];
    this.currentpageIndex = 1;
    this.getDetails(this.currentpageIndex);
  }

  getDetails(currentpageIndex) {
    this.isLoading = true;
    this.service.getBulkCrawlRunHistory(this.jobId, currentpageIndex, this.limitPerPage).then((res: any) => {
      if (res) {
        // this.totalItems = res.totalItems;
        this.productDetails = res.items;
        this.isLoading = false;
      } else {
        this.showErrorMessage = 'Not Implemented';
        this.isLoading = false;
      }
    }).catch((err: any) => {
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
      console.log('Error while fetching organic run history', err);
    });
  }
  navigateToTabs(route) {
    this.router.navigate([route]);
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getDetails(this.currentpageIndex);
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3);
  }

  checkStatus(status) {
    return status === 'Successfully Completed' ? 'Success' : 'Failure';
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'created' ? '#2fc6d6' : '#4cae4c' ;
  }

  navigateTo(product) {
    this.router.navigate(['/bulkcrawljobs/' + this.jobId + '/runhistory/' + product.runId]);
  }
}