import { Component, EventEmitter, OnInit, OnChanges, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination2',
  templateUrl: './pagination2.component.html',
  styleUrls: ['./pagination2.component.scss']
})
export class PaginationComponent2 implements OnInit, OnChanges {
  @Output() selectedPage2 =  new EventEmitter<number>();
  @Input() pageCount2;
  @Input() itemsPerPage2;
  @Input() currentPage2: any;
  collection = [];
  constructor() {
  }

  ngOnChanges() {
    this.collection = [];
    for (let i = 1; i <= this.pageCount2; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  ngOnInit() {
  }

  onPageChange(currentPage, pageNumber) {
    this.currentPage2 = pageNumber;
    // console.log('event is', event);
    this.selectedPage2.emit(pageNumber);

  }
}
