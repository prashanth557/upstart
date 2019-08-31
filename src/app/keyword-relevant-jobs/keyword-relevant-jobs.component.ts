import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  productDetails: any = [{title: 'Adesso Brand Crawl', input: 'Floor Lamps',
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
  // Table Headers
  jobHeaders = ['Job Title', 'Keyword Input', 'Status', 'Last Run At', 'Created At', 'Quick Actions'];
  // Table Header title
  headerTitle: String = 'Keyword Relevance Jobs';
  createNewKeyword: boolean;
  modalTitle: String = 'Add New Keyword Relevance Job';
  constructor() { }

  ngOnInit() {
  }

  addNewKeyword(event) {
    if (event) {
      this.createNewKeyword = true;
    }
  }

  addKeywords() {
  }

}
