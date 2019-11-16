import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-header',
  templateUrl: './result-header.component.html',
  styleUrls: ['./result-header.component.scss'],
})
export class ResultHeaderComponent implements OnInit {

  @Input() jobResults: any;
  @Input() isLoading: boolean;
  @Output() redirectEmit = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  redirectToTabs(type) {
    this.redirectEmit.emit({type: type});

  }

}
