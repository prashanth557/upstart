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
  currentpageIndex: number;
  isLoading = false;
  jobId: any;
  productDetails: any = [];
  totalItems: number;
  headerTitle: String = 'Candidate ASINs';
  jobHeaders: any = ['ASIN', 'Minimum Adv.Price in $', 'Send email notifications to'];
  offsetPage: number = 0;
  candidateResponse: any;
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.getJobDetails(this.jobId);
    });
  }

  getJobDetails(jobId) {
    this.jobsService.getMapMontiorJobDetails(jobId).then((res: any) => {
      this.candidateResponse = res;
      this.jobResults[0].count = this.candidateResponse.candidateSize;
      this.productDetails = res && res.candidates ? res.candidates : [];
      this.totalItems = this.productDetails ? this.productDetails.length : 0;
      this.productDetails.forEach( product => {
        product.emailList = product && product.emails && product.emails.length > 0 ? product.emails.join(',') : '';
      });
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Job Details', err);
      this.isLoading = false;
    });
  }

  getBackgroundColor(status) {
    return status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  onPageChange(event) {
    this.currentpageIndex = event.offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (event.offset - 1) * event.limitPerPage;
    this.offsetPage = currentIndex;
    this.getJobDetails(this.offsetPage);
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3);
  }

}
