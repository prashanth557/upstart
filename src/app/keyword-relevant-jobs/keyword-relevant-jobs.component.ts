import { Component, ContentChild, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-keyword-relevant-jobs',
  templateUrl: './keyword-relevant-jobs.component.html',
  styleUrls: ['./keyword-relevant-jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KeywordRelevantJobsComponent implements OnInit {

  jobResults = [{jobType: 'Crawl Jobs Created', count: 22},
  {jobType: 'Product Data Extracted', count: 1239}, {jobType: 'Scheduled Crawl Jobs', count: '07'}];
  // Table Values
  allProductDetails: any = [
  {title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: '',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Image Archive Crawl', input: 'My Keywords',
  status: 'Running', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 11, 2019 @11:30 AM', showActions: true},
  {title: 'Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Brand Crawl3', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: '',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},

  {title: 'Image Archive Crawl2', input: 'My Keywords',
  status: 'Running', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 11, 2019 @11:30 AM', showActions: true},
  {title: 'Image Archive Crawl3', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Image Archive Crawl4', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl2', input: 'Floor Lamps',
  status: 'Ready', lastRun: '',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Image Archive Crawl5', input: 'My Keywords',
  status: 'Running', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 11, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl2', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl2', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true}];
  // Glyphicon images to be displayed at actions section in table
  actionItems = [{icon: 'glyphicon-flash', route: ''},
  {icon: 'glyphicon-eye-open', route: ''},
  {icon: 'glyphicon-th-large', route: ''},
  {icon: 'glyphicon-trash', route: ''},
];
productDetails: any;
  // Table Headers
  jobHeaders = ['Job Title', 'Keyword Input', 'Status', 'Last Run At', 'Created At', 'Quick Actions'];
  // Table Header title
  headerTitle: String = 'Keyword Relevance Jobs';
  createNewKeyword: boolean;
  modalTitle: String = 'Add New Keyword Relevance Job';
  // Required for Pagination
  currentpageIndex: number;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  constructor() { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.getDetails(this.currentpageIndex);
  }

  addNewKeyword(event) {
    if (event) {
      this.createNewKeyword = true;
    }
  }

  addKeywords() {
  }

  navigateTo(route) {
    console.log('Route', route);
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
