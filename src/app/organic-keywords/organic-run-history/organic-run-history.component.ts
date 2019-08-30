import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organic-run-history',
  templateUrl: './organic-run-history.component.html',
  styleUrls: ['./organic-run-history.component.scss']
})
export class OrganicRunHistoryComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  loadResults() {
    this.router.navigate(['/organicJobList']);
  }

}
