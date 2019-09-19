import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { ChartsModule } from 'ng2-charts';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-organic-summary-dashboard',
  templateUrl: './organic-summary-dashboard.component.html',
  styleUrls: ['./organic-summary-dashboard.component.scss']
})
export class OrganicSummaryDashboardComponent implements OnInit {

  // Bar graphs data
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', color: 'pink'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', color: '#6c10e8'}
  // ];

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
          min: 0
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

  // Pie Chart Brand details
  public pieChartBrandLabels = ['BrandProducts', 'OtherBrandProducts'];
  public pieChartBrandData = [];

  public pieChartBrandRatingLabels = [];
  public pieChartBrandRatingValues = [];

  public barChartBrandLabels: any = ['Turcotte, Funk and Orn', 'Stokes-Roberts', 'Emmerich-Abbott', 'Nitzsche Group',
  'Hyatt, Gusikowski and Casper'];
  public barChartImagesData: any = [{data: [72, 37, 94, 27, 79]}];
  public barChartBulletpointsData: any = [{data: [7, 2, 9, 1, 5]}];
  public barChartCharLengthData: any = [{data: [41, 25, 37, 19, 24]}];

  // Pie Chart Brand Rating details
  // Radar Chart
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public radarChartType = 'radar';

  headerTitle: any;
  productTitle: any;
  jobId: any;
  showDatePicker: boolean;
  isBrandDataAvailable: boolean;
  isBarGraphDataAvailable: boolean;

  constructor(public route: ActivatedRoute, public router: Router, public jobsService: JobsService) { }

  ngOnInit() {
  //   const chart = new CanvasJS.Chart('chartContainer', {
  //     theme: 'light2',
  //     animationEnabled: true,
  //     exportEnabled: true,
  //     title: {
  //       text: 'Monthly Expense'
  //     },
  //     data: [{
  //       type: 'pie',
  //       showInLegend: true,
  //       toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
  //       indexLabel: '{name} - #percent%',
  //       dataPoints: [
  //         { y: 450, name: 'Food' },
  //         { y: 120, name: 'Insurance' },
  //         { y: 300, name: 'Traveling' },
  //         { y: 800, name: 'Housing' },
  //         { y: 150, name: 'Education' },
  //         { y: 150, name: 'Shopping' },
  //         { y: 250, name: 'Others' }
  //       ]
  //     }]
  //   });
  //   chart.render();
      this.headerTitle = this.route.snapshot.paramMap.get('headerTitle');
      this.productTitle = this.route.snapshot.paramMap.get('productTitle');
      this.jobId = this.route.snapshot.paramMap.get('jobId');
      if (this.headerTitle && this.headerTitle.toLowerCase() === 'organic keyword') {
        this.showDatePicker = true;
      }
      this.isBarGraphDataAvailable = false;
      this.isBrandDataAvailable = false;
      this.getBrandsData();
      this.getBrandRatingsData();
      this.getNumberOfImages();
      this.getNumberOfBulletPoints();
      this.getNumberOfCharacters();
   }

   getBrandsData() {
    this.jobsService.getBrandPresenceDetails(this.jobId).then(res => {
      this.pieChartBrandData.push(res.brandProducts);
      this.pieChartBrandData.push(res.otherBrandProducts);
    });
   }

   getBrandRatingsData() {
    this.jobsService.getBrandRatingDetails(this.jobId).then( (data: any ) => {
      if (data.userRating) {
        const userRating = data.userRating;
        this.isBrandDataAvailable = true;
        this.pieChartBrandRatingLabels = Object.keys(userRating);
        this.pieChartBrandRatingValues = Object.values(userRating);
      }
    });
   }

   getNumberOfImages() {
    this.jobsService.getNumberOfImages(this.jobId).then( (data: any ) => {
      if (data.stats) {
        this.barChartBrandLabels = data.stats.map( stat => stat.vendorname ? stat.vendorname : '');
        this.barChartImagesData.data = data.stats.map( stat => stat.avgimageCount ? stat.avgimageCount : 0);
      }
    });
   }

   getNumberOfBulletPoints() {
    this.jobsService.getNumberOfBulletPoints(this.jobId).then( (data: any ) => {
      if (data.stats) {
        const userRating = data.stats;
        this.barChartBulletpointsData.data = data.stats.map( stat => stat.avgBulletsCount ? stat.avgBulletsCount : 0);
      }
    });
   }

   getNumberOfCharacters() {
    this.jobsService.getNumberOfCharacters(this.jobId).then( (data: any ) => {
      if (data.stats) {
        const userRating = data.stats;
        this.barChartCharLengthData.data = data.stats.map( stat => stat.avgTitleLength ? stat.avgTitleLength : 0);
        this.isBarGraphDataAvailable = true;
      }
    });
   }
}
