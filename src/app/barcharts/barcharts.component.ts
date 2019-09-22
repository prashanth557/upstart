import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcharts',
  templateUrl: './barcharts.component.html',
  styleUrls: ['./barcharts.component.scss']
})
export class BarchartsComponent implements OnInit {

  @Input() barChartBrandLabels: any = [];
  @Input() barChartCharLengthData: any = [];
  @Input() barChartBulletpointsData: any = [];
  @Input() barChartImagesData: any = [];
  @Input() barChartOptions: any = [];
  @Input() barChartImageLabels: any = [];
  @Input() barChartBulletpointsLabels: any = [];
  @Input() barChartCharLengthLabels: any = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  @Input() barChartLabels: any = [];
  @Input() barChartData: any = [];
  colors = [
    { // 2nd Year.
      backgroundColor: '#c068e4'
    }
  ];

  public barChartImageOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false
          }
        }],
      yAxes: [{
        stacked: false,
        ticks: {
          min: 0,
          stepSize: 20
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          labelString: 'No. of Images'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average number of Images in product detail page'
  }
  };
  public barChartBulletOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false
          }
        }],
      yAxes: [{
        stacked: false,
        ticks: {
          min: 0,
          stepSize: 2
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          labelString: 'No. of bulletpoints'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average number of bullet points in product detail page'
  }
  };
  public barChartCharLengthOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false, //
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false // It wont skip the lables
          }
        }],
      yAxes: [{
        stacked: false,
        ticks: {
          min: 0,
          stepSize: 20
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          labelString: 'No. of characters'
        }
      }]
    },
    title: {
      display: true,
      text: 'Average number of characters in product detail page'
  }
  };

  constructor() { }

  ngOnInit() {
  }

}
