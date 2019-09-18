import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loadingindicator.component.html',
  styleUrls: ['./loadingindicator.component.scss']
})
export class LoadingIndicatorComponent {
  @Input() show: boolean;
  constructor() {
  }
}
