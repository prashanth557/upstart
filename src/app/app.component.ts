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
  constructor(public _authService: AuthService, public route: ActivatedRoute, public router: Router, public tokenUtil: TokenUtil) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    this.isUserloggedIn = this._authService.isAuthenticated();
    this.userName = Cookie.get('username');
  }

  navigateToPage(event) {
    this.router.navigate([event.link]);
  }

  viewToggle() {
    this.hideNavBar = !this.hideNavBar;
  }

  logoutUser() {
    Cookie.deleteAll();
    this.router.navigate(['/login']);
  }
}
