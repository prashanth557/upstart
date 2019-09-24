import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-mapmonitor-last-run-job-details',
  templateUrl: './mapmonitor-last-run-job-details.component.html',
  styleUrls: ['./mapmonitor-last-run-job-details.component.scss']
})
export class MapmonitorLastRunJobDetailsComponent implements OnInit {

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
      this.totalItems = res && res.totalItems ? res.totalItems : 0;
      this.items = res && res.items ? res.items : [];
      this.jobCandidateDetails = this.items && this.items[0] ? this.items[0].candidates : [];
      this.calculateMapBreaches();
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Job Details', err);
      // this.isLoading = false;
    });
  }

  calculateMapBreaches() {
    this.jobCandidateDetails.forEach( jobDetail => {
      let index = 0;
      jobDetail.sellers.forEach( sellerInfo => {
        if ( Number(sellerInfo.price.replace(/[$,]+/g, '')) < Number(jobDetail.map.replace(/[$,]+/g, '')) ) {
            sellerInfo.mapBreach = true;
            index++;
        }
      });
      jobDetail.mapBreachesCount = index;
    });
  }

  getSellerInfo(index) {
    this.showSellersInfo = !this.showSellersInfo;
    this.displaySellerIndex = index;
    this.productDetails = this.jobCandidateDetails[index].sellers;
  }

}
