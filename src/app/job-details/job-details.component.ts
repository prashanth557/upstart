import { ContentChild, Component, EventEmitter, OnInit, OnChanges, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnChanges {

  @Input() headerTitle: String = '';
  @Input() jobHeaders: any;
  @Input() productDetails: any;
  @Input() showCreateButton: boolean;
  @Input() actionItems: any;
  @Input() pageCount: number;
  @Input() currentpageIndex: number;
  @Output() createJob = new EventEmitter;
  @Output() pageChange = new EventEmitter;
  @ContentChild('lineHeader') lineHeaderTmpl: TemplateRef<any>;
  keys: any = [];
  fromCount: number;
  toCount: number;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.keys = Object.keys(this.productDetails[0]);
    this.fromCount = this.currentpageIndex > 0 ? ( this.currentpageIndex - 1 ) * 5 : 1;
    this.toCount = this.fromCount === 1 ? 5 : this.fromCount + 5;
    if (this.toCount > this.pageCount) {
      this.toCount = this.pageCount;
    }
  }

  createNewJob() {
    this.createJob.emit({ createJob: true });
  }

  getBackgroundColor(product, key) {
    return product[key].toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  onPageChange(offset) {
    this.pageChange.emit(offset);
  }

}
