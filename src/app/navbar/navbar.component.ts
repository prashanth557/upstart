import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() clickTab = new EventEmitter();
  constructor(public router: Router) { }

  ngOnInit() {
  }

  viewToggle() {
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('active');
    });
  }

  navigateToPage(link) {
    this.clickTab.emit({link: link});
  }

}
