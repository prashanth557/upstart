import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Cookie} from 'ng2-cookies';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  urls = ['users', 'vendors'];
  adminJobHeaders = ['Email', 'Is Admin', 'Is Signed Up',  'Vendor Name'];
  vendorJobHeaders = ['Name'];
  adminDetails: any = [];
  vendorDetails: any = [];
  adminDetailsLoading: boolean;
  vendorDetailsLoading: boolean;
  adminIndex: number = 0;
  vendorIndex:  number = 0;
  createAdmin: boolean;
  createVendor: boolean;
  emailId: string;
  vendorName: string;
  showError: boolean;
  created: boolean;
  showErrorMessage: string;
  adminLimitPerPage: number = 5;
  adminCurrentpageIndex: number = 0;
  vendorLimitPerPage: number = 5;
  vendorCurrentpageIndex: number = 0;
  vendorId: any;
  choices: any = ['Yes', 'No'];
  defaultChoice = 'Yes';
  userType: any = 'Yes';
  vendorNames: any = [];
  selectedVendor: any;
  selectedVendorName: string;
  constructor(public jobsService: JobsService) { }

  ngOnInit() {
    this.vendorId = Cookie.get('vendorId');
    this.adminDetailsLoading = true;
    this.vendorDetailsLoading = true;
    this.getAdminDetails(0);
    this.adminIndex = 0;
  }

  getAdminDetails(index) {
    this.adminDetailsLoading = true;
    this.adminIndex = 0;
    this.jobsService.getUserList(this.urls[0]).then( res => {
      console.log('admin detials', res);
      this.adminDetails = res;
      this.adminDetailsLoading = false;
      this.getVendorDetails(0);
    }).catch((err: any) => {
      this.showErrorMessage = err.error.message;
    });
  }

  getVendorDetails(index) {
    this.vendorDetailsLoading = true;
    this.vendorIndex = 0;
    this.jobsService.getUserList(this.urls[1]).then( res => {
      this.vendorDetails = res;
      this.vendorDetails.forEach(vendor => {
        this.vendorNames.push(vendor.value.name);
      });
      console.log('Vendor names', this.vendorNames);
      this.vendorDetailsLoading = false;
    }).catch((err: any) => {
      this.showErrorMessage = err.error.message;
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

  onVendorPageChange(event) {
    this.vendorCurrentpageIndex = event.offset;
    this.vendorLimitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.vendorCurrentpageIndex);
    this.getVendorDetails(this.vendorCurrentpageIndex);
  }

  addNewAdmin(event) {
    console.log('New Admin Keyword clicked');
    this.createVendor = false;
    this.createAdmin = true;
    this.resetFields();
  }

  addNewVendor(event) {
    console.log('New Vendor Keyword Clicked');
    this.createAdmin = false;
    this.createVendor = true;
    this.resetFields();
  }
  resetFields() {
    this.showError = false;
    this.created = false;
    this.emailId = '';
    this.vendorName = '';
    this.showErrorMessage = '';
  }

  createAdminUser() {
    if (this.emailId && this.selectedVendorName) {
      const body = {
        emailId: this.emailId,
        isAdmin: this.userType.toLowerCase() === 'yes' ? true : false ,
        vendorId: this.selectedVendor.value.id
      };
      this.jobsService.createAdmin('users', body).then((data: any) => {
        if (data) {
          this.created = true;
          this.getAdminDetails(1);
        }
      }).catch((err: any) => {
        console.log('Error', err);
        if (err.status === 409 ) {
          this.showErrorMessage = err.error;
        } else {
         this.showErrorMessage = err.error.message;
        }
      });
    } else {
      this.showError = true;
    }
  }

  createVendorUser() {
    if (this.vendorName) {
      this.jobsService.createVendor('vendor', this.vendorName).then((data: any) => {
        this.created = true;
        this.getVendorDetails(1);
      }).catch((err: any) => {
        console.log('Error', err);
        if (err.status === 409 ) {
          this.showErrorMessage = err.error;
        } else {
         this.showErrorMessage = err.error.message;
        }
      });
    } else {
      this.showError = true;
    }
  }

  getAdminIndex() {
    return (++this.adminIndex) - (this.adminDetails.length);
  }

  getVendorIndex() {
    return(++this.vendorIndex) - (this.vendorDetails.length);
  }

  valueChanged(newVendorName) {
    this.selectedVendor = this.vendorDetails.find(vendor => vendor.value.name === newVendorName);
    // this.code = this.selectedVendor.id;
    this.selectedVendorName = this.selectedVendor.value.name;
    console.log('selected Vendor', this.selectedVendor);
    console.log('selected Vendor Name', this.selectedVendorName);
  }

  resetErrors() {
   if ( this.showErrorMessage ) {
     this.showErrorMessage = '';
   }
  }

}
