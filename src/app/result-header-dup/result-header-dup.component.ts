import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-header-dup',
  templateUrl: './result-header-dup.component.html',
  styleUrls: ['./result-header-dup.component.scss']
})
export class ResultHeaderDupComponent implements OnInit {
  @Input() jobResults: any;
  constructor() { }

  ngOnInit() {
  }

}
