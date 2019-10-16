import { Injectable } from '@angular/core';
import { HttpWrapper, IRequestOptions } from '../services/http-wrapper/http-wrapper';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { from } from 'rxjs';
import { UrlConfig } from '../config/url-config';
import { Cookie } from 'ng2-cookies';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config: any = new UrlConfig().getConfig();
  constructor(public http: HttpWrapper) { }

  getPrivileges(): Promise<any> {
    return this.http.authenticatedGet('').toPromise().then(res => {
    });
  }

  isAuthenticated() {
      if (Cookie.get('_token')) {
        return true;
      }
      return false;
  }

  getUserToken() {
    return Cookie.get('_token');
  }

  validateUserDetails(username, password, isRemberMeChecked): Promise<any> {
    const url = this.config.loginUrl;
    console.log('Login Url', url);
    const options: IRequestOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    };
    const body = {
      'password': password,
      'username': username
    };
    return this.http.authenticatedPost(url, body, options).toPromise().then((res: any) => {
      if (res) {
        Cookie.set('_token', res.access_token);
        Cookie.set('refresh_token', res.refresh_token);
      }
      return res;
    });
  }

  setPrivilages(userName, password, isRemberMeChecked) {
      Cookie.set('username', userName);
      Cookie.set('password', password);
      if (isRemberMeChecked) {
        localStorage.setItem('username', userName);
        localStorage.setItem('password', password);
        localStorage.setItem('isRemberMeChecked', isRemberMeChecked);
      }
  }

  public handleError(error: any): Promise<any> {
    console.error('An error in api execution occurred', error);
    return Promise.reject(error.message || error);
  }

  getAuthToken() {
    return Cookie.get('_token');
  }

  refreshToken(): Observable<any> {
    console.log('refresh token called');
    const url = this.config.homeUrl + '/token';
    return this.http.authenticatedGet(url);
  }

  deleteTokens() {
    Cookie.deleteAll();
  }

  resetPassword(username) {
    const body = {
      'email': username
    };
    const url = this.config.forgotPasswordUrl;
    return this.http.authenticatedPost(url, body).toPromise().then((res: any) => {
      if (res) {
        return res;
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  changePassword(oldPassword, newPassword, confirmPassword) {
    const body = {
      'currentPassword': oldPassword,
      'newPassword': newPassword,
      'confirmPassword': confirmPassword
    };
    const url = this.config.changePasswordUrl;
    return this.http.authenticatedPost(url, body).toPromise().then((res: any) => {
      if (res) {
        return res;
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  fetchUserDetails() {
    const token = this.getAuthToken();
    const decodedToken = jwt_decode(token);
    console.log('decoded Token', decodedToken);
    return decodedToken;
  }
}
