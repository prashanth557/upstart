import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-dashboard',
  templateUrl: './summary-dashboard.component.html',
  styleUrls: ['./summary-dashboard.component.scss']
})
export class SummaryDashboardComponent implements OnInit {

  // Inputs for pieCharts
  @Input() pieChartData: any [] = [];
  @Input() pieChartOptions1: any;
  @Input() pieChartOptions2: any;
  public pieChartType = 'pie';
  pieChartColors = [
    {
      backgroundColor: [
        '#6c10e8',
        '#c068e4',
        '#2fc6d6',
        '#0B5EA8',
        '#a91de2',
        '#660090',
        '#660090',
        '#003f5c',
        '#7d8ee9',
        '#3068a3',
        '#58508d',
        '#0480a3',
        '#bc5090',
        '#0697bb',
        '#ff6361',
        '#ffa600',
        '#2f4b7c',
        '#665191',
        '#ff3030',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#1fe1ff',
        '#13c8e9',
        '#04698b',
        '#025474',
        '#9c99ff',
        '#ff3030',
        '#f00a5c',
        '#6b1414',
        '#1a3b61',
        '#219443',
        '#006674',
        '#004c69'
    ]
    }
  ];
  public pieChartPlugins = [];
  constructor() { }

  ngOnInit() {
    console.log('PieChartData', this.pieChartData);
  }

}
