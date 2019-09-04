import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organic-keywords',
  templateUrl: './organic-keywords.component.html',
  styleUrls: ['./organic-keywords.component.scss']
})
export class OrganicKeywordsComponent implements OnInit {
  searchKeyword: String = '';
  // Modal Title
  modalTitle: String = 'Add Oragnic Keywords';
  // Header Title
  headerTitle: String = 'Organic Keywords Set';
  // Details to be displayed inside table
  allProductDetails: any = [{title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: '',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Image Archive Crawl', input: 'My Keywords',
  status: 'Running', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 11, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true}];
  actionItems = [{icon: 'Edit', route: 'keywordset/keywordresultdash'},
  {icon: 'Deactivate', route: ''},
  {icon: 'Last run result summary', route: 'keywordset/keywordresultdash'},
  {icon: 'Run History', route: 'keywordset/organicRunHistory'},
  {icon: 'Schedule', route: 'schedulesList'}];
  // Table Headers
  jobHeaders = ['Job Title', 'Keyword Input', 'Status', 'Last Run At', 'Created At', 'Quick Actions'];
  createNewKeyword: boolean;
  productDetails: any;
    // Required for Pagination
    currentpageIndex: number;
    limitPerPage: number = 5;
    offsetPage: number = 0;
  constructor(public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.getDetails(this.currentpageIndex);
  }

  addNewKeyword(event) {
    if (event) {
      this.createNewKeyword = true;
    }
  }

  navigateToTabs(tabName) {
    if (tabName) {
      this.router.navigate([tabName]);
    }
  }
  onPageChange(offset) {
    this.currentpageIndex = offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (offset - 1) * this.limitPerPage;
    this.offsetPage = currentIndex;
    this.getDetails(this.offsetPage);
  }

  getDetails(currentPageIndex) {
    this.productDetails = this.allProductDetails.slice(this.offsetPage, this.offsetPage + 5);
  }

}
