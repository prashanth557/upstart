import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-header',
  templateUrl: './result-header.component.html',
  styleUrls: ['./result-header.component.scss']
})
export class ResultHeaderComponent implements OnInit {

  @Input() jobResults: any;
  constructor() { }

  ngOnInit() {
  }
  getBackground(result) {
    if (result && result.color) {
      const color =  result.color + '!important';
      return color;
    }
  }

}
