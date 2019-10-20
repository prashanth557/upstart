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
  itemsTobeDisplayedPerPage: number = 5;
  optionsValues: any = [];
  constructor() { }

  ngOnInit() {
    console.log('headerTitle', this.headerTitle);
    console.log('jobHeaders', this.jobHeaders);
    let pageNumbers = this.pageCount > 0 && this.pageCount < 5 ? 1 : Math.round(this.pageCount / 5 );
    let index = 0;
    while ( pageNumbers > 0) {
      index = index + 5;
      pageNumbers = pageNumbers - 1;
      if (index > 20 ) {
        break;
      }
      this.optionsValues.push(index);
    }
    console.log('Option Values', this.optionsValues);
  }

  ngOnChanges() {
    this.keys = Object.keys(this.productDetails[0]);
    this.fromCount = this.currentpageIndex > 0 ? ( this.currentpageIndex - 1 ) * this.itemsTobeDisplayedPerPage : 1;
    this.toCount = this.fromCount === 1 ? this.itemsTobeDisplayedPerPage : this.fromCount + this.itemsTobeDisplayedPerPage;
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
    this.pageChange.emit({offset: offset, limitPerPage: this.itemsTobeDisplayedPerPage});
  }

  pageCountChange(count) {
    console.log('items to be displayed', count);
    this.itemsTobeDisplayedPerPage = Number(count);
    this.onPageChange(1);
  }

}
