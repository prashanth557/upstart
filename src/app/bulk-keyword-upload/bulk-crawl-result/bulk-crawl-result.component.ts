import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BulkCrawlService } from '../../services/bulkcrawl.service';
@Component({
  selector: 'app-bulk-crawl-result',
  templateUrl: './bulk-crawl-result.component.html',
  styleUrls: ['./bulk-crawl-result.component.scss']
})
export class BulkCrawlResultComponent implements OnInit {
  jobResults: any = [{jobType: 'Candidate ASINs Count', count: 0},
  {jobType: 'Total Run', count: 0}];
  isLoading = false;
  jobId: any;
  productDetails: any = [];
  totalItems: number;
  headerTitle: String = 'Candidate ASINs';
  jobHeaders: any = ['ASIN', 'Page Url'];
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  candidateResponse: any;
  showErrorMessage: string;
  constructor(public service: BulkCrawlService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.getJobDetails(this.currentpageIndex);
    });
  }

  getJobDetails(currentpageIndex) {
    this.service.getBulkCrawlJobDetails(this.jobId, currentpageIndex, this.limitPerPage).then((res: any) => {
      this.candidateResponse = res;
      this.jobResults[0].count = this.candidateResponse && this.candidateResponse.candidateSize ? this.candidateResponse.candidateSize : 0;
      this.jobResults[1].count = this.candidateResponse && this.candidateResponse.totalRuns ? this.candidateResponse.totalRuns : 0;
      this.productDetails = res && res.candidates ? res.candidates : [];
      this.totalItems = this.productDetails ? this.productDetails.length : 0;
      this.productDetails.forEach( product => {
        product.emailList = product && product.emails && product.emails.length > 0 ? product.emails.join(',') : '';
      });
      this.isLoading = false;
    }).catch( (err: any) => {
      console.log('Error while fetching map monitor job detais', err);
      if (err.status === 400) {
        this.showErrorMessage = 'Monitor Job Id ' + this.jobId + ' not found';
      } else if (err.status === 412) {
        this.showErrorMessage = 'No run entries available for this job ' + this.jobId;
      } else if (err.status === 500) {
        this.showErrorMessage = 'Oops something went wront. Please try after a while';
      }
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
    });
  }

  getBackgroundColor(status) {
    return status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getJobDetails(this.currentpageIndex);
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3);
  }

}
