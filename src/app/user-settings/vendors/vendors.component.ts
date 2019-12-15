import { Component, OnInit, ViewChild } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Cookie} from 'ng2-cookies';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TopNotificationComponent } from '../../top-notification/top-notification.component';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  urls = ['users', 'vendors'];
  vendorJobHeaders = ['Name', 'Actions'];
  vendorDetails: any = [];
  allVendorDetails: any = [];
  vendorDetailsLoading: boolean;
  vendorIndex:  number = 0;
  createVendor: boolean;
  emailId: string;
  vendorName: string;
  showError: boolean;
  created: boolean;
  showErrorMessage: string;
  vendorLimitPerPage: number = 5;
  vendorCurrentpageIndex: number = 0;
  vendorId: any;
  choices: any = ['Yes', 'No'];
  defaultChoice = 'Yes';
  userType: any = 'Yes';
  vendorNames: any = [];
  selectedVendor: any;
  selectedVendorName: string;
  totalVendorCount: number = 0;
  showButtonText: boolean = true;
  showConfirmation: boolean = false;
  selectedUser: any;
  userModalTitle: String;
  constructor(public jobsService: JobsService) { }

  ngOnInit() {
    this.vendorId = Cookie.get('vendorId');
    this.vendorDetailsLoading = true;
    this.getVendorDetails(1);
    this.vendorIndex = 1;
  }

  getVendorDetails(index) {
    this.vendorDetailsLoading = true;
    this.vendorIndex = 1;
    this.jobsService.getVendorList(index, this.vendorLimitPerPage).then( res => {
      if(res) {
        this.totalVendorCount = res.totalItems;
        this.vendorDetails = res.items;
      }
      this.vendorDetailsLoading = false;
    }).catch((err: any) => {
      this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
      ( err.statusText ? err.statusText : 'Please try after some time' );
      this.vendorDetailsLoading = false;
    });
  }

  choose(event) {
    this.userType = event;
  }

  onVendorPageChange(event) {
    this.vendorCurrentpageIndex = event.offset;
    this.vendorLimitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.vendorCurrentpageIndex);
    this.getVendorDetails(this.vendorCurrentpageIndex);
  }


  addNewVendor(event) {
    console.log('New Vendor Keyword Clicked');
    this.showConfirmation = false;
    this.createVendor = true;
    this.selectedUser = {};
    this.resetFields();
  }


  deleteVendor(user) {
    console.log('Delete vendor Clicked');
    this.createVendor = false;
    this.showConfirmation = true;
    this.selectedUser = user;
    this.resetFields();
  }

  resetFields() {
    this.showError = false;
    this.created = false;
    this.emailId = '';
    this.vendorName = '';
    this.showErrorMessage = '';
  }

  editVendorDetails(user) {
    this.showConfirmation = false;
    this.selectedUser = user;
    this.resetFields();
    this.vendorName = this.selectedUser && this.selectedUser.name 
    ? this.selectedUser.name : '';
    this.createVendor = true;
  }

  createVendorUser() {
    if (this.vendorName) {
      this.showButtonText = false;
      this.showErrorMessage = '';
      let path = this.selectedUser && this.selectedUser.id ? 'editVendorInfo' : 'vendor' ;
      this.jobsService.createVendor(path, this.vendorName, this.selectedUser).then((data: any) => {
        this.created = true;
        this.showButtonText = true;
        this.getVendorDetails(1);
      }).catch((err: any) => {
        console.log('Error', err);
        if(err.status === 200) {
          this.created = true;
        }
        if (err.status === 409 ) {
          this.showErrorMessage =  err && err.error && err.error.message ? err.error.message:  
          ( err.statusText ? err.statusText : 'Please try after some time' );
        } else {
         this.showErrorMessage =  err && err.error && err.error.message ? err.error.message:  
         ( err.statusText ? err.statusText : 'Please try after some time' );
        }
        this.showButtonText = true;
      });
    } else {
      this.showError = true;
      this.showButtonText = true;
    }
  }

  getVendorIndex() {
    return(++this.vendorIndex) - (this.vendorDetails.length);
  }

  valueChanged(newVendorName) {
    this.selectedVendor = this.allVendorDetails.find(vendor => vendor.name === newVendorName);
    this.selectedVendorName = this.selectedVendor.name;
  }

  resetErrors() {
   if ( this.showErrorMessage ) {
     this.showErrorMessage = '';
   }
  }

  deleteUserDetails() {
    const path = 'disablevendor';
    let body: any;
    if(this.selectedUser && this.selectedUser.id) {
      body = {
        'id': this.selectedUser.id,
        'name': this.selectedUser && this.selectedUser.name ? this.selectedUser.name : ''
      }
    }
    this.jobsService.deleteUser(body, path).then((res: any) => {
      const message: String =  'Vendor deleted successfully.'
      this.notification.displayNotification(true, true, message);
      this.getVendorDetails(1);
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

}
