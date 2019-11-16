import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-mapmonitor-run-result',
  templateUrl: './mapmonitor-run-result.component.html',
  styleUrls: ['./mapmonitor-run-result.component.scss']
})
export class MapmonitorRunResultComponent implements OnInit {

  jobResults = [{ jobType: 'Crawl Jobs Created', count: 0 },
  { jobType: 'Product Data Extracted', count: 0 }, { jobType: 'Scheduled Crawl Jobs', count: 0 }];
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
  constructor( public jobsService: JobsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params['jobId'];
    this.runId = this.route.snapshot.params['runId'];
    this.getResultSummaryDetails();
    this.getDetails(1);
  }

  getResultSummaryDetails() {
    this.jobsService.getMapResultSummaryDetails(this.jobId, this.runId).then( (data: any) => {
      if(data ) {
        this.jobResults[0].count = data.matchingProducts;
        this.jobResults[1].count = data.extractedProducts;
        this.jobResults[2].count = data.brandProducts;
        this.jobResults[3].count = data.totalRuns;
      }
      this.summaryLoading = false;
    }).catch( (err: any) => {
      this.summaryLoading = false;
    }); 
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.jobsService.getRunHistoryDetails(this.jobId, this.runId, currentPageIndex, this.limitPerPage).then( (data: any) => {
     if (data) {
      this.productDetails = data.items ? data.items : [];
      this.totalItems = data.totalItems;
     }
     this.isLoading = false;
    }).catch((err: any) => {
      this.showErrorMessage = err.error.message;
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
