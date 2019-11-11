import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import { TopNotificationComponent } from '../top-notification/top-notification.component';

@Component({
  selector: 'app-bulk-keyword-upload',
  templateUrl: './bulk-keyword-upload.component.html',
  styleUrls: ['./bulk-keyword-upload.component.scss']
})
export class BulkKeywordUploadComponent implements OnInit {
  @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  // Banner Results
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
  headerTitle: String = 'Bulk Crawl Jobs';
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  modalTitle: String = 'Upload Bulk keywords';
  createNewJob: boolean;
  totalItems: number;
  isLoading: boolean;
  jobTitle: string;
  fileToUpload: File;
  fileName: any;
  jobCreated: boolean;
  showError: boolean;
  showErrorMessage: string;
  jobCreationError: string;
  selectedProduct: any;
  showConfirmation: boolean;
  constructor(public jobsService: JobsService, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.getDetails(1);
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
    this.jobsService.getBulkPageList(currentPageIndex, this.limitPerPage).then( (res: any) => {
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
     this.router.navigate(['/bulkcrawljobs/' + product.id]);
    } else if (index === 1) {
      this.deleteConfirmation(product);
    }
  }

  createNewMapJob() {
    // this.createNewJob = true;
    if (this.jobTitle && this.fileName) {
      this.jobsService.createBulkJobs(this.jobTitle, this.fileToUpload).then((res: any) => {
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

  // runJob(productId) {
  //   this.jobsService.runJob(productId, 'mapmonitorjobs').then((res: any) => {
  //     const message: String = 'Your Job is added to queue for run.';
  //     this.notification.displayNotification(true, true, message);
  //     setTimeout(() => {
  //       this.notification.displayNotification(false, true, '');
  //       this.getDetails(1);
  //     }, 5000);
  //   }).catch(error => {
  //     console.log('Error while running the job' + productId + error);
  //     const message: String = 'Error while running the job. Please try after sometime.';
  //     this.notification.displayNotification(true, false, message);
  //     setTimeout(() => {
  //       this.notification.displayNotification(false, false, '');
  //     }, 5000);
  //   });
  // }

  deleteJob() {
    this.jobsService.deleteJob(this.selectedProduct.id, 'bulkproductcrawls').then((res: any) => {
      const message: String = 'Your request for delete record is successfully deleted.';
      this.notification.displayNotification(true, true, message);
      this.getDetails(1);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
      }, 5000);
    }, err => {
      const message: String = 'Erorr while deleting the record. Please try after sometime';
      this.notification.displayNotification(true, false, message);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
      }, 5000);
    });
  }

  deleteConfirmation(product) {
    this.selectedProduct = product;
    this.showConfirmation = true;
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
