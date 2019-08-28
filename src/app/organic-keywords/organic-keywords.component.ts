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
  constructor(public router: Router) { }

  ngOnInit() {
  }

  navigateToTabs(tabName) {
    this.router.navigate(['/keywordresultdash']);
  }

}
