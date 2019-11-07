import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-organic-joblist',
  templateUrl: './organic-joblist.component.html',
  styleUrls: ['./organic-joblist.component.scss']
})
export class OrganicJoblistComponent implements OnInit {
  // Banner Results
  jobResults: any = [{jobType: 'Matching products', count: 0},
  {jobType: 'Product data extracted', count: 0}, {jobType: 'Brand Products', count: 0}];
  // Table Headers
  jobHeaders = ['Product Title', 'Description', 'Price', 'User rating', 'Bullet points', 'Number of images', 'By Info'];
  // Table Header title
  headerTitle: String = 'Crawl result for Keyword';
  productDetails: any = [];
  jobId: any;
  totalItems: number;
  isSummarResultsLoading: boolean;
  isLoading: boolean;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  showErrorMessage: String;
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.isSummarResultsLoading = true;
      this.getLastSummaryDetails(this.jobId);
    });
  }

  getLastSummaryDetails(jobId) {
    this.jobsService.getKeyWordRelevanceLastJobSummary(jobId).then((res: any) => {
      this.jobResults[0].count = res.matchingProducts;
      this.jobResults[1].count = res.extractedProducts;
      this.jobResults[2].count = res.brandProducts;
      this.isSummarResultsLoading = false;
      this.getJobDetails(1);
    }).catch( (err) => {
      console.log('Error while fetching LastRun Summary', err);
      this.showErrorMessage = err.error.message;
      this.isSummarResultsLoading = false;
    });
  }

  getJobDetails(currentpageIndex) {
    this.jobsService.getKeyWordRelevanceJobDetails(this.jobId, currentpageIndex, this.limitPerPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Job Details', err);
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
    });
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getJobDetails(this.currentpageIndex);
  }

}
