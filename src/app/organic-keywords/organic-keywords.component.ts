import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  productDetails: any = [{title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: '',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Image Archive Crawl', input: 'My Keywords',
  status: 'Running', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 11, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true},
  {title: 'Adesso Brand Crawl', input: 'Floor Lamps',
  status: 'Ready', lastRun: 'Feb 15, 2019 @11:30 AM',
  createdAt: 'Feb 15, 2019 @11:30 AM', showActions: true}];
  // Table Headers
  jobHeaders = ['Job Title', 'Keyword Input', 'Status', 'Last Run At', 'Created At', 'Quick Actions'];
  createNewKeyword: boolean;
  constructor(public router: Router) { }

  ngOnInit() {
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

}
