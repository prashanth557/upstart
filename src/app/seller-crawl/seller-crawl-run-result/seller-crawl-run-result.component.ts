import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { SellerCrawlService } from '../../services/sellercrawl.service';

@Component({
  selector: 'app-seller-crawl-run-result',
  templateUrl: './seller-crawl-run-result.component.html',
  styleUrls: ['./seller-crawl-run-result.component.scss']
})
export class SellerCrawlRunResultComponent implements OnInit {

  jobResults = [{ jobType: 'Matching Products', count: 0 },
  { jobType: 'Products Extracted', count: 0 }, { jobType: 'Branded Products', count: 0 }, {jobType: 'Total Runs', count: 0}];
  jobHeaders = ['Product Title', 'Description', 'Price', 'User Rating', 'Bullet Points', 'No. of images', 'By Info'];
  jobId: any;
  runId: any;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  totalItems: number;
  showErrorMessage: String;
  productDetails: any = [];
  isLoading: boolean;
  summaryLoading: boolean;
  constructor( public service: SellerCrawlService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params['jobId'];
    this.runId = this.route.snapshot.params['runId'];
    this.getLastRunSummaryDetails();
    this.getDetails(1);
  }

  getLastRunSummaryDetails(){
    this.summaryLoading  = true;
    this.service.getSellerRunResultSummary(this.jobId, this.runId).then((data: any) => {
        this.jobResults[0].count = data.matchingProducts;
        this.jobResults[1].count = data.extractedProducts;
        this.jobResults[2].count = data.brandProducts;
        this.jobResults[3].count = data.totalRuns;
        this.summaryLoading = false;
    }).catch( (err: any) => {
       this.summaryLoading = false;
    });
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.service.getSellerCrawlRunResults(this.jobId, this.runId, currentPageIndex, this.limitPerPage).then( (data: any) => {
     if (data) {
      this.productDetails = data.items ? data.items : [];
      this.totalItems = data.totalItems;
     }
     this.isLoading = false;
    }).catch((err: any) => {
      this.showErrorMessage = err && err.error && err.error.message  ?  err.error.message : 'No seller results available for job.';
      this.isLoading = false;
    });
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getDetails(this.currentpageIndex);
  }

}
