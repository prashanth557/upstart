import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-mapmonitor-job-details',
  templateUrl: './mapmonitor-job-details.component.html',
  styleUrls: ['./mapmonitor-job-details.component.scss']
})
export class MapmonitorJobDetailsComponent implements OnInit {
  jobResults: any = [{jobType: 'Candidate ASINs Count', count: 10},
  {jobType: 'Total Run', count: 0}];
  currentpageIndex: number;
  isLoading = false;
  jobId: any;
  productDetails: any = [];
  totalItems: number;
  headerTitle: String = 'Candidate ASINs';
  jobHeaders: any = ['ASIN', 'Minimum Adv.Price in $', 'Send email notifications to'];
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
      this.totalItems = res && res.totalItems ? res.totalItems : 10;
      this.productDetails = res && res.candidates ? res.candidates : [];
      this.productDetails.forEach( product => {
        product.emailList = product.emails.join(',');
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

}
