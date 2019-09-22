import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Params, Router, RouterStateSnapshot} from '@angular/router';
import { Location } from '@angular/common';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: String = '';
  password: String = '';
  queryParams: any = {};
  showForgotPasswordPage: boolean;
  isRemberMeChecked: boolean;
  showLoginPage: boolean;
  constructor(public _authService: AuthService, private route: ActivatedRoute, public router: Router, public location: Location) { }

  ngOnInit() {
    if (this.checkIfUserLoggedin()) {
      this.location.back();
      this.showLoginPage = false;
    } else {
      this.showLoginPage = true;
      this.autoFillUserDetails();
      this.route.queryParams
      .subscribe((params: any) => {
        this.queryParams = this.getValidFilters(params);
        this.showForgotPasswordPage = this.queryParams.forgotPassword ? true : false;
      });
    }
  }

  checkIfUserLoggedin() {
    if (Cookie.get('_token')) {
      return true;
    } return false;
  }

  autoFillUserDetails() {
    console.log('userName', JSON.parse(JSON.stringify(localStorage.getItem('username'))));
    this.userName = localStorage.getItem('username') ? JSON.parse(JSON.stringify(localStorage.getItem('username'))) : '';
    this.password = localStorage.getItem('password') ? JSON.parse(JSON.stringify(localStorage.getItem('password'))) : '';
    this.isRemberMeChecked = localStorage.getItem('isRemberMeChecked') ?
    JSON.parse(JSON.stringify(localStorage.getItem('isRemberMeChecked'))) : false;
  }

  login() {
    if (this.userName && this.password) {
      this._authService.validateUserDetails(this.userName, this.password, this.isRemberMeChecked).then(res => {
       if (res) {
         // Navigating to home page.
         this.location.back();
       }
      });
    }
  }

  getValidFilters(params: any): any {
    const validParams = {};
    for (const key in params) {
      if (this.isValidRoute(key)) {
        validParams[key] = params[key];
      }
    }
    return validParams;
  }

  // Add any additional routes.
  isValidRoute(key: string): boolean {
    switch (key) {
      case 'forgotPassword':
        return true;
      default:
        return false;
    }
  }

  navigateTo(route) {
    if (route === 'forgotPassword') {
      this.queryParams.forgotPassword = true;
    }
    this.router.navigate(['/login'], { queryParams: this.queryParams});
  }

}
