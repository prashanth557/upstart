import { Component, OnInit, ViewChild} from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import { TopNotificationComponent } from '../top-notification/top-notification.component';

@Component({
  selector: 'app-monitor-jobs',
  templateUrl: './monitor-jobs.component.html',
  styleUrls: ['./monitor-jobs.component.scss']
})
export class MonitorJobsComponent implements OnInit {
  @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  // Banner Results
  jobResults: any = [{ jobType: 'Jobs Created', count: 0 },
  { jobType: 'Product being tracked', count: 0 }, { jobType: 'MAP breached recorded', count: 0 }];
  actionItems = [{icon: 'glyphicon-flash'},
  {icon: 'glyphicon-list-alt'},
  {icon: 'glyphicon-tasks'},
  {icon: 'glyphicon-time'},
  {icon: 'glyphicon-trash'},
];
  // Table Headers
  jobHeaders = ['Job Title', 'Status', 'Last Run At', 'Created At', 'Quick Actions'];
  productDetails: any = [];
  // Table Header title
  headerTitle: String = 'MAP Breach Crawl Jobs';
  currentpageIndex: number;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  modalTitle: String = 'Add New Map Montior Crawl Job';
  createNewJob: boolean;
  totalItems: number;
  isLoading: boolean;
  isMapSummaryLoading: boolean;
  constructor(public jobsService: JobsService, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.isMapSummaryLoading = true;
    this.getMapSummaryDetails();
  }

  getMapSummaryDetails() {
    this.jobsService.getMapMonitorSummary().then( (res: any) => {
      this.jobResults[0].count = res.totalJobs;
      this.jobResults[1].count = res.productsTracked;
      this.jobResults[2].count = res.mapBreaches;
      this.isMapSummaryLoading = false;
      this.getDetails(this.currentpageIndex);
    });
  }

  onPageChange(event) {
    this.currentpageIndex = event.offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (event.offset - 1) * event.limitPerPage;
    this.offsetPage = currentIndex;
    this.getDetails(this.offsetPage);
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.jobsService.getAllMapMontiorJobDetails().then( (res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    });
  }

  navigateTo(product, index) {
    console.log('Index', index);
    if (index === 0 ) {
      this.runJob(product.id);
    } else if (index === 1) {
      this.router.navigate(['/mapjobslist/' + product.id]);
    } else if (index === 2) {
      this.router.navigate(['/mapjobslist/' + product.id + '/lastrun']);
    } else if (index === 3) {
      // this.deleteJob(product.id);
    } else if (index === 4) {
      this.deleteJob(product.id);
    }
  }

  createNewMapJob() {
    this.createNewJob = true;
  }

  closeModal() {
    this.createNewJob = false;
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  runJob(productId) {
      const message: string = 'Your request for running job ( Job Id : ' + productId + ' ) is successfully processed.';
      this.notification.displayNotification(true, true, message);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
      }, 5000);
    // this.jobsService.runJob(productId, 'mapmonitorjobs').then( (res: any) => {
    //   const message: string = 'Your request for running job ( Job Id : ' + productId + ' ) is successfully processed.';
    //   this.notification.displayNotification(true, true, message);
    //   setTimeout(() => {
    //     this.notification.displayNotification(false, true, '');
    //   }, 5000);
    // }).catch( error => {
    //   console.log('Error while running the job' + productId + error);
    // });
  }

  deleteJob(productId) {
    this.jobsService.deleteJob(productId).then( (res: any) => {
      const message: string = 'Your request for delete record ( Job Id : ' + productId + ' ) is successfully deleted.';
      this.notification.displayNotification(true, true, message);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
        this.getDetails(this.offsetPage);
      }, 5000);
    }).catch(err => {
      console.log('Error while deleting the Job', err);
    });
  }

}
