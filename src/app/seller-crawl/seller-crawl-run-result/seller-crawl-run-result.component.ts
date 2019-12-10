import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { SellerCrawlService } from '../../services/sellercrawl.service';

@Component({
  selector: 'app-seller-crawl-run-result',
  templateUrl: './seller-crawl-run-result.component.html',
  styleUrls: ['./seller-crawl-run-result.component.scss']
})
export class SellerCrawlRunResultComponent implements OnInit {

  jobDetailResponse: any;
  isLoading: boolean;
  jobId: any;
  runId: any;
  totalItems: number;
  productDetails: any = [];
  jobCandidateDetails: any = [];
  items: any = [];
  jobResults: any = [{jobType: 'ASINs Tracked', count: 0}, {jobType: 'Sellers Extracted', count: 0}];
  lastRunSummaryDetails: any;
  headerTitle: String = 'ASINs Seller Data';
  jobHeaders: any = ['seller', 'price', ' Items condition', 'shipping info'];
  showSellersInfo: boolean;
  displaySellerIndex: number;
  showErrorMessage: string;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  isSummarResultsLoading: boolean;
  isExportLoading: boolean = false;
  constructor(public route: ActivatedRoute, public service: SellerCrawlService) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.runId = params['runId'];
      this.getLastRunSummmaryDetails();
      this.getLastRunJobDetails(this.jobId);
    });
  }

  getLastRunSummmaryDetails() {
    this.service.getSellerRunResultSummary(this.jobId, this.runId).then( (res: any) => {
      if(res) {
        this.lastRunSummaryDetails = res;
        this.jobResults[0].count = res && res.trackedAsins ? res.trackedAsins : 0;
        this.jobResults[1].count = res && res.sellersExtracted ? res.sellersExtracted : 0;
      }
      this.isSummarResultsLoading = false;
    });
  }

  getLastRunJobDetails(jobId) {
    this.service.getSellerCrawlRunResults(jobId, this.runId, this.currentpageIndex, this.limitPerPage).then((res: any) => {
      if ( res ) {
        this.jobDetailResponse = res;
        this.items = res && res.items ? res.items : [];
        this.totalItems = this.items.length;
        this.jobCandidateDetails = this.items;
      }
      this.isLoading = false;
    }).catch(err => {
      this.showErrorMessage = err.error.message;
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

  exportCSV() {
    this.isExportLoading = true;
    this.service.exportRunHistory(this.jobId, this.runId).then( (res: any) => {
      console.log('Exported CSV Response ', res);
      this.isExportLoading = false;
      window.location.href = res.fileUrl;
    }).catch((err: any) => {
      this.showErrorMessage = err && err.error && err.error.message ? err.error.message : '';
      this.isExportLoading = false;
    });
  }

}
