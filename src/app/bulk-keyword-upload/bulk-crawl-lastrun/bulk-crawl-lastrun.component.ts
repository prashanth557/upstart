import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BulkCrawlService } from '../../services/bulkcrawl.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bulk-crawl-lastrun',
  templateUrl: './bulk-crawl-lastrun.component.html',
  styleUrls: ['./bulk-crawl-lastrun.component.scss']
})
export class BulkKeywordLastRunComponent implements OnInit {

    jobId: string;
    isLoading: boolean;
    productDetails: any = [];
    items: any = [];
    totalItems: number;
    jobCandidateDetails: any = [];
    showErrorMessage: string;
    jobResults: any = [{jobType: 'Matching products', count: 0},
    {jobType: 'Product data extracted', count: 0}, {jobType: 'Brand Products', count: 0}];
   isSummarResultsLoading: boolean;

    constructor(public route: ActivatedRoute, public service: BulkCrawlService) { }
    ngOnInit() {
        this.isLoading = true;
        this.route.params
        .subscribe((params: any) => {
        this.jobId = params['jobId'];
        this.getLastRunSummaryDetails();
        this.getLastRunJobDetails(this.jobId);
        });
    }

    getLastRunSummaryDetails() {
      this.service.getBulkCrawlLastRunSummarDetails(this.jobId).then( (res: any) => {
        if(res) {
          this.jobResults[0].count = res.matchingProducts;
          this.jobResults[1].count = res.extractedProducts;
          this.jobResults[2].count = res.brandProducts;
          this.isSummarResultsLoading = false;
        }
      }).catch( (err:any) => {
         this.showErrorMessage = err && err.error && err.error.message ? err.error.message : 'No Results Found';
         this.isSummarResultsLoading = false;
         console.log('Error while fetching Summary Details', err);
      });
    }

    getLastRunJobDetails(jobId) {
        this.service.getBulkCrawlLastRunJobDetails(jobId).then((res: any) => {
          if ( res ) {
            this.productDetails = res;
            this.items = res && res.items ? res.items : [];
            this.totalItems = this.items.length;
            this.jobCandidateDetails = this.items;
          }
          this.isLoading = false;
        }).catch(err => {
          this.showErrorMessage = err.error.message;
          this.isLoading = false;
          console.log('Error while fetching Job Details', err);
        });
      }
}