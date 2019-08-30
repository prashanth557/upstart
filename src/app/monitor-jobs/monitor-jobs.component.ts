import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-jobs',
  templateUrl: './monitor-jobs.component.html',
  styleUrls: ['./monitor-jobs.component.scss']
})
export class MonitorJobsComponent implements OnInit {
  // Banner Results
  jobResults: any = [{ jobType: 'Jobs Created', count: 56 },
  { jobType: 'Product being tracked', count: 985 }, { jobType: 'MAP breached recorded', count: 475 }];

  // Table Values
  productDetails: any = [{
    title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
    price: '$20.49', userRating: '3',
    bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
    images: '5', info: 'Maximum strength'
  },
  {
    title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
    price: '$20.49', userRating: '3',
    bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
    images: '5', info: 'Maximum strength'
  },
  {
    title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
    price: '$20.49', userRating: '3',
    bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
    images: '5', info: 'Maximum strength'
  },
  {
    title: 'Hystrix cristata', description: 'Creating a Sidenav menu with Bootstrap',
    price: '$20.49', userRating: '3',
    bulletPoints: 'A Sidenav is a collapsible component to place side, often and in this case, navigation content.',
    images: '5', info: 'Maximum strength'
  }];

  // Table Headers
  jobHeaders = ['Product Title', 'Description', 'Price', 'User rating', 'Bullet points', 'Number of images', 'By Info'];

  // Table Header title
  headerTitle: String = 'MAP Breach Crawl Jobs';
  constructor() { }

  ngOnInit() {
  }

}
