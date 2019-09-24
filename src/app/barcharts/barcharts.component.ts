import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcharts',
  templateUrl: './barcharts.component.html',
  styleUrls: ['./barcharts.component.scss']
})
export class BarchartsComponent implements OnInit {

  @Input() barChartData: any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  colors = [
    {
      backgroundColor: [
        '#6c10e8',
        '#c068e4',
        '#2fc6d6',
        '#0B5EA8',
        '#a91de2'
     ],
    }
  ];

  stackedChartColors = [
    { // Title
      backgroundColor: '#6c10e8'
    },
    { // bullets
      backgroundColor: '#c068e4'
    },
    { // Description
      backgroundColor: '#2fc6d6'
    }
  ];

  constructor() { }

  ngOnInit() {
    console.log('BarChartData', this.barChartData);
  }

}
