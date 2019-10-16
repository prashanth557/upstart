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
  currentpageIndex: number;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 0;
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
      this.getJobDetails(this.jobId);
    }).catch(err => {
      console.log('Error while fetching LastRun Summary', err);
      this.isSummarResultsLoading = false;
    });
  }

  getJobDetails(jobId) {
    this.jobsService.getKeyWordRelevanceJobDetails(jobId).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Job Details', err);
      this.isLoading = false;
    });
  }

  onPageChange(offset) {
    this.currentpageIndex = offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (offset - 1) * this.limitPerPage;
    this.offsetPage = currentIndex;
    this.isLoading = true;
    this.getJobDetails(this.offsetPage);
  }

}
