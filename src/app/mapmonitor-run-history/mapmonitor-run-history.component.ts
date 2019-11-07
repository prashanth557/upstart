import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-mapmonitor-run-history',
  templateUrl: './mapmonitor-run-history.component.html',
  styleUrls: ['./mapmonitor-run-history.component.scss']
})
export class MapmonitorRunHistoryComponent implements OnInit {

  jobId: any;
  runHistory: any;
  totalItems: number = 0;
  currentpageIndex: number;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  jobHeaders: any = ['RunId', 'Run Time', 'Status', 'Result'];
  headerTitle: String = 'Map Monitor Run History';
  productDetails: any = [];
  isLoading: boolean;
  showErrorMessage: string;
  constructor(public route: ActivatedRoute, public router: Router, public jobsService: JobsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.jobId = this.route.snapshot.params['jobId'];
    this.getRunHistoryDetails(this.offsetPage);
  }

  getRunHistoryDetails(offsetPage) {
    this.jobsService.getMapMonitorRunHistoryDetails(this.jobId, this.offsetPage, this.limitPerPage).then( (res: any ) => {
      if (res) {
        this.runHistory = res;
        this.productDetails = res && res.items ? res.items : [];
        this.totalItems = this.runHistory.totalItems;
        this.isLoading = false;
      }
    }).catch( err => {
      console.log('Error while run history details', err);
      this.showErrorMessage = 'No run entries available for this job ';
      this.isLoading = true;
    });
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getRunHistoryDetails(this.currentpageIndex);
  }
  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3);
  }

  navigateToRunDetails(jobId) {
    this.router.navigate(['/mapjobslist/' + jobId + '/lastrun']);
  }

}
