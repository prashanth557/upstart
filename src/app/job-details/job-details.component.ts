import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input() headerTitle: String = '';
  @Input() jobHeaders: any;
  @Input() productDetails: any;
  @Input() showCreateButton: boolean;
  @Output() createJob = new EventEmitter;
  keys: any = [];
  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.productDetails[0]);
    console.log('Keys:::', this.keys);
    console.log('headerTitle', this.headerTitle);
  }

  createNewJob() {
    this.createJob.emit({ createJob: true });
  }

  getBackgroundColor(product, key) {
    return product[key].toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

}
