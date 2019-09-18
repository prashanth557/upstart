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
  actionItems = [{ icon: 'Edit', route: 'keywordset/keywordresultdash' },
  { icon: 'Deactivate', route: '' },
  { icon: 'Last run result summary', route: 'keywordset/keywordresultdash' },
  { icon: 'Run History', route: 'keywordset/organicRunHistory' },
  { icon: 'Schedule', route: 'schedulesList' }];
  // Table Headers
  jobHeaders = ['Job Title', 'Keyword Input', 'Status', 'Last Run At', 'Created At', 'Quick Actions'];
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

  getDetails(currentPageIndex) {
    this.jobsService.getAllKeywordRelevanceJobDetails(this.offsetPage).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Keyword Relevance Job Details', err);
      this.isLoading = false;
    });
  }

}
