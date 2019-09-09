import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organic-run-history',
  templateUrl: './organic-run-history.component.html',
  styleUrls: ['./organic-run-history.component.scss']
})
export class OrganicRunHistoryComponent implements OnInit {
  headerTitle: String = 'Job Run History';
  // Details to be displayed inside table
  productDetails: any = [{sno: '1', executionTime: 'Sun, 11 Aug 2019 at 4:38:19 PM',
  status: 'Success', showActions: true}];
  actionItems = [{icon: 'View Result', route: '/keywordset/organicJobList'}];
  // Table Headers
  jobHeaders = ['#', 'Run Executed at', 'Status', 'Result'];
  constructor(public router: Router) { }

  ngOnInit() {
  }

  navigateToTabs(route) {
    this.router.navigate([route]);
  }
}
