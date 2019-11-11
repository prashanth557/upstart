import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from '../../canvasjs.min';
import { ChartsModule } from 'ng2-charts';
import { JobsService } from '../../services/jobs.service';


@Component({
  selector: 'app-organic-summary-dashboard',
  templateUrl: './organic-summary-dashboard.component.html',
  styleUrls: ['./organic-summary-dashboard.component.scss']
})
export class OrganicSummaryDashboardComponent implements OnInit {

  jobId: any;
  keywordInput: String;
  isLoading: boolean;
  constructor(private route: ActivatedRoute, public router: Router, public jobsService: JobsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    this.getKeywordInput();
  }

  getKeywordInput() {
    this.jobsService.getSpecificOrganicJobDetails(this.jobId).then( data => {
      this.isLoading = false;
      this.keywordInput = data.keyword;
    }).catch( err => {
      this.isLoading = false;
      console.log('Error while fetching job details', err);
    });
  }

}
