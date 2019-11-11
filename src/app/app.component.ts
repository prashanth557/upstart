import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  ActivatedRoute,
  ActivationEnd,
  Event,
  NavigationEnd,
  Params,
  Router,
  RoutesRecognized
} from '@angular/router';
import { TokenUtil } from './utils/token.util';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  privileges: any = { admin_access: true };
  hideNavBar: boolean;
  isUserloggedIn: boolean;
  userName: string;
  userDetails: any;
  role: string;
  constructor(public _authService: AuthService, public route: ActivatedRoute, public router: Router, public tokenUtil: TokenUtil) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    this.isUserloggedIn = this._authService.isAuthenticated();
    if (this.isUserloggedIn) {
      this.fetchUserDetails();
    }
  }

  fetchUserDetails() {
    this.role = Cookie.get('role');
    if (!this.role) {
      this.userDetails = this._authService.fetchUserDetails();
      if (this.userDetails.extension_isAdmin) {
        this.role = 'Admin';
        Cookie.set('role', 'Admin');
      } else {
        this.role = 'Vendor';
        Cookie.set('role', 'Vendor');
      }
    }
  }

  navigateToPage(event) {
    this.router.navigate([event.link]);
  }

  viewToggle() {
    this.hideNavBar = !this.hideNavBar;
  }

  logoutUser() {
    Cookie.deleteAll( '/exucrawl' );
    this.router.navigate(['/login']);
  }
}
