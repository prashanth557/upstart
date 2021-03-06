import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from '../canvasjs.min';
import { ChartsModule } from 'ng2-charts';
import { JobsService } from '../services/jobs.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFrParserFormatterService } from '../services/ngb-date-fr-parser-formatter.service';
import { detachProjectedView } from '@angular/core/src/view/view_attach';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('c1') fromDateStatus: ElementRef;
  @ViewChild('c2') toDateStatus: ElementRef;
  today = new Date();
  barChartData: any[]= [];
  earlierDate = new Date(new Date().setDate(new Date().getDate()-3))
  fromDate: NgbDateStruct = { year: this.earlierDate.getFullYear(), day: this.earlierDate.getDate(), month: this.earlierDate.getMonth() + 1 };
  toDate: NgbDateStruct = { year: this.today.getFullYear(), day: this.today.getDate(), month: this.today.getMonth() + 1 };
  // To disable any specific days
  // isDisabled = (date: NgbDate, current: {month: number}) =>  date.day > this.today.getDate() && ( date.month >= this.today.getMonth() + 1  && date.year >= this.today.getFullYear() );
  @Input() headerTitle: any;
  @Input() keyword: any;
  @Input() analyticsType: String;
  @Input() showDatePicker: boolean;
  showDateError: boolean;
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
          // stepSize: 5
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
      text: 'Average number of images in product detail page',
      fontSize: 18,
      position: 'left'
    },
    options: {
      tooltips: {
          callbacks: {
              label: 'Avg. no of images'}}}
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
          // stepSize: 5
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
      text: 'Average number of bullet points in product detail page',
      fontSize: 18,
      position: 'left'
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
          // stepSize: 20
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
      text: 'Average number of characters in title ',
      fontSize: 18,
      position: 'left'
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
            fontSize: 15,
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
          // stepSize: 100
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
      text: 'Average user reviews',
      fontSize: 18,
      position: 'left'
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
          // stepSize: 250
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
      text: 'Average number of characters in description',
      fontSize: 18,
      position: 'left'
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
      text: 'Products with presence of keyword in title/description/bullets',
      fontSize: 18,
      position: 'left'
    }
  };
  // pie Chart data
  pieChartData: any[] = [];
  pieChartOptions1: any = {
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
    title: {
      display: true,
      text: 'Brand Products Presence',
      font:18
    },
    plugins: {
      datalabels: {
      color: 'white',
      font: {
        weight: 'bold'
      }
    }
  }
  };
  pieChartOptions2: any = {
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
    title: {
      display: true,
      text: 'User Rating for Brand Product',
      font:18
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
  isBrandDataAvailable: boolean;
  // 'brandskeywordpresence'
  // , 'brandskeywordpresence'
  dashboardApiUrls: any = ['brandspresence', 'brandsproductrating', 'brandsavgimages', 'brandsavgbullets' ,
  'brandsavgtitlelength', 'brandsavguserreviews', 'brandsavgdesclength'];
  selectedCategory: String = 'brand';

  constructor(public route: ActivatedRoute, public router: Router, public jobsService: JobsService,
    public ngbDateFrParserFormatterService: NgbDateFrParserFormatterService) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    this.getAnalytics();
  }

  getAnalytics() {
    this.isBrandDataAvailable = false;
    const promiseList: any[] = [];
    this.dashboardApiUrls.forEach(url => {
      this.pieChartData = [];
      this.barChartData = [];
      const promise = this.jobsService.getAnalyticsDetails(url, this.jobId, this.analyticsType,
        this.ngbDateFrParserFormatterService.format(this.fromDate),
        this.ngbDateFrParserFormatterService.format(this.toDate));
      promiseList.push(promise);
    });
    Promise.all(promiseList).then((details) => {
      this.splitAnalyticsDetails(details);
    });
  }
  splitAnalyticsDetails(details) {
    console.log('Analytics Data', details);
    if (details) {
      this.pieChartData.push({ labels: this.pieChartBrandLabels, data: []});
      if(details[0]) {
      this.pieChartData[0].data[0] = details[0] && details[0].brandProducts ? details[0].brandProducts : 0;
      this.pieChartData[0].data[1] = details[0].otherBrandProducts ? details[0].otherBrandProducts : 0;
      // this.pieChartOptions1.plugins.datalabels =  {
      //   formatter: (value, ctx) => {
      //     const label = this.pieChartData[ctx.dataIndex].data;
      //     return label;
      //   },
      // };
    } else {
      this.pieChartData[0] = ({labels: [], data: []}); 
    }
      // this.pieChartOptions.plugins = {
      //   data: {
      //     formatter: (value, ctx) => {
      //       let sum = 0;
      //       const dataArr = this.pieChartData[0].data;
      //       dataArr.map(data => {
      //         sum += data;
      //       });
      //       const percentage = (value * 100 / sum).toFixed(2) + '%';
      //       return percentage;
      //     },
      //     color: '#fff',
      //   }
      // };
      // console.log('pieChartOptions', this.pieChartOptions);
      if(details[1]) {
        const userRating = details[1].userRating;
        this.pieChartData.push({ labels: Object.keys(userRating) });
        this.pieChartData[1].data = Object.values(userRating);
      } else {
        this.pieChartData.push({labels: [], data: []}); 
      }
      // this.pieChartOptions.plugins = {
      //   data: {
      //     formatter: (value, ctx) => {
      //       let sum = 0;
      //       const dataArr = this.pieChartData[0].data;
      //       dataArr.map(data => {
      //         sum += data;
      //       });
      //       const percentage = (value * 100 / sum).toFixed(2) + '%';
      //       return percentage;
      //     },
      //     color: '#fff',
      //   }
      // };
      // Image labels and data
      let labels;
      let data;
      if (details[2] && details[2].stats) {
          labels =  details[2].stats.map(stat => stat.vendorName ? this.formatLabel(stat.vendorName, 10) : '');
          data = details[2].stats.map(stat => stat.avgimageCount ? stat.avgimageCount : 0);
          this.barChartData.push({ labels: labels, data: data, options: this.barChartImageOptions, label: 'Number of Images'});
          // labels = labels.slice(0, 15);
          // data = data.slice(0, 15);
          // let actualData = [];
          // let actualLabels = [];
          // data.forEach( (dataCount, i ) => {
          //   if (dataCount > 0) {
          //     actualLabels.push(labels[i]);
          //     actualData.push(dataCount);
          //   }
          // });
          // if (actualData.length > 0 && actualLabels.length > 0) {
          //   this.barChartData.push({ labels: actualLabels, data: actualData, options: this.barChartImageOptions});
          // }
      } else {
        this.barChartData[0] = ({labels:'', data: []});
      }

      // Bullet points labels and data
      if (details[3] &&  details[3].stats) {
         labels = details[3].stats.map(stat => stat.vendorName ? this.formatLabel(stat.vendorName, 10) : '');
         data = details[3].stats.map(stat => stat.avgBulletsCount ? stat.avgBulletsCount : 0);
         this.barChartData.push({ labels: labels, data: data, options: this.barChartBulletOptions, label: 'No. of Images'});
        //  labels = labels.slice(0, 15);
        //  data = data.slice(0, 15);
        //  let actualData = [];
        //  let actualLabels = [];
        //  data.forEach( (dataCount, i ) => {
        //    if (dataCount > 0) {
        //      actualLabels.push(labels[i]);
        //      actualData.push(dataCount);
        //    }
        //  });
        //  if (actualData.length > 0 && actualLabels.length > 0) {
        //    this.barChartData.push({ labels: actualLabels, data: actualData, options: this.barChartBulletOptions});
        //  }
      } else {
        this.barChartData[1] = {labels:'', data: []};
      }

      // Char length labels and data
      if (details[4] && details[4].stats) {
        labels =  details[4].stats.map(stat => stat.vendorName ? this.formatLabel(stat.vendorName, 10) : '');
        data = details[4].stats.map(stat => stat.avgTitleLength ? stat.avgTitleLength : 0);
        this.barChartData.push({ labels: labels, data: data, options: this.barChartCharLengthOptions });
        // labels = labels.slice(0, 15);
        // data = data.slice(0, 15);
        // let actualData = [];
        // let actualLabels = [];
        // data.forEach( (dataCount, i ) => {
        //   if (dataCount > 0) {
        //     actualLabels.push(labels[i]);
        //     actualData.push(dataCount);
        //   }
        // });
        // if (actualData.length > 0 && actualLabels.length > 0) {
        // this.barChartData.push({ labels: actualLabels, data: actualData, options: this.barChartCharLengthOptions });
        // }
      } else {
        this.barChartData[2] = {labels:'', data: []};
      }

      // UserReviews Labels and data
      if (details[5] &&  details[5].stats) {
        labels = details[5].stats.map(stat => stat.vendorName ? this.formatLabel(stat.vendorName, 10) : '');
        data =  details[5].stats.map(stat => stat.avgUserReviews ? stat.avgUserReviews : 0);
        this.barChartData.push({ labels: labels, data: data, options: this.barChartUserReviewOptions  });
        // labels = labels.slice(0, 15);
        // data = data.slice(0, 15);
        // let actualData = [];
        // let actualLabels = [];
        // data.forEach( (dataCount, i ) => {
        //   if (dataCount > 0) {
        //     actualLabels.push(labels[i]);
        //     actualData.push(dataCount);
        //   }
        // });
        // if (actualData.length > 0 && actualLabels.length > 0) {
        //   this.barChartData.push({ labels: actualLabels, data: actualData, options: this.barChartUserReviewOptions  });
        // }
      } else {
        this.barChartData[3] = {labels:'', data: []};
      }
      // Avg Characters in description labels and data
      if (details[6] && details[6].stats) {
        labels = details[6].stats.map(stat => stat.vendorName ? this.formatLabel(stat.vendorName, 10) : '');
        data = details[6].stats.map(stat => stat.avgDescLength ? stat.avgDescLength : 0);
        this.barChartData.push({ labels: labels, data: data, options: this.barChartAvgDescOptions });
        // labels = labels.slice(0, 15);
        // data = data.slice(0, 15);
        // let actualData = [];
        // let actualLabels = [];
        // data.forEach( (dataCount, i ) => {
        //   if (dataCount > 0) {
        //     actualLabels.push(labels[i]);
        //     actualData.push(dataCount);
        //   }
        // });
        // if (actualData.length > 0 && actualLabels.length > 0) {
        //   this.barChartData.push({ labels: actualLabels, data: actualData, options: this.barChartAvgDescOptions });
        // }
      } else {
        this.barChartData[4] = {labels:'', data: []};
      }

      // Avg Characters in Title, bullet, Description
      if (details[7] && details[7].stats) {
        labels =  details[7].stats.map(stat => stat.vendorName ? this.formatLabel(stat.vendorName, 10) : '');
        data.push({
          label: 'Title', data: details[7].stats.map(
            stat => stat.productsWithKeyword[0] && stat.productsWithKeyword[0].inTitle ? stat.productsWithKeyword[0].inTitle : 0)
        });
        data.push({
          label: 'Bullets', data: details[7].stats.map(
            stat => stat.productsWithKeyword[0] && stat.productsWithKeyword[0].inBullets ? stat.productsWithKeyword[0].inBullets : 0)
        });
        data.push({
          label: 'Description', data: details[7].stats.map(
            stat => stat.productsWithKeyword[0] && stat.productsWithKeyword[0].inDescription ? stat.productsWithKeyword[0].inDescription : 0)
        });
        this.barChartData.push({labels: labels, data: data, options: this.barChartKeywordPresenceOptions, isStacked: true });
        console.log(this.barChartData[6]);
        // let actualData = [];
        // let actualLabels = [];
        // data.forEach( (dataCount, i ) => {
        //   if (dataCount > 0) {
        //     actualLabels.push(labels[i]);
        //     actualData.push(dataCount);
        //   }
        // });
        // if (actualData.length > 0 && actualLabels.length > 0) {
        //   this.barChartData.push({labels: actualLabels, data: actualData, options: this.barChartKeywordPresenceOptions, isStacked: true });
        // }
      } else {
        this.barChartData[5] = {labels:'', data: []};
      }
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

  manualValidation(d1) {
    if (d1._elRef.nativeElement.status === 'VALID') {
      this.showDateError = true;
    }
  }

  getData() {
    if (this.fromDateStatus && this.toDateStatus) {
      this.getAnalytics();
    } else {
      this.showDateError = true;
    }
  }

}
