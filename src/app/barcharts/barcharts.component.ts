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
  public barChartType = 'bar';
  public barChartLegend = true;

  @Input() barChartLabels: any = [];
  @Input() barChartData: any = [];

  colors = [
    { // 1st Year.
      backgroundColor: '#6c10e8'
    },
    { // 2nd Year.
      backgroundColor: '#c068e4'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
