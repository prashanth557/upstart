import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  // Table Values
  productDetails: any = [];
  // Table Headers
  jobHeaders = ['Title', 'Severity', 'Recorded On', 'Description', 'Vendor'];
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  totalItems: number;
  isLoading: boolean;
  showErrorMessage: String;
  constructor( public jobsService: JobsService) { }

  ngOnInit() {
    this.getAlertDetails(1);
  }

  getAlertDetails(currentpageIndex) {
    this.isLoading = true;
    this.jobsService.getAlerts(currentpageIndex, this.limitPerPage).then( (data: any) => {
       if (data) {
         this.productDetails = data.items;
         this.totalItems = data.totalItems;
       }
       this.isLoading = false;
    }).catch( (err: any) => {
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
    });
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getAlertDetails(this.currentpageIndex);
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3);
  }

}
