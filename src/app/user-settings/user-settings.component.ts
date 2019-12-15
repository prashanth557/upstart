import { Component, OnInit} from '@angular/core';
// import { JobsService } from '../services/jobs.service';
// import { Cookie} from 'ng2-cookies';
// import { NguiAutoCompleteModule } from '@ngui/auto-complete';
// import { TopNotificationComponent } from '../top-notification/top-notification.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    console.log('user-settings component loaded');
  }

  // @ViewChild(TopNotificationComponent) notification: TopNotificationComponent;
  // urls = ['users', 'vendors'];
  // adminJobHeaders = ['Email', 'Is Admin', 'Is Signed Up',  'Vendor Name', 'Actions'];
  // vendorJobHeaders = ['Name', 'Actions'];
  // adminDetails: any = [];
  // vendorDetails: any = [];
  // allVendorDetails: any = [];
  // adminDetailsLoading: boolean;
  // vendorDetailsLoading: boolean;
  // adminIndex: number = 0;
  // vendorIndex:  number = 0;
  // createAdmin: boolean;
  // createVendor: boolean;
  // emailId: string;
  // vendorName: string;
  // showError: boolean;
  // created: boolean;
  // showErrorMessage: string;
  // adminLimitPerPage: number = 5;
  // adminCurrentpageIndex: number = 0;
  // vendorLimitPerPage: number = 5;
  // vendorCurrentpageIndex: number = 0;
  // vendorId: any;
  // choices: any = ['Yes', 'No'];
  // defaultChoice = 'Yes';
  // userType: any = 'Yes';
  // vendorNames: any = [];
  // selectedVendor: any;
  // selectedVendorName: string;
  // totalAdminCount: number =0;
  // totalVendorCount: number = 0;
  // showButtonText: boolean = true;
  // showConfirmation: boolean = false;
  // selectedUser: any;
  // userModalTitle: String;
  // constructor(public jobsService: JobsService) { }

  // ngOnInit() {
  //   this.vendorId = Cookie.get('vendorId');
  //   this.adminDetailsLoading = true;
  //   this.vendorDetailsLoading = true;
  //   this.vendorList();
  //   this.getAdminDetails(1);
  //   this.getVendorDetails(1);
  //   this.adminIndex = 1;
  //   this.vendorIndex = 1;
  // }

  // getAdminDetails(index) {
  //   this.adminDetailsLoading = true;
  //   this.adminIndex = 1;
  //   this.jobsService.getUserList(index, this.adminLimitPerPage).then( (res: any) => {
  //     console.log('admin detials', res);
  //     if(res) {
  //       this.totalAdminCount = res.totalItems;
  //       this.adminDetails = res.items;
  //     }
  //     this.adminDetailsLoading = false;
  //   }).catch((err: any) => {
  //     this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
  //     ( err.statusText ? err.statusText : 'Please try after some time' );
  //     this.adminDetailsLoading = false;
  //   });
  // }

  // getVendorDetails(index) {
  //   this.vendorDetailsLoading = true;
  //   this.vendorIndex = 1;
  //   this.jobsService.getVendorList(index, this.vendorLimitPerPage).then( res => {
  //     if(res) {
  //       this.totalVendorCount = res.totalItems;
  //       this.vendorDetails = res.items;
  //     }
  //     this.vendorDetailsLoading = false;
  //   }).catch((err: any) => {
  //     this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
  //     ( err.statusText ? err.statusText : 'Please try after some time' );
  //     this.vendorDetailsLoading = false;
  //   });
  // }

  // vendorList() {
  //   this.jobsService.getVendors().then( res => {
  //     if(res) {
  //       this.allVendorDetails = res;
  //       this.allVendorDetails.forEach(vendor => {
  //         this.vendorNames.push(vendor.name);
  //       });
  //       console.log('Vendor names', this.vendorNames);
  //     }
  //   }).catch((err: any) => {
  //     console.log('Error while fetching vendor list', err);
  //   });
  // }

  // choose(event) {
  //   this.userType = event;
  // }

  // onAdminPageChange(event) {
  //   this.adminCurrentpageIndex = event.offset;
  //   this.adminLimitPerPage = event.limitPerPage;
  //   console.log('CurrentPageIndex', this.adminCurrentpageIndex);
  //   this.getAdminDetails(this.adminCurrentpageIndex);
  // }

  // onVendorPageChange(event) {
  //   this.vendorCurrentpageIndex = event.offset;
  //   this.vendorLimitPerPage = event.limitPerPage;
  //   console.log('CurrentPageIndex', this.vendorCurrentpageIndex);
  //   this.getVendorDetails(this.vendorCurrentpageIndex);
  // }

  // addNewAdmin(event) {
  //   console.log('New Admin Keyword clicked');
  //   this.userModalTitle = 'Create User';
  //   this.createVendor = false;
  //   this.showConfirmation = false;
  //   this.createAdmin = true;
  //   this.selectedUser = {};
  //   this.resetFields();
  // }

  // addNewVendor(event) {
  //   console.log('New Vendor Keyword Clicked');
  //   this.createAdmin = false;
  //   this.showConfirmation = false;
  //   this.createVendor = true;
  //   this.selectedUser = {};
  //   this.resetFields();
  // }
  
  // deleteUser(user) {
  //   console.log('Delete user Clicked');
  //   this.createAdmin = false;
  //   this.createVendor = false;
  //   this.showConfirmation = true;
  //   this.selectedUser = user;
  //   this.resetFields();
  // }

  // deleteVendor(user) {
  //   console.log('Delete user Clicked');
  //   this.createAdmin = false;
  //   this.createVendor = false;
  //   this.showConfirmation = true;
  //   this.selectedUser = user;
  //   this.resetFields();
  // }

  // resetFields() {
  //   this.showError = false;
  //   this.created = false;
  //   this.emailId = '';
  //   this.vendorName = '';
  //   this.showErrorMessage = '';
  // }

  // editUserDetails(user) {
  //   this.userModalTitle = 'Edit User';
  //   this.createVendor = false;
  //   this.showConfirmation = false;
  //   this.selectedUser = user;
  //   this.resetFields();
  //   this.emailId = this.selectedUser && this.selectedUser.emailId ? this.selectedUser.emailId : '';
  //   this.defaultChoice = this.selectedUser.isAdmin ? 'Yes' : 'No';
  //   this.selectedVendorName = this.selectedUser && this.selectedUser.vendor  && this.selectedUser.vendor.name
  //   ? this.selectedUser.vendor.name : '';
  //   this.createAdmin = true;
  // }

  // editVendorDetails(user) {
  //   this.createAdmin = false;
  //   this.showConfirmation = false;
  //   this.selectedUser = user;
  //   this.resetFields();
  //   this.vendorName = this.selectedUser && this.selectedUser.name 
  //   ? this.selectedUser.name : '';
  //   this.createVendor = true;
  // }

  // createAdminUser() {
  //   if (this.emailId && this.selectedVendorName) {
  //     const body = {
  //       emailId: this.emailId,
  //       isAdmin: this.userType.toLowerCase() === 'yes' ? true : false ,
  //       vendorId: this.selectedVendor.id
  //     };
  //     this.showErrorMessage = '';
  //     this.showButtonText = false;
  //     this.jobsService.createAdmin('users', body).then((data: any) => {
  //       if (data) {
  //         this.created = true;
  //         this.showButtonText = true;
  //         this.getAdminDetails(1);
  //       }
  //     }).catch((err: any) => {
  //       console.log('Error', err);
  //       if (err.status === 409 ) {
  //         this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
  //         ( err.statusText ? err.statusText : 'Please try after some time' );
  //       } else {
  //         this.showErrorMessage = err && err.error && err.error.message ? err.error.message:  
  //         ( err.statusText ? err.statusText : 'Please try after some time' );
  //       }
  //       this.showButtonText = true;
  //     });
  //   } else {
  //     this.showError = true;
  //     this.showButtonText = true;
  //   }
  // }

  // createVendorUser() {
  //   if (this.vendorName) {
  //     this.showButtonText = false;
  //     this.showErrorMessage = '';
  //     let path = this.selectedUser && this.selectedUser.id ? 'editVendorInfo' : 'vendor' ;
  //     this.jobsService.createVendor(path, this.vendorName, this.selectedUser).then((data: any) => {
  //       this.created = true;
  //       this.showButtonText = true;
  //       this.getVendorDetails(1);
  //       this.vendorList();
  //     }).catch((err: any) => {
  //       console.log('Error', err);
  //       if(err.status === 200) {
  //         this.created = true;
  //       }
  //       if (err.status === 409 ) {
  //         this.showErrorMessage =  err && err.error && err.error.message ? err.error.message:  
  //         ( err.statusText ? err.statusText : 'Please try after some time' );
  //       } else {
  //        this.showErrorMessage =  err && err.error && err.error.message ? err.error.message:  
  //        ( err.statusText ? err.statusText : 'Please try after some time' );
  //       }
  //       this.showButtonText = true;
  //     });
  //   } else {
  //     this.showError = true;
  //     this.showButtonText = true;
  //   }
  // }

  // getAdminIndex() {
  //   return (++this.adminIndex) - (this.adminDetails.length);
  // }

  // getVendorIndex() {
  //   return(++this.vendorIndex) - (this.vendorDetails.length);
  // }

  // valueChanged(newVendorName) {
  //   this.selectedVendor = this.allVendorDetails.find(vendor => vendor.name === newVendorName);
  //   this.selectedVendorName = this.selectedVendor.name;
  // }

  // resetErrors() {
  //  if ( this.showErrorMessage ) {
  //    this.showErrorMessage = '';
  //  }
  // }

  // deleteUserDetails() {
  //   const path = this.selectedUser.emailId ? 'disableuser': 'disablevendor';
  //   let body: any;
  //   if(this.selectedUser && this.selectedUser.emailId) {
  //     body = {
  //       'emaiId': this.selectedUser.emailId
  //     }
  //   } else if(this.selectedUser && this.selectedUser.id) {
  //     body = {
  //       'id': this.selectedUser.id,
  //       'name': this.selectedUser && this.selectedUser.name ? this.selectedUser.name : ''
  //     }
  //   }
  //   this.jobsService.deleteUser(body, path).then((res: any) => {
  //     const message: String =  ( path === 'disableuser' ) ? 'User deleted successfully' : 'Vendor deleted successfully.'
  //     this.notification.displayNotification(true, true, message);
  //     path === 'disableuser' ? this.getAdminDetails(1) : this.getVendorDetails(1);
  //     setTimeout(() => {
  //       this.notification.displayNotification(false, true, '');
  //     }, 3000);
  //   }, err => {
  //     const message: String = 'Erorr while deleting the record. Please try after sometime';
  //     this.notification.displayNotification(true, false, message);
  //     setTimeout(() => {
  //       this.notification.displayNotification(false, false, '');
  //     }, 3000);
  //   });
  // }

}
