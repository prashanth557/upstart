import { Component, EventEmitter, OnInit, OnChanges, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Output() selectedPage =  new EventEmitter<number>();
  @Input() pageCount;
  @Input() itemsPerPage;
  @Input() currentPage: any;
  collection = [];
  constructor() {
  }

  ngOnChanges() {
    this.collection = [];
    for (let i = 1; i <= this.pageCount; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  ngOnInit() {
  }

  onPageChange(currentPage, pageNumber) {
    this.currentPage = pageNumber;
    // console.log('event is', event);
    this.selectedPage.emit(pageNumber);

  }
}
