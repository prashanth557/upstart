import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JobsService } from '../../services/jobs.service';
@Component({
  selector: 'app-bulk-crawl-result',
  templateUrl: './bulk-crawl-result.component.html',
  styleUrls: ['./bulk-crawl-result.component.scss']
})
export class BulkCrawlResultComponent implements OnInit {
  // Table Headers
  jobHeaders = ['ASIN', 'Page Url'];
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
  keyword: string;
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.isSummarResultsLoading = true;
      this.getCrawlDetails(this.jobId);
    });
  }


  getCrawlDetails(currentpageIndex) {
    this.jobsService.getBulkCrawlJobDetails(this.jobId, currentpageIndex, this.limitPerPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.candidates;
      this.keyword = res.title;
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
    this.getCrawlDetails(this.currentpageIndex);
  }

}
