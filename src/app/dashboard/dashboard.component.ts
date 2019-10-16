import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from '../canvasjs.min';
import { ChartsModule } from 'ng2-charts';
import { JobsService } from '../services/jobs.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  barChartData: any[] = [];
  @Input() headerTitle: any;
  @Input() keyword: any;
  public barChartImageOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false,
            display: true // Make it to True if you want to display labels at x axis
          },
          scaleInstance: {
            width: 100
          }
        }],
      yAxes: [{
        stacked: false,
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
          // labelString: 'No. of Images'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average no. Of Images displayed in product detail page'
    }
  };
  public barChartBulletOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false,
            display: false // Make it to True if you want to display labels at x axis
          },
          scaleInstance: {
            width: 100
          }
        }],
      yAxes: [{
        stacked: false,
        ticks: {
          min: 0,
          stepSize: 2
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          // labelString: 'No. of Images'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average no. Of bullet points displayed in product detail page'
    }
  };
  public barChartCharLengthOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false,
            display: false // Make it to True if you want to display labels at x axis
          },
          scaleInstance: {
            width: 100
          }
        }],
      yAxes: [{
        stacked: false,
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
          // labelString: 'No. of Images'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average no. Of characters in product detail page'
    }
  };
  public barChartUserReviewOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false,
            display: false // Make it to True if you want to display labels at x axis
          },
          scaleInstance: {
            width: 100
          }
        }],
      yAxes: [{
        stacked: false,
        ticks: {
          min: 0,
          stepSize: 50
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          // labelString: 'No. of Images'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average user reviews'
    }
  };
  public barChartAvgDescOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
            lineWidth: 10,
            color: 'rgba(255,255,255,0)'
          },
          ticks: {
            fontSize: 10,
            autoSkip: false,
            display: false // Make it to True if you want to display labels at x axis
          },
          scaleInstance: {
            width: 100
          }
        }],
      yAxes: [{
        stacked: false,
        ticks: {
          min: 0,
          stepSize: 100
        },
        gridLines: {
          display: true,
          // lineWidth: 10,
        },
        scaleLabel: {
          display: true,
          // labelString: 'No. of Images'
        }
      }]
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Average no. Of characters in description'
    }
  };

  public barChartKeywordPresenceOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333',
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
            fontSize: 10,
            autoSkip: false,
            display: true
          },
          scaleInstance: {
            width: 100
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
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Product with presence keyword in Title/Desc/Bullets'
    }
  };
  // pie Chart data
  pieChartData: any[] = [];
  pieChartOptions: any  = {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        usePointStyle: true,
        render: 'percentage',
        data: {
          formatter: (value, ctx) => {
              let sum = 0;
              const dataArr = this.pieChartData[0].data;
              dataArr.map(data => {
                  sum += data;
              });
              const percentage = (value * 100 / sum).toFixed(2) + '%';
              return percentage;
          },
          color: '#fff',
      },
        precision: 2
      }
    },
    plugins: {}
  };
  // Pie Chart Brand details
  public pieChartBrandLabels = ['BrandProducts', 'OtherBrandProducts'];
  // Pie Chart Brand Rating details
  // Radar Chart
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    { data: [120, 130, 180, 70], label: '2017' },
    { data: [90, 150, 200, 45], label: '2018' }
  ];
  public radarChartType = 'radar';
  jobId: any;
  showDatePicker: boolean;
  isBrandDataAvailable: boolean;
  isBarGraphDataAvailable: boolean;
  dashboardApiUrls: any = ['brandspresence', 'brandsproductrating', 'brandsavgimages',
    'brandsavgbullets', 'brandsavgtitlelength', 'brandsavgimages', 'brandsavgdesclength', 'brandskeywordpresence'];
  selectedCategory: String = 'brand';

  constructor(public route: ActivatedRoute, public router: Router, public jobsService: JobsService) { }

  ngOnInit() {
    // this.headerTitle = this.route.snapshot.paramMap.get('headerTitle');
    // this.keyword = this.route.snapshot.paramMap.get('productTitle');
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    if (this.headerTitle && this.headerTitle.toLowerCase() === 'organic keyword') {
      this.showDatePicker = true;
    }
    this.isBarGraphDataAvailable = false;
    this.isBrandDataAvailable = false;
    this.getAnalytics();
  }

  getAnalytics() {
    const promiseList: any[] = [];
    this.dashboardApiUrls.forEach(url => {
      const promise = this.jobsService.getAnalyticsDetails(url, this.jobId);
      promiseList.push(promise);
    });
    Promise.all(promiseList).then((details) => {
      this.splitAnalyticsDetails(details);

    });
  }
  splitAnalyticsDetails(details) {
    console.log('Analytics Data', details);
    if (details) {
      this.pieChartData.push({ labels: this.pieChartBrandLabels });
      this.pieChartData[0].data = [details[0].brandProducts];
      this.pieChartData[0].data.push(details[0].otherBrandProducts);
      this.pieChartOptions.plugins = {
        data: {
            formatter: (value, ctx) => {
                let sum = 0;
                const dataArr = this.pieChartData[0].data;
                dataArr.map(data => {
                    sum += data;
                });
                const percentage = (value * 100 / sum).toFixed(2) + '%';
                return percentage;
            },
            color: '#fff',
      }
    };
    // console.log('pieChartOptions', this.pieChartOptions);
      const userRating = details[1].userRating;
      this.pieChartData.push({ labels: Object.keys(userRating) });
      this.pieChartData[1].data = Object.values(userRating);
      this.pieChartOptions.plugins = {
        data: {
            formatter: (value, ctx) => {
                let sum = 0;
                const dataArr = this.pieChartData[0].data;
                dataArr.map(data => {
                    sum += data;
                });
                const percentage = (value * 100 / sum).toFixed(2) + '%';
                return percentage;
            },
            color: '#fff',
      }
    };
      // Image Labels and data
      this.barChartData.push({ labels: details[2].stats.map(stat => stat.vendorname ? this.formatLabel(stat.vendorname, 10) : '') });
      this.barChartData[0].data = details[2].stats.map(stat => stat.avgimageCount ? stat.avgimageCount : 0);
      this.barChartData[0].options = this.barChartImageOptions;
      // Bullet points labels and data
      this.barChartData.push({ labels: details[3].stats.map(stat => stat.vendorname ? stat.vendorname : '') });
      this.barChartData[1].data = details[3].stats.map(stat => stat.avgBulletsCount ? stat.avgBulletsCount : 0);
      this.barChartData[1].options = this.barChartBulletOptions;
      // Char length labels and data
      this.barChartData.push({ labels: details[4].stats.map(stat => stat.vendorname ? stat.vendorname : '') });
      this.barChartData[2].data = details[4].stats.map(stat => stat.avgTitleLength ? stat.avgTitleLength : 0);
      this.barChartData[2].options = this.barChartCharLengthOptions;
      // UserReviews Labels and data ( Need to be corrected once the userReview API is fine)
      this.barChartData.push({ labels: details[5].stats.map(stat => stat.vendorname ? stat.vendorname : '') });
      this.barChartData[3].data = details[5].stats.map(stat => stat.avgimageCount ? stat.avgimageCount : 0);
      this.barChartData[3].options = this.barChartUserReviewOptions;
      // Avg Characters in description labels and data
      this.barChartData.push({ labels: details[6].stats.map(stat => stat.vendorname ? stat.vendorname : '') });
      this.barChartData[4].data = details[6].stats.map(stat => stat.avgDescLength ? stat.avgDescLength : 0);
      this.barChartData[4].options = this.barChartAvgDescOptions;
      // Brand Word presence in title, bullets, description
      this.barChartData.push({ labels: details[7].stats.map(stat => stat.vendorname ? stat.vendorname : '') });
      this.barChartData[5].labels = ['Title', 'Bullets', 'Description'];
      this.barChartData[5].data = [{
        label: 'Title', data: details[7].stats.map(
          stat => stat.productsWithKeyword && stat.productsWithKeyword.inTitle ? stat.productsWithKeyword.inTitle : 0)
      }];
      this.barChartData[5].data.push({
        label: 'Bullets', data: details[7].stats.map(
          stat => stat.productsWithKeyword && stat.productsWithKeyword.inBullets ? stat.productsWithKeyword.inBullets : 0)
      });
      this.barChartData[5].data.push({
        label: 'Description', data: details[7].stats.map(
          stat => stat.productsWithKeyword && stat.productsWithKeyword.inDescription ? stat.productsWithKeyword.inDescription : 0)
      });
      this.barChartData[5].options = this.barChartKeywordPresenceOptions;
      this.barChartData[5].isStacked = true;
      this.isBrandDataAvailable = true;
    }
  }

  selectCategory(catergory) {
    this.selectedCategory = catergory;
  }

  formatLabel(str, maxwidth) {
  const sections = [];
  const words = str.split(' ');
  let temp = '';
  words.forEach(function (item, index) {
    if (temp.length > 0) {
      const concat = temp + ' ' + item;
      if (concat.length > maxwidth) {
        sections.push(temp);
        temp = '';
      } else {
        if (index === (words.length - 1)) {
          sections.push(concat);
          return;
        } else {
          temp = concat;
          return;
        }
      }
    }
    if (index === (words.length - 1)) {
      sections.push(item);
      return;
    }
    if (item.length < maxwidth) {
      temp = item;
    } else {
      sections.push(item);
    }

  });

  return sections;
}

}
