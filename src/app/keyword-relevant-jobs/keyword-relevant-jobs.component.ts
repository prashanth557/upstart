import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-keyword-relevant-jobs',
  templateUrl: './keyword-relevant-jobs.component.html',
  styleUrls: ['./keyword-relevant-jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KeywordRelevantJobsComponent implements OnInit {

  jobResults = [{jobType: 'Current Jobs Created', count: 22},
  {jobType: 'Product data extracted', count: 1239}, {jobType: 'Scheduled crawl job', count: 7}];
  // Table Values
  productDetails: any = [{title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
  price: '$20.49', userRating: '3',
  bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
  images: '5', info: 'Maximum strength'},
  {title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
  price: '$20.49', userRating: '3',
  bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
  images: '5', info: 'Maximum strength'},
  {title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
  price: '$20.49', userRating: '3',
  bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
  images: '5', info: 'Maximum strength'},
  {title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
  price: '$20.49', userRating: '3',
  bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
  images: '5', info: 'Maximum strength'}];
  // Table Headers
  jobHeaders = ['Product Title', 'Description', 'Price', 'User rating', 'Bullet points', 'Number of images', 'By Info'];

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
