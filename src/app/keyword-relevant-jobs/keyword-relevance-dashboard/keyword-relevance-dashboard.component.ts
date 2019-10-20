import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-keyword-relevance-dashboard',
  templateUrl: './keyword-relevance-dashboard.component.html',
  styleUrls: ['./keyword-relevance-dashboard.component.scss']
})
export class KeywordRelevanceDashboardComponent implements OnInit {

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
    this.jobsService.getSpecificJobDetails(this.jobId).then( data => {
      this.isLoading = false;
      this.keywordInput = data.keywordInput;
    }).catch( err => {
      this.isLoading = false;
      console.log('Error while fetching job details', err);
    });
  }

}
