import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
@Component({
  selector: 'app-organic-keyword-run-result',
  templateUrl: './organic-keyword-run-result.component.html',
  styleUrls: ['./organic-keyword-run-result.component.scss']
})
export class OrganicKeywordRunResultComponent implements OnInit {
  jobResults = [
  { jobType: 'Matching Products', count: 0 }, { jobType: 'Extracted Products', count: 0 }, { jobType: 'Branded Prodcuts', count: 0 }  ];
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
    this.getOrganicKeywordSummary();
    this.getDetails(1);
  }

  getOrganicKeywordSummary() {
    this.summaryLoading = true;
    this.jobsService.getOrganicKeywordSummary(this.jobId, this.runId).then( (data: any) => {
      if(data) {
        this.jobResults[0].count = data && data.matchingProducts ? data.matchingProducts : 0;
        this.jobResults[1].count = data && data.extractedProducts ? data.extractedProducts : 0;
        this.jobResults[2].count = data && data.brandProducts ? data.brandProducts : 0;
        this.summaryLoading = false;
      }
    }).catch( (err: any) => {
        this.summaryLoading = false;
    });
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.jobsService.getOrganicRunResults(this.jobId, this.runId, currentPageIndex, this.limitPerPage).then( (data: any) => {
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
