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
  jobHeaders = ['ASIN', 'MAP', 'Seller Name', 'Selling Price', '% of Price Variation'];
  // Table Header title
  headerTitle: String = 'Recent Map Breaches Recorded';
  productDetails: any;
  limitPerPage: number = 10;
  offsetPage: number = 0;
  organicCloudKeywords : any;
  countUrls = [];
  isBarChartDataAvailable: boolean = false;
  showErrorMessage: string;
  showOrganicErrorMessage: string;
  cloudKeywordsLoading: boolean = false;
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
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData : any = [{label: 'Brand Products', data: []},
  { labels: 'All Products', data: []}];
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
  isMapBreachesLoading: boolean;
  role: String;

  constructor(public jobsService: JobsService, public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.role = this.authService.getRole();
    this.showErrorMessage = '';
    if(this.role && this.role.toLowerCase() === 'admin') {
      this.countUrls = ['kwdrelvncjobscount', 'organickwdscount', 'mapmonitorjobscount', 'mapbreachesinweek','bulkproductcrawlscount', 'registereduserscount', 'registeredvendorscount', 'sellercrawlscount'];
      this.jobResults1 = [{jobType: 'Keyword relevance Jobs', count: 0}, {jobType: 'Organic Keywords', count: 0},
      {jobType: 'Map Monitor Jobs', count: 0}, {jobType: 'Map Breaches in this Week', count: 0}];
      this.jobResults2 = [{jobType: 'Bulk Product Crawl Jobs', count: 0}, {jobType: 'Users Registered', count: 0},
      {jobType: 'Vendors Registered', count: 0}, {jobType: 'Seller Crawl Jobs', count: 0}];
    } else {
      this.countUrls =  ['kwdrelvncjobscount', 'organickwdscount', 'mapmonitorjobscount', 'mapbreachesinweek',  'bulkproductcrawlscount', 'sellercrawlscount'];
      this.jobResults1 = [{jobType: 'Keyword relevance Jobs', count: 0}, {jobType: 'Organic Keywords', count: 0},
      {jobType: 'Map Monitor Jobs', count: 0}];
      this.jobResults2 = [{jobType: 'Map Breaches in this Week', count: 0}, {jobType: 'Bulk Product Crawl Jobs', count: 0}, {jobType: 'Seller Crawl Jobs', count: 0}];
      this.getOrganicSpecialLabels();
    }
    this.getMapBreaches(this.currentpageIndex);
    this.getDetails();
    this.getOrganincCloudKeywords();
}

  getOrganincCloudKeywords() {
    this.cloudKeywordsLoading = true;
    this.jobsService.getOrganincCloudKeywords().then( (res: any) => {
      this.organicCloudKeywords = res;
      const totalProducts = this.organicCloudKeywords.map( keyword => keyword.totalProducts);
      console.log('totalProducts', totalProducts);
      const maxIndex = totalProducts.indexOf(Math.max(...totalProducts));
      console.log('Max Index', maxIndex);
      this.organicCloudKeywords[maxIndex].max = true;
      this.cloudKeywordsLoading = false;
    }).catch( (err: any) => {
      this.showOrganicErrorMessage = err && err.error && err.error.message ? err.error.message : '';
      this.cloudKeywordsLoading = false;
    });
  }

  getMapBreaches(currentIndex) {
    this.isMapBreachesLoading = true;
    this.jobsService.getRecentMapBreaches(currentIndex, this.limitPerPage).then( (res:any) => {
      if(res) {
        // this.totalItems = res.totalItems;
        this.productDetails = res;
      }
      this.isMapBreachesLoading = false;
    }).catch( (err: any) => {
      this.isMapBreachesLoading = false;
    });
  }
  getDetails() {
    this.isLoading = true;
    const promiseList = [];
    this.countUrls.forEach(path => {
      const promise = this.jobsService.getCountDetails(path);
      promiseList.push(promise);
    });
    Promise.all(promiseList).then((details) => {
      this.splitCountDetails(details);
    });
  }

  getOrganicSpecialLabels() {
    this.showErrorMessage = '';
    this.jobsService.getRecentSpecialLabels().then( (data: any) => {
      if(data) {
        this.barChartLabels = data.map(stat => stat.label ? stat.label : '');
        this.barChartData[0].label = 'Branded products';
        this.barChartData[0].data =  data.map( stat => stat.brandProducts ?  stat.brandProducts : 0);
        this.barChartData[1].label = 'All products';
        this.barChartData[1].data =  data.map( stat => stat.allProducts ?  stat.allProducts : 0);
        this.isBarChartDataAvailable = true;
        console.log('barChartData', this.barChartData);
      } else {
        this.barChartLabels = [];
        this.barChartData = [];
        this.isBarChartDataAvailable = true;
        this.showErrorMessage = 'Labels not found';
      }
    }).catch( (err: any) => {
        this.showErrorMessage = err && err.error && err.error.message ? err.error.message : 'Labels not found';
        this.isBarChartDataAvailable = true
    });
  }

  splitCountDetails(data) {
    if(data.length === 8) {
      this.jobResults1[0].count = data[0] ? data[0] : 0;
      this.jobResults1[1].count = data[1] ? data[1] : 0;
      this.jobResults1[2].count = data[2] ? data[2] : 0;
      this.jobResults1[3].count = data[3] ? data[3] : 0;
      this.jobResults2[0].count = data[4] ? data[4] : 0;
      this.jobResults2[1].count = data[5] ? data[5] : 0;
      this.jobResults2[2].count = data[6] ? data[6] : 0;
      this.jobResults2[3].count = data[7] ? data[7] : 0;
    } else {
      this.jobResults1[0].count = data[0] ? data[0] : 0;
      this.jobResults1[1].count = data[1] ? data[1] : 0;
      this.jobResults1[2].count = data[2] ? data[2] : 0;
      this.jobResults2[0].count = data[3] ? data[3] : 0;
      this.jobResults2[1].count = data[4] ? data[4] : 0;
      this.jobResults2[2].count = data[5] ? data[5] : 0;
    }
    this.isLoading = false;
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
    } else if (event.type && event.type.toLowerCase() === 'map monitor jobs') {
      this.router.navigate(['/mapjobslist']);
    } else if (event.type && event.type.toLowerCase() === 'map breaches in this week') {
      this.router.navigate(['/mapjobslist']);
    } else if (event.type && event.type.toLowerCase() === 'bulk product crawl jobs') {
      this.router.navigate(['/bulkcrawljobs']);
    } else if (event.type && event.type.toLowerCase() === 'users registered') {
      this.router.navigate(['/users']);
    } else if (event.type && event.type.toLowerCase() === 'vendors registered') {
      this.router.navigate(['/users']);
    } else if (event.type && event.type.toLowerCase() === 'seller crawl jobs') {
      this.router.navigate(['/sellercrawljobs']);
    }
  }

  navigateToDashBoard(organicKeyword) {
    this.router.navigate(['/keywordset/' + organicKeyword.id + '/dashboard']);
  }

}
