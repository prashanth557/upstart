import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-dashboard',
  templateUrl: './summary-dashboard.component.html',
  styleUrls: ['./summary-dashboard.component.scss']
})
export class SummaryDashboardComponent implements OnInit {

  // Inputs for pieCharts
  @Input() pieChartBrandLabels: any = [];
  @Input() pieChartBrandData: any = [];
  @Input() pieChartBrandRatingLabels: any = [];
  @Input() pieChartBrandRatingValues: any = [];
  public pieChartType = 'pie';
  @Input() barChartOptions: any = [];
  constructor() { }

  ngOnInit() {
  }

}
