import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { TopNotificationComponent } from '../top-notification/top-notification.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-organic-keywords',
  templateUrl: './organic-keywords.component.html',
  styleUrls: ['./organic-keywords.component.scss']
})
export class OrganicKeywordsComponent implements OnInit {
  @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  searchKeyword: String = '';
  // Modal Title
  modalTitle: String = 'Add Organic Keyword';
  // Header Title
  headerTitle: String = 'Organic Keywords Set';
  // Details to be displayed inside table
  actionItems = [{icon: 'glyphicon-pencil'},
  {icon: 'glyphicon-list-alt'},
  {icon: 'glyphicon-tasks'},
  {icon: 'glyphicon-time'},
  {icon: 'glyphicon-trash'},
];
  // Table Headers
  jobHeaders = ['Keyword', 'Created On', 'Last Updated On', 'Status', 'Quick Actions'];
  createNewKeyword: boolean;
  productDetails: any = [];
  // Required for Pagination
  totalItems: number;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  isLoading: boolean;
  organicKeywordTitle: string;
  jobCreated: boolean;
  showError: boolean;
  showErrorMessage: string;
  updateProductId: any;
  isAdmin: boolean;
  bindVendor: boolean;
  vendorDetails: any = [];
  vendorNames: any = [];
  selectedProduct: any;
  selectedVendor: any;
  selectedVendorName: string;
  constructor(public router: Router, public jobsService: JobsService, public authService: AuthService) { }

  ngOnInit() {
    this.currentpageIndex = 1;
    this.isAdmin = this.authService.getRole() === 'Admin' ? true : false;
    this.getDetails(this.currentpageIndex);
  }

  addNewKeyword(event) {
    if (event) {
      this.createNewKeyword = true;
      this.organicKeywordTitle = '';
      this.jobCreated = false;
      this.updateProductId = '';
      this.showErrorMessage = '';
      this.showError = false;
    }
  }

