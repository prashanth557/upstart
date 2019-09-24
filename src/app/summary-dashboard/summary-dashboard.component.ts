import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-dashboard',
  templateUrl: './summary-dashboard.component.html',
  styleUrls: ['./summary-dashboard.component.scss']
})
export class SummaryDashboardComponent implements OnInit {

  // Inputs for pieCharts
  @Input() pieChartData: any [] = [];
  @Input() pieChartOptions: any;
  public pieChartType = 'pie';
  pieChartColors = [
    {
      backgroundColor: [
        '#6c10e8',
        '#c068e4'
    ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
