import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-result-header-dup',
  templateUrl: './result-header-dup.component.html',
  styleUrls: ['./result-header-dup.component.scss']
})
export class ResultHeaderDupComponent implements OnInit {
  @Input() jobResults: any;
  @Output() redirectEmit = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }
  redirectToTabs(type) {
    this.redirectEmit.emit({type: type});

  }

}