  navigateToTabs(tabName) {
    if (tabName) {
      this.router.navigate([tabName]);
    }
  }
  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getDetails(this.currentpageIndex);
  }

  getBackgroundColor(product) {
    return product && product.active ? '#2A2073 ' : 'rgb(219, 220, 220)';
  }

  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.jobsService.getAllOrganicJobDetails(currentPageIndex, this.limitPerPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
      this.getVendorList();
    }).catch(err => {
      console.log('Error while fetching Keyword Relevance Job Details', err);
      this.isLoading = false;
      this.showErrorMessage = err.error.message;
    });
  }

  checkStatus(status) {
    return status ? true : false;
  }

  navigateTo(product, index) {
    console.log('Index', index);
    if (index === 0) {
      this.editJob(product);
    } else if (index === 1) {
      this.disableJob(product);
    } else if (index === 2) {
      this.router.navigate(['/keywordset/' + product.id + '/schedules']);
    } else if (index === 3) {
      this.router.navigate(['/keywordset/' + product.id + '/runhistory']);
    } else if (index === 4 ) {
      // this.router.navigate(['/keywordset/' + product.id + '/runhistory'])
      this.disableSchedule(product);
    } else if (index === 5 ) {
      this.deleteJob(product);
    }
  }

  disableJob(product) {
    const body = {
      'keyword': product.keyword,
      'active': !product.active
    };
    this.productDetails.map(
      (productDetail, i ) => productDetail.id === product.id ? (this.productDetails[i].disableJob = true ) : '');
    console.log('product Details before disabling ', this.productDetails);
    this.jobsService.updateOrganicKeyword(product.id, body).then( (res: any) => {
      if (res) {
        this.getDetails(this.currentpageIndex);
      }
    }).catch(err => {
      const message: String = 'Error while toggling the job. Please try again';
      this.notification.displayNotification(true, false, message);
      this.getDetails(this.currentpageIndex);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
      }, 3000);
    });
  }

  disableSchedule(product) {
    this.productDetails.map(
      (productDetail, i ) => productDetail.id === product.id ? (this.productDetails[i].disableAutorun = true ) : '');
    console.log('product Details before disabling ', this.productDetails);
    if (!product.scheduled) {
      this.jobsService.enableOrganickeywordsSchedule(product.id).then( (res: any) => {
        if (res) {
          this.getDetails(this.currentpageIndex);
        }
      }).catch(err => {
        const message: String = 'Error while toggling the job. Please try again';
        this.notification.displayNotification(true, false, message);
        this.getDetails(this.currentpageIndex);
        setTimeout(() => {
          this.notification.displayNotification(false, false, '');
        }, 3000);
      });
    } else {
      this.jobsService.deleteOrganickeywordsSchedule(product.id).then( (res: any) => {
        // if (res) {
          this.getDetails(this.currentpageIndex);
        // }
      }).catch(err => {
        const message: String = 'Error while toggling the job. Please try again';
        this.notification.displayNotification(true, false, message);
        this.getDetails(this.currentpageIndex);
        setTimeout(() => {
          this.notification.displayNotification(false, false, '');
        }, 3000);
      });
    }
  }

  deleteJob(product) {
    this.jobsService.deleteOrganicKeyword(product.id).then( (res: any) => {
      const message: String = 'Your request for delete record is successfully deleted.';
      this.notification.displayNotification(true, true, message);
      this.getDetails(this.currentpageIndex);
      setTimeout(() => {
        this.notification.displayNotification(false, true, '');
      }, 3000);
    }).catch( ( err: any) => {
      const message: String = 'Erorr while deleting the record. Please try after sometime';
      this.notification.displayNotification(true, false, message);
      setTimeout(() => {
        this.notification.displayNotification(false, false, '');
      }, 3000);
    });
  }

  editJob(product) {
    console.log('Edit Option Clicked', product);
    this.createNewKeyword = true;
    this.organicKeywordTitle = product && product.keyword ? product.keyword : '';
    this.jobCreated = false;
    this.updateProductId = product && product.id ? product.id : '';
    // this.addNewKeyword(product);
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3 );
  }

  createOrganicKeyword() {
   if (this.organicKeywordTitle) {
      if (this.updateProductId) {
        const body = {
          'keyword': this.organicKeywordTitle
        };
        this.jobsService.updateOrganicKeyword(this.updateProductId, body).then( res => {
          if (res) {
            this.jobCreated = true;
            this.getDetails(this.currentpageIndex);
          }
        }).catch((err: any) => {
          this.showErrorMessage = err.error.message;
          console.log('Error while updating the job', err);
       });
      } else {
      this.jobsService.createOrganicKeyword(this.organicKeywordTitle).then( res => {
        if (res) {
          this.jobCreated = true;
          this.getDetails(1);
        }
      }).catch( (err: any) => {
       this.showErrorMessage = err.error.message;
       console.log('Error while Creating the job', err);
      });
    }
   } else {
     this.showError = true;
   }
  }

  boundVendor(product) {
    this.bindVendor = true;
    this.jobCreated = false;
    this.selectedProduct = product;
    this.showError = false;
    // this.getVendorList();
  }

  valueChanged(newVendorName) {
    this.selectedVendor = this.vendorDetails.find(vendor => vendor.value.name === newVendorName);
    // this.code = this.selectedVendor.id;
    this.selectedVendorName = this.selectedVendor.value.name;
    console.log('selected Vendor', this.selectedVendor);
    console.log('selected Vendor Name', this.selectedVendorName);
  }

  getVendorList() {
      this.jobsService.getUserList('vendors').then( res => {
        this.vendorDetails = res;
        this.vendorDetails.forEach(vendor => {
          this.vendorNames.push(vendor.value.name);
        });
        console.log('Vendor names', this.vendorNames);
      }).catch((err: any) => {
        this.showErrorMessage = err.error.message;
      });
  }

  bindVendorToJob() {
    if (this.selectedVendorName) {
      const body = {
        'keyword': this.selectedProduct.keyword,
        'boundedVendorId': this.selectedProduct.boundedVendorId
      };
      this.jobsService.updateOrganicKeyword(this.selectedProduct.id, body).then( (res: any) => {
        if (res) {
          this.jobCreated = true;
          this.getDetails(this.currentpageIndex);
        }
      }).catch( (err: any) => {
        this.showErrorMessage = err.message;
      });
    } else {
      this.showError = true;
    }
  }

}
