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
        '#4775bb',
        '#2fc6d6',
        '#0B5EA8',
        '#a91de2',
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
