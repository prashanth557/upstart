import { Component, OnInit} from '@angular/core';
import { BulkCrawlService } from '../../services/bulkcrawl.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bulk-crawl-lastrun',
  templateUrl: './bulk-crawl-lastrun.component.html',
  styleUrls: ['./bulk-crawl-lastrun.component.scss']
})
export class BulkKeywordLastRunComponent implements OnInit {

  jobDetailResponse: any;
  isLoading: boolean;
  jobId: any;
  totalItems: number;
  productDetails: any = [];
  jobCandidateDetails: any = [];
  items: any = [];
  jobResults: any = [{jobType: 'Matching Products', count: 0}, {jobType: 'Total Runs', count: 0}];
  lastRunSummaryDetails: any;
  headerTitle: String = 'Product Crawl Job Results';
  jobHeaders = ['Product Title', 'Description', 'Price', 'User rating', 'Bullet points', 'Number of images', 'By Info'];
  showSellersInfo: boolean;
  displaySellerIndex: number;
  showErrorMessage: string;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  isSummarResultsLoading: boolean;
  constructor(public route: ActivatedRoute, public service: BulkCrawlService) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.getLastRunSummmaryDetails();
      this.getLastRunJobDetails(this.jobId);
    });
  }

  getLastRunSummmaryDetails() {
    this.service.getBulkCrawlLastRunSummarDetails(this.jobId).then( (res: any) => {
      this.lastRunSummaryDetails = res;
      this.jobResults[0].count = this.lastRunSummaryDetails && this.lastRunSummaryDetails.matchingProducts ? this.lastRunSummaryDetails.matchingProducts : 0;
      this.jobResults[1].count = this.lastRunSummaryDetails && this.lastRunSummaryDetails.brandProducts ?
      this.lastRunSummaryDetails.brandProducts : 0;
      this.jobResults[2].count = this.lastRunSummaryDetails && this.lastRunSummaryDetails.extractedProducts ?
      this.lastRunSummaryDetails.extractedProducts : 0;
      this.jobResults[3].count = this.lastRunSummaryDetails && this.lastRunSummaryDetails.totalRuns ?
      this.lastRunSummaryDetails.totalRuns : 0;
      this.isSummarResultsLoading = false;
    });
  }

  getLastRunJobDetails(jobId) {
    this.service.getBulkCrawlLastRunJobDetails(jobId).then((res: any) => {
      if ( res ) {
        this.jobDetailResponse = res && res.items ? res.items : [];
        this.totalItems = res.totalItems;
        this.jobCandidateDetails = this.items;
      }
      this.isLoading = false;
    }).catch(err => {
      this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
      ( err.statusText ? err.statusText : 'Please try after some time' );
      this.isLoading = false;
      console.log('Error while fetching Job Details', err);
      // this.isLoading = false;
    });
  }

  getSellerInfo(index) {
    this.showSellersInfo = !this.showSellersInfo;
    this.displaySellerIndex = index;
    this.productDetails = this.jobCandidateDetails[index].sellers;
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3 );
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getLastRunJobDetails(this.currentpageIndex);
  }

  getBackgroundColor(status) {
    return status && status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }
}