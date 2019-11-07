import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  { jobType: 'Product being tracked', count: 0 }, { jobType: 'MAP breaches recorded', count: 0 }];
  actionItems = [{icon: 'glyphicon-flash'},
  {icon: 'glyphicon-list-alt'},
  {icon: 'glyphicon-tasks'},
  {icon: 'glyphicon-time'},
  {icon: 'glyphicon-trash'},
];
  // Table Headers
  jobHeaders = ['Job Title', 'Status', 'Last Run At', 'Created At', 'Created By', 'Vendor Name', 'Quick Actions'];
  productDetails: any = [];
  // Table Header title
  headerTitle: String = 'MAP Breach Crawl Jobs';
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  modalTitle: String = 'Add New Map Montior Crawl Job';
  createNewJob: boolean;
  totalItems: number;
  isLoading: boolean;
  isMapSummaryLoading: boolean;
  jobTitle: string;
  fileToUpload: File;
  fileName: any;
  jobCreated: boolean;
  showError: boolean;
  showErrorMessage: string;
  jobCreationError: string;
  constructor(public jobsService: JobsService, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.isMapSummaryLoading = true;
    this.getMapSummaryDetails();
  }

  getMapSummaryDetails() {
    this.isLoading = true;
    this.jobsService.getMapMonitorSummary().then( (res: any) => {
      this.jobResults[0].count = res.totalJobs;
      this.jobResults[1].count = res.produtsTracked;
      this.jobResults[2].count = res.mapBreaches;
      this.isMapSummaryLoading = false;
      this.getDetails(this.currentpageIndex);
    });
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getDetails(this.currentpageIndex);
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.jobsService.getAllMapMontiorJobDetails(currentPageIndex, this.limitPerPage).then( (res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch((err: any) => {
      this.showErrorMessage = err.error.message;
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
      this.router.navigate(['/mapjobslist/' + product.id + '/runhistory']);
    } else if (index === 4) {
      this.deleteJob(product.id);
    }
  }

  createNewMapJob() {
    // this.createNewJob = true;
    if (this.jobTitle && this.fileName) {
      this.jobsService.createMapMonitorJob(this.jobTitle, this.fileToUpload).then((res: any) => {
        if (res) {
          console.log('response', res);
          this.jobCreated = true;
          this.getDetails(1);
        } else {
          this.jobCreationError = 'Failed to parse some entries in the input file. Please try again.';
        }
      }).catch((err: any) => {
        this.jobCreationError = err.error.message;
      });
    } else {
     this.showError = true;
    }
  }

  closeModal() {
    this.createNewJob = false;
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  runJob(productId) {
    this.jobsService.runJob(productId, 'mapmonitorjobs').then((res: any) => {
      const message: String = 'Your Job is added to queue for run.';
      this.notification.displayNotification(true, true, message);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
        this.getDetails(1);
      }, 5000);
    }).catch(error => {
      console.log('Error while running the job' + productId + error);
      const message: String = 'Error while running the job. Please try after sometime.';
      this.notification.displayNotification(true, false, message);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
      }, 5000);
    });
  }

  deleteJob(productId) {
    this.jobsService.deleteJob(productId, 'mapmonitorjobs').then((res: any) => {
      const message: String = 'Your request for delete record is successfully deleted.';
      this.notification.displayNotification(true, true, message);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
        this.getDetails(1);
      }, 5000);
    }, err => {
      const message: String = 'Erorr while deleting the record. Please try after sometime';
      this.notification.displayNotification(true, false, message);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
      }, 5000);
    });
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3 );
  }

  addNewKeyword(event) {
    if (event) {
      this.resetFields();
    }
  }

  resetFields() {
    this.createNewJob = true;
    this.jobCreated = false;
    this.jobTitle = '';
    this.fileName = '';
    this.jobCreationError = '';
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileName = this.fileToUpload.name;
    // this.fileName = files.item(0);
}

}
