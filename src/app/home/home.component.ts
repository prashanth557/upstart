import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobResults1: any = [];
  jobResults2: any = [];
  currentpageIndex: number;
  jobHeaders = ['ASIN', 'MAP', 'sellerName', 'Selling price', '% of price variation'];
  // Table Header title
  headerTitle: String = 'Recent Map Breaches Recorded';
  productDetails: any;
  limitPerPage: number = 10;
  offsetPage: number = 0;

  allProductDetails: any = [{
    asin: 'B005ZH862', map: '$394.30',
    seller: 'Schimmel-Greenholt', sellingPrice: '$348.56',
    variation: '88.40%'
  },
  {
    asin: 'B005ZH862', map: '$394.30',
    seller: 'Schimmel-Greenholt', sellingPrice: '$348.56',
    variation: '88.40%'
  },
  {
    asin: 'B005ZH862', map: '$394.30',
    seller: 'Schimmel-Greenholt', sellingPrice: '$348.56',
    variation: '88.40%'
  },
  {
    asin: 'B005ZH862', map: '$394.30',
    seller: 'Schimmel-Greenholt', sellingPrice: '$348.56',
    variation: '88.40%'
  },
  {
    asin: 'B005ZH862', map: '$394.30',
    seller: 'Schimmel-Greenholt', sellingPrice: '$348.56',
    variation: '88.40%'
  }];

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        fontSize: 12,
        usePointStyle: true,
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10
          }
        }],
      yAxes: [{
        stacked: true,
        ticks: {
          min: 0,
          stepSize: 20
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          labelString: 'No. of products'
        }
      }]
    }
  };
  public barChartLabels = ['Sponsored', 'Best seller', 'Amazon Prime', 'Amazons choice'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {  label: 'Branded Products', data: [18, 30, 55, 5]},
    {  label: 'Total Products',  data: [60, 40, 60, 10]}
  ];
  isLoading: boolean;
  totalItems: number;
  colors = [
    { // 1st Year.
      backgroundColor: '#6c10e8'
    },
    { // 2nd Year.
      backgroundColor: '#c068e4'
    }
  ];

  role: String;

  constructor(public jobsService: JobsService, public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.role = this.authService.getRole();
    this.getDetails(this.currentpageIndex);
  }
  getDetails(currentPageIndex) {
    this.isLoading = true;
    this.totalItems = this.allProductDetails.length;
    this.productDetails = this.allProductDetails.slice(currentPageIndex, currentPageIndex + 5);
    this.isLoading = false;
    if (this.role && this.role.toLowerCase() === 'vendor') {
      this.jobResults1 = [{ jobType: 'Keyword relevance Jobs', count: 27 },
      { jobType: 'Organic Keywords', count: 12 }, { jobType: 'Bulk Product Crawl Jobs', count: '06' }];
      this.jobResults2 = [{ jobType: 'Seller Crawl Jobs', count: '02', color: '#0B5EA8' },
      { jobType: 'Map Monitor Crawls', count: 1239, color: '#2A2073' }, { jobType: 'Scheduled Crawl Jobs', count: '07', color: '#6c10e8' }];
    } else if (this.role && this.role.toLowerCase() === 'admin') {
      this.jobResults1 = [{ jobType: 'Vendors Registred', count: 19 },
      { jobType: 'Organic Keywords', count: '54' }, { jobType: 'Map Breaches in this Week', count: '372' }];
      this.jobResults2 = [];
    }
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
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (offset - 1) * this.limitPerPage;
    this.offsetPage = currentIndex;
    // this.getDetails(this.offsetPage);
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

  redirectToPages(event) {
    if (event.type && event.type.toLowerCase() === 'keyword relevance jobs') {
      this.router.navigate(['/keywordjoblist']);
    } else if (event.type && event.type.toLowerCase() === 'organic keywords') {
      this.router.navigate(['/keywordset']);
    } else if (event.type && event.type.toLowerCase() === 'map monitor crawls') {
      this.router.navigate(['/mapjobslist']);
    }
  }

}
