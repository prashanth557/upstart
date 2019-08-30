import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  // Table Values
  productDetails: any = [{title: 'Hystrix cristata', severity: 'Info',
  recorded: 'Fri, 16 Nov 2018 @3:14:51PM' , description: 'new Vendor added',
  vendor: 'ipsum'},
  {title: 'Hystrix cristata', severity: 'Info',
  recorded: 'Fri, 16 Nov 2018 @3:14:51PM' , description: 'new Vendor added',
  vendor: 'ipsum'},
  {title: 'Hystrix cristata', severity: 'Info',
  recorded: 'Fri, 16 Nov 2018 @3:14:51PM' , description: 'new Vendor added',
  vendor: 'ipsum'},
  {title: 'Hystrix cristata', severity: 'Info',
  recorded: 'Fri, 16 Nov 2018 @3:14:51PM' , description: 'new Vendor added',
  vendor: 'ipsum'}];
  // Table Headers
  jobHeaders = ['Title', 'Severity', 'Recorded On', 'Description', 'Vendor'];
  headerTitle: String =  'Alerts';
  constructor() { }

  ngOnInit() {
  }

}
