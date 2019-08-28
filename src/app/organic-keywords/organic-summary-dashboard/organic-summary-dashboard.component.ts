import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-organic-summary-dashboard',
  templateUrl: './organic-summary-dashboard.component.html',
  styleUrls: ['./organic-summary-dashboard.component.scss']
})
export class OrganicSummaryDashboardComponent implements OnInit {

  // Bar graphs data
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Pie Chart data
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  constructor() { }

  ngOnInit() {
  //   const chart = new CanvasJS.Chart('chartContainer', {
  //     theme: 'light2',
  //     animationEnabled: true,
  //     exportEnabled: true,
  //     title: {
  //       text: 'Monthly Expense'
  //     },
  //     data: [{
  //       type: 'pie',
  //       showInLegend: true,
  //       toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
  //       indexLabel: '{name} - #percent%',
  //       dataPoints: [
  //         { y: 450, name: 'Food' },
  //         { y: 120, name: 'Insurance' },
  //         { y: 300, name: 'Traveling' },
  //         { y: 800, name: 'Housing' },
  //         { y: 150, name: 'Education' },
  //         { y: 150, name: 'Shopping' },
  //         { y: 250, name: 'Others' }
  //       ]
  //     }]
  //   });
  //   chart.render();
  //   chart.getCredits().setEnabled(false);
   }
}
