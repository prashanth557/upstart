import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() hideNavBar: boolean;
  @Output() clickTab = new EventEmitter();
  @Output() toggleNavBar = new EventEmitter();
  isAdmin: boolean;
  constructor(public router: Router) { }

  ngOnInit() {
    this.isAdmin = Cookie.get('role') === 'Admin' ? true : false;
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

  isActive(routeName): Boolean {
    try {
      const urlArray = this.router.url.split('/');
      if ((urlArray[1] && urlArray[1] === routeName)
      || (urlArray[0] && urlArray[0] === routeName)
      || (urlArray[2] && urlArray[2] === routeName)) {
        return true;
      }
    } catch (e) {
      console.log('Error occured', e);
    }
    return false;
  }

  showNavBar() {
    this.toggleNavBar.emit({showNavBar: true});
  }

}
