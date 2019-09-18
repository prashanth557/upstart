import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobResults = [{ jobType: 'Crawl Jobs Created', count: 22 },
  { jobType: 'Product Data Extracted', count: 1239 }, { jobType: 'Scheduled Crawl Jobs', count: '07' }];
  currentpageIndex: number;
  jobHeaders = ['Title', 'Price', 'userRating', 'Images', 'Info'];
  // Table Header title
  headerTitle: String = 'Recent Map Breaches Recorded';
  productDetails: any;
  limitPerPage: number = 5;
  offsetPage: number = 0;

  allProductDetails: any = [{
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

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  isLoading: boolean;
  totalItems: number;
  constructor(public jobsService: JobsService) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.getDetails(this.currentpageIndex);
  }
  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.totalItems = this.allProductDetails.length;
    this.productDetails = this.allProductDetails.slice(currentPageIndex, currentPageIndex + 5);
    this.isLoading = false;
    // this.jobsService.getAllKeywordRelevanceJobDetails(this.offsetPage).then((res: any) => {
    //   this.totalItems = res.totalItems;
    //   this.productDetails = res.items;
    //   this.isLoading = false;
    // }).catch(err => {
    //   console.log('Error while fetching Keyword Relevance Job Details', err);
    //   this.isLoading = false;
    // });
  }

  onPageChange(offset) {
    this.currentpageIndex = offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (offset - 1) * this.limitPerPage;
    this.offsetPage = currentIndex;
    this.getDetails(this.offsetPage);
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

}
