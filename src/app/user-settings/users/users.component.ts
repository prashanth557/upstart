import { Component, OnInit, ViewChild } from '@angular/core';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TopNotificationComponent } from '../../top-notification/top-notification.component';
import { JobsService } from '../../services/jobs.service';
import { Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  urls = ['users', 'vendors'];
  adminJobHeaders = ['Email', 'Is Admin', 'Is Signed Up',  'Vendor Name', 'Actions'];
  adminDetails: any = [];
  adminDetailsLoading: boolean;
  adminIndex: number = 0;
  createAdmin: boolean;
  emailId: string;
  showError: boolean;
  created: boolean;
  showErrorMessage: string;
  adminLimitPerPage: number = 5;
  adminCurrentpageIndex: number = 0;
  choices: any = ['Yes', 'No'];
  defaultChoice = 'Yes';
  userType: any = 'Yes';
  totalAdminCount: number =0;
  showButtonText: boolean = true;
  showConfirmation: boolean = false;
  selectedUser: any;
  selectedVendorName: any;
  userModalTitle: String;
  allVendorDetails: any;
  vendorNames: any;
  selectedVendor: any;
  constructor(public jobsService: JobsService) { }

  ngOnInit() {
    this.adminDetailsLoading = true;
    this.vendorList();
    this.getAdminDetails(1);
    this.adminIndex = 1;
  }

  getAdminDetails(index) {
    this.adminDetailsLoading = true;
    this.adminIndex = 1;
    this.jobsService.getUserList(index, this.adminLimitPerPage).then( (res: any) => {
      console.log('admin detials', res);
      if(res) {
        this.totalAdminCount = res.totalItems;
        console.log('totalAdminCount', this.totalAdminCount);
        this.adminDetails = res.items;
      }
      this.adminDetailsLoading = false;
    }).catch((err: any) => {
      this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
      ( err.statusText ? err.statusText : 'Please try after some time' );
      this.adminDetailsLoading = false;
    });
  }

  vendorList() {
    this.jobsService.getVendors().then( res => {
      if(res) {
        this.allVendorDetails = res;
        this.allVendorDetails.forEach(vendor => {
          this.vendorNames.push(vendor.name);
        });
        console.log('Vendor names', this.vendorNames);
      }
    }).catch((err: any) => {
      console.log('Error while fetching vendor list', err);
    });
  }

  choose(event) {
    this.userType = event;
  }

  onAdminPageChange(event) {
    this.adminCurrentpageIndex = event.offset;
    this.adminLimitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.adminCurrentpageIndex);
    this.getAdminDetails(this.adminCurrentpageIndex);
  }

  addNewAdmin(event) {
    console.log('New Admin Keyword clicked');
    this.userModalTitle = 'Create User';
    this.showConfirmation = false;
    this.createAdmin = true;
    this.selectedUser = {};
    this.resetFields();
  }
  
  deleteUser(user) {
    console.log('Delete user Clicked');
    this.createAdmin = false;
    this.showConfirmation = true;
    this.selectedUser = user;
    this.resetFields();
  }

  resetFields() {
    this.showError = false;
    this.created = false;
    this.emailId = '';
    this.showErrorMessage = '';
  }

  editUserDetails(user) {
    this.userModalTitle = 'Edit User';
    this.showConfirmation = false;
    this.selectedUser = user;
    this.resetFields();
    this.emailId = this.selectedUser && this.selectedUser.emailId ? this.selectedUser.emailId : '';
    this.defaultChoice = this.selectedUser.isAdmin ? 'Yes' : 'No';
    this.selectedVendorName = this.selectedUser && this.selectedUser.vendor  && this.selectedUser.vendor.name
    ? this.selectedUser.vendor.name : '';
    this.createAdmin = true;
  }

  createAdminUser() {
    if (this.emailId && this.selectedVendorName) {
      const body = {
        emailId: this.emailId,
        isAdmin: this.userType.toLowerCase() === 'yes' ? true : false ,
        vendorId: this.selectedVendor.id
      };
      this.showErrorMessage = '';
      this.showButtonText = false;
      this.jobsService.createAdmin('users', body).then((data: any) => {
        if (data) {
          this.created = true;
          this.showButtonText = true;
          this.getAdminDetails(1);
        }
      }).catch((err: any) => {
        console.log('Error', err);
        if (err.status === 409 ) {
          this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
          ( err.statusText ? err.statusText : 'Please try after some time' );
        } else {
          this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
          ( err.statusText ? err.statusText : 'Please try after some time' );
        }
        this.showButtonText = true;
      });
    } else {
      this.showError = true;
      this.showButtonText = true;
    }
  }

  getAdminIndex() {
    return (++this.adminIndex) - (this.adminDetails.length);
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
    const path = 'disableuser';
    let body: any;
    if(this.selectedUser && this.selectedUser.emailId) {
      body = {
        'emaiId': this.selectedUser.emailId
      }
    }
    this.jobsService.deleteUser(body, path).then((res: any) => {
      const message: String =  'User deleted successfully';
      this.notification.displayNotification(true, true, message);
      this.getAdminDetails(1);
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
