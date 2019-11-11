import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-mapmonitor-last-run-job-details',
  templateUrl: './mapmonitor-last-run-job-details.component.html',
  styleUrls: ['./mapmonitor-last-run-job-details.component.scss']
})
export class MapmonitorLastRunJobDetailsComponent implements OnInit {

  jobDetailResponse: any;
  isLoading: boolean;
  jobId: any;
  totalItems: number;
  productDetails: any = [];
  jobCandidateDetails: any = [];
  items: any = [];
  jobResults: any = [{jobType: 'ASINs Tracked', count: 2},
  {jobType: 'MAP Breach Recorded', count: 3}, {jobType: 'Sellers Extracted', count: 53}];
  headerTitle: String = 'ASINs Seller Data';
  jobHeaders: any = ['seller', 'price', ' Items condition', 'shipping info', 'Below Map?'];
  showSellersInfo: boolean;
  displaySellerIndex: number;
  showErrorMessage: string;
  currentpageIndex: number = 1;
  limitPerPage: number = 5;
  constructor(public route: ActivatedRoute, public jobsService: JobsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.getLastRunJobDetails(this.jobId);
    });
  }

  getLastRunJobDetails(jobId) {
    this.jobsService.getMapMontiorLastRunJobDetails(jobId).then((res: any) => {
      if ( res ) {
        this.jobDetailResponse = res;
        this.items = res && res.items ? res.items : [];
        this.totalItems = this.items.length;
        this.jobCandidateDetails = this.items;
        this.calculateMapBreaches();
      }
      this.isLoading = false;
    }).catch(err => {
      this.showErrorMessage = err.error.message;
      this.isLoading = false;
      console.log('Error while fetching Job Details', err);
      // this.isLoading = false;
    });
  }

  calculateMapBreaches() {
    let totalSellers = 0;
    let totalMapBreaches = 0;
    this.jobCandidateDetails.forEach( jobDetail => {
      let index = 0;
      if ( jobDetail && jobDetail.sellers) {
        totalSellers  = totalSellers + jobDetail.sellers.length;
        jobDetail.sellers.forEach( sellerInfo => {
          // if ( Number(sellerInfo.price) < Number(jobDetail.map.replace(/[$,]+/g, '')) ) {
          //     sellerInfo.mapBreach = true;
          //     index++;
          //     totalMapBreaches++;
          // }
          if (sellerInfo.belowMap) {
            index++;
            totalMapBreaches++;
          }
        });
      }
        jobDetail.mapBreachesCount = index;
      });
      this.jobResults[0].count = this.totalItems;
      this.jobResults[1].count = totalMapBreaches;
      this.jobResults[2].count = totalSellers;
  }

  getSellerInfo(index) {
    this.showSellersInfo = !this.showSellersInfo;
    this.displaySellerIndex = index;
    this.productDetails = this.jobCandidateDetails[index].sellers;
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3 );
  }

  onPageChange(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getLastRunJobDetails(this.currentpageIndex);
  }

}
