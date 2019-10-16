import { Injectable } from '@angular/core';
import { HttpWrapper, IRequestOptions } from '../services/http-wrapper/http-wrapper';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { UrlConfig } from '../config/url-config';
import { Cookie} from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  config: any = new UrlConfig().getConfig();
  constructor(public http: HttpWrapper) {
   }

  validateUserDetails(username, password): Promise<any> {
    const url = this.config.loginUrl;
    console.log('Login Url', url);
    const options: IRequestOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    };
    const body = {
      'username': username,
      'password': password,
    };
    return this.http.authenticatedPost(url, body, options).toPromise().then( (res: any) => {
      if (res) {
        Cookie.set('_token', res.accessToken);
        Cookie.set('refreshToken', res.refresh_token);
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getToken() {
    return Cookie.get('_token');
  }

  public handleError(error: any): Promise<any> {
    console.error('An error in api execution occurred', error);
    return Promise.reject(error.message || error);
  }
}

