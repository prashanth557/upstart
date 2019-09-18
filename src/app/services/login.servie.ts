import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlConfig } from '../config/url-config';
import { Cookie} from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  config: any = new UrlConfig().getConfig();
  constructor(public http: Http) {
   }

  validateUserDetails(username, password): Promise<any> {
    const url = this.config.loginUrl;
    console.log('Login Url', url);
    const body = {
      'username': username,
      'password': password,
      'grantType': password
    };
    return this.http.post(url, body).toPromise().then(res => {
      if (res) {
        Cookie.set('_token', JSON.stringify(res));
      }
    });
  }

  getToken() {
    return Cookie.get('_token');
  }
}
