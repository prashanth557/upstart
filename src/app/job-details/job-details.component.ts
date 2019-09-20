import { ContentChild, Component, EventEmitter, OnInit, OnChanges, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit, OnChanges {

  @Input() headerTitle: String = '';
  @Input() jobHeaders: any;
  @Input() productDetails: any;
  @Input() showCreateButton: boolean;
  @Input() showDownloadButton: boolean;
  @Input() showSearch: boolean;
  @Input() pageCount: number;
  @Input() currentpageIndex: number;
  @Input() isLoading: boolean;
  @Output() createJob = new EventEmitter;
  @Output() pageChange = new EventEmitter;
  @ContentChild('lineHeader') lineHeaderTmpl: TemplateRef<any>;
  @ContentChild('filedsHeader') filedsHeader: TemplateRef<any>;
  keys: any = [];
  fromCount: number;
  toCount: number;
  optionValues: any = [];
  selectedEntryValue: any;
  constructor() { }

  ngOnInit() {
    let i ;
    for ( i = 1; i <= this.pageCount ; i * 5) {
      this.optionValues.push(i * 5);
    }
    this.selectedEntryValue = this.optionValues[0];
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
