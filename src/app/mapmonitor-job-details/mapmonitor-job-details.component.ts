import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-mapmonitor-job-details',
  templateUrl: './mapmonitor-job-details.component.html',
  styleUrls: ['./mapmonitor-job-details.component.scss']
})
export class MapmonitorJobDetailsComponent implements OnInit {
  jobResults: any = [{jobType: 'Candidate ASINs Count', count: 0},
  {jobType: 'Total Run', count: 0}];
  isLoading = false;
  jobId: any;
  productDetails: any = [];
  totalItems: number;
  headerTitle: String = 'Candidate ASINs';
  jobHeaders: any = ['ASIN', 'Minimum Adv.Price in $', 'Send email notifications to'];
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  candidateResponse: any;
  showErrorMessage: string;
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public router: Router) { }

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
    this.jobsService.getMapMontiorJobDetails(this.jobId, currentpageIndex, this.limitPerPage).then((res: any) => {
      this.candidateResponse = res;
      this.jobResults[0].count = this.candidateResponse.candidateSize;
      this.productDetails = res && res.candidates ? res.candidates : [];
      this.totalItems = this.productDetails ? this.productDetails.length : 0;
      this.productDetails.forEach( product => {
        product.emailList = product && product.emails && product.emails.length > 0 ? product.emails.join(',') : '';
      });
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching map monitor job detais', err);
      // if (err.status === 400) {
      //   this.showErrorMessage = 'Monitor Job Id ' + this.jobId + ' not found';
      // } else if (err.status === 412) {
      //   this.showErrorMessage = 'No run entries available for this job ' + this.jobId;
      // } else if (err.status === 500) {
      //   this.showErrorMessage = 'Oops something went wront. Please try after a while';
      // }
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
    });
  }

  getBackgroundColor(status) {
    return status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  onPageChange(event) {
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
