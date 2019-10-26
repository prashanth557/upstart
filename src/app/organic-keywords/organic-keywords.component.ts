import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organic-keywords',
  templateUrl: './organic-keywords.component.html',
  styleUrls: ['./organic-keywords.component.scss']
})
export class OrganicKeywordsComponent implements OnInit {
  searchKeyword: String = '';
  // Modal Title
  modalTitle: String = 'Add Oragnic Keywords';
  // Header Title
  headerTitle: String = 'Organic Keywords Set';
  // Details to be displayed inside table
  actionItems = [{icon: 'glyphicon-pencil'},
  {icon: 'glyphicon-list-alt'},
  {icon: 'glyphicon-tasks'},
  {icon: 'glyphicon-time'},
  {icon: 'glyphicon-trash'},
];
  // Table Headers
  jobHeaders = ['Keyword', 'Last Updated On', 'Status', 'Quick Actions'];
  createNewKeyword: boolean;
  productDetails: any = [];
  // Required for Pagination
  totalItems: number;
  currentpageIndex: number;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  isLoading: boolean;
  constructor(public router: Router, public jobsService: JobsService) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.getDetails(this.currentpageIndex);
  }

  addNewKeyword(event) {
    if (event) {
      this.createNewKeyword = true;
    }
  }

  navigateToTabs(tabName) {
    if (tabName) {
      this.router.navigate([tabName]);
    }
  }
  onPageChange(event) {
    this.currentpageIndex = event.offset;
    this.limitPerPage = event.limitPerPage;
    console.log('CurrentPageIndex', this.currentpageIndex);
    this.getDetails(this.currentpageIndex);
  }

  getBackgroundColor(product) {
    return product.status.toLowerCase() === 'active' ? '#2A2073 ' : 'rgb(219, 220, 220)';
  }

  getDetails(currentPageIndex) {
    this.jobsService.getAllOrganicJobDetails(currentPageIndex, this.limitPerPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Keyword Relevance Job Details', err);
      this.isLoading = false;
    });
  }

  checkStatus(status) {
    if (status.toLowerCase() === 'inactive') {
      return true;
    } else {
      return false;
    }
  }

  navigateToDashboard(product) {
    this.router.navigate(['/keywordset/' + product.id + '/dashboard']);
  }

  createdDate(date) {
    const d = new Date(0);
    d.setUTCSeconds(date);
    d.toLocaleTimeString();
    // console.log('Date:::', d, 'typeOf', d.toLocaleTimeString(date));
    const stringifedDate = d.toString();
    return stringifedDate.substr(3, stringifedDate.indexOf('+') - 3 );
  }

}
