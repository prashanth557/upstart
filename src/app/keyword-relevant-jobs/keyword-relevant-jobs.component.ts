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
  keywordType: string;
  jobCreated: boolean;
  showErrorMessage: string;
  showError: boolean;
  choices: any = ['Direct text input', 'Select from organic keywords'];
  defaultChoice = 'Direct text input';
  // Delete Confirmation Variables
  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: String = 'Are you sure?';
  popoverMessage: String = 'Are you really <b>sure</b> you want to do this?';
  confirmText: String = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: String = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
  showConfirmation: boolean = false;
  selectedProduct: any;
  organicKeywordsList: any;
  allOrganicKeywords: any = [];
  showOrganicKeywords: boolean;
  selectedOrganicKeyword: any;
  selectedOrganicKeywordName: any;
  jobCreationLoader: boolean;
  constructor(public jobsService: JobsService, public router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.getOrganicKeywordsList();
    this.getDetails(this.currentpageIndex);
  }

  addNewKeyword(event) {
    if (event) {
      this.resetFields();
      this.showError = false;
      this.createNewKeyword = true;
      this.jobCreated = false;
    }
  }

  resetFields() {
    this.showError = false;
    this.createNewKeyword = true;
    this.jobCreated = false;
    this.jobTitle = '';
    this.keywordInput = '';
    this.keywordType = 'Direct text input';
    this.defaultChoice = 'Direct text input';
    this.showConfirmation = false;
    this.showOrganicKeywords = false;
    this.selectedProduct = {};
  }

  choose(event) {
    this.keywordType = event;
    if(this.keywordType === 'Select from organic keywords') {
      this.showOrganicKeywords = true;
    } else { 
      this.showOrganicKeywords = false;
    }
  }

  addKeywords() {
    if (this.jobTitle && this.keywordInput && this.keywordType) {
      this.jobCreationLoader = true;
      this.jobsService.createKeywordJob(this.keywordInput, this.jobTitle).then((res: any) => {
        if (res) {
          this.jobCreated = true;
          this.jobCreationLoader = false;
          this.getDetails(1);
        }
      }).catch( (err: any) => {
        this.jobCreationLoader = false;
        this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
      ( err.statusText ? err.statusText : 'Please try after some time' );
        this.jobCreated = false;
      });
    } else {
      this.showError = true;
    }
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
      this.deleteConfirmation(product);
    }
  }

  deleteJob() {
      this.jobsService.deleteJob(this.selectedProduct.id, 'kwdrelvncjobs').then((res: any) => {
        const message: String = 'Your request for delete record is successfully deleted.';
        this.notification.displayNotification(true, true, message);
        this.getDetails(1);
        setTimeout(() => {
          this.notification.displayNotification(false, true, '');
        }, 3000);
      }, err => {
        const message: String = 'Erorr while deleting the record. Please try after sometime';
        this.notification.displayNotification(true, false, message);
        setTimeout(() => {
          this.notification.displayNotification(false, false, '');
        }, 3000);
      });
  }

  deleteConfirmation(product) {
    this.selectedProduct = product;
    this.createNewKeyword = false;
    this.showConfirmation = true;
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
    this.jobsService.getAllKeywordRelevanceJobDetails(currentPageIndex, this.limitPerPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Keyword Relevance Job Details', err);
      this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
      ( err.statusText ? err.statusText : 'Please try after some time' );
      this.isLoading = false;
    });
  }

  getOrganicKeywordsList() {
    this.jobsService.getOrganicKeywordsList().then((res: any) => {
      this.organicKeywordsList = res;
      console.log('OrganicKeywords List', this.organicKeywordsList);
      this.allOrganicKeywords = this.organicKeywordsList.map( organicKeyword => organicKeyword.keyword);
      console.log('Organic Keywords', this.allOrganicKeywords);
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

  valueChanged(newOrganicKeyword) {
    this.selectedOrganicKeyword = this.organicKeywordsList.find(organicKeyword => organicKeyword.keyword === newOrganicKeyword);
    // this.code = this.selectedOrganicKeyword.id;
    this.selectedOrganicKeywordName = this.selectedOrganicKeyword && this.selectedOrganicKeyword.keyword ?this.selectedOrganicKeyword.keyword : '';
    this.keywordInput = this.selectedOrganicKeywordName;
    console.log('selected Organic', this.selectedOrganicKeyword);
    console.log('selected Organic Name', this.selectedOrganicKeywordName);
  }

}
