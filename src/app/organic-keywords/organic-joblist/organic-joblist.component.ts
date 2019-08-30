import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organic-joblist',
  templateUrl: './organic-joblist.component.html',
  styleUrls: ['./organic-joblist.component.scss']
})
export class OrganicJoblistComponent implements OnInit {

  // Banner Results
  jobResults: any = [{jobType: 'Matching products', count: 359},
  {jobType: 'Product data extracted', count: 123}, {jobType: 'Brand Products', count: 23}];

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
  headerTitle: String = 'Crawl result for Keyword';
  constructor() { }

  ngOnInit() {
  }

}
