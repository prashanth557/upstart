import { Component, ContentChild, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { TopNotificationComponent } from '../top-notification/top-notification.component';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-keyword-relevant-jobs',
  templateUrl: './keyword-relevant-jobs.component.html',
  styleUrls: ['./keyword-relevant-jobs.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class KeywordRelevantJobsComponent implements OnInit {
  @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  jobResults = [{ jobType: 'Crawl Jobs Created', count: 22 },
  { jobType: 'Product Data Extracted', count: 1239 }, { jobType: 'Scheduled Crawl Jobs', count: '07' }];
  totalItems: number;
  // Glyphicon images to be displayed at actions section in table
  actionItems = [{ icon: 'glyphicon-flash' },
  { icon: 'glyphicon-eye-open' },
  { icon: 'glyphicon-th-large' },
  { icon: 'glyphicon-trash' },
  ];
  productDetails: any = [];
  // Table Headers
  jobHeaders = ['Job Title', 'Keyword Input', 'Status', 'Last Run At', 'Created At', 'Created By', 'Vendor Name', 'Quick Actions'];
  // Table Header title
  headerTitle: String = 'Keyword Relevance Jobs';
  createNewKeyword: boolean;
  modalTitle: String = 'Add New Keyword Relevance Job';
  // Required for Pagination
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  isLoading: boolean;
  keywordInput: string;
  jobTitle: string;
  keywordInputType: any;
  jobCreated: boolean;
  showErrorMessage: string;
  constructor(public jobsService: JobsService, public router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.getDetails(this.currentpageIndex);
  }

  addNewKeyword(event) {
    if (event) {
      this.createNewKeyword = true;
    }
  }

  addKeywords() {
    this.jobsService.createKeywordJob(this.keywordInput, this.jobTitle).then((res: any) => {
      if (res) {
        this.jobCreated = true;
        // this.createNewKeyword = false;
        this.getDetails(1);
        setTimeout(function() {
          $('#create-modal1').modal('hide');
      }, 3000);
      }
    });
  }

  navigateTo(product, index) {
    console.log('Index', index);
    if (index === 0) {
      this.runJob(product.id);
    } else if (index === 1) {
      this.router.navigate(['/keywordjoblist/' + product.id]);
    } else if (index === 2) {
      this.router.navigate(['/keywordjoblist/' + product.id + '/dashboard']);
    } else if (index === 3) {
      this.deleteJob(product.id);
    }
  }

  deleteJob(productId) {
    this.jobsService.deleteJob(productId, 'kwdrelvncjobs').then((res: any) => {
      const message: String = 'Your request for delete record is successfully deleted.';
      this.notification.displayNotification(true, true, message);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
        this.getDetails(1);
      }, 3000);
    }, err => {
      const message: String = 'Erorr while deleting the record. Please try after sometime';
      this.notification.displayNotification(true, false, message);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
      }, 3000);
    });
  }

  onPageChange(event) {
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getDetails(this.currentpageIndex);
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.jobsService.getAllKeywordRelevanceJobDetails(currentPageIndex, this.limitPerPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Keyword Relevance Job Details', err);
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
    });
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  runJob(productId) {
    this.jobsService.runJob(productId, 'kwdrelvncjobs').then((res: any) => {
      const message: String = 'Your Job is added to queue for run.';
      this.notification.displayNotification(true, true, message);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
        this.getDetails(1);
      }, 5000);
    }).catch(error => {
      console.log('Error while running the job' + productId + error);
      const message: String = 'Your Job running is not successfull.';
      this.notification.displayNotification(true, false, message);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
        this.getDetails(1);
      }, 5000);
    });
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3);
  }

}
