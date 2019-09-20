import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobResults1 = [{ jobType: 'Keyword relevance Jobs', count: 27 },
  { jobType: 'Organic Keywords', count: 12 }, { jobType: 'Bulk Product Crawl Jobs', count: '06' }];
  jobResults2 = [{ jobType: 'Seller Crawl Jobs', count: '02', color: '#0B5EA8' },
  { jobType: 'Map Monitor Crawls', count: 1239, color: '#2A2073' }, { jobType: 'Scheduled Crawl Jobs', count: '07', color: '#6c10e8' }];
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
    // this.getDetails(this.offsetPage);
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'ready' ? '#2A2073 ' : '#2fc6d6';
  }

}
