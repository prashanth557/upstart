import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: Http) { }

  getPrivileges(): Promise<any> {
    return this.http.get('').toPromise().then(res => {
    });
  }

  isAuthenticated() {
      if (Cookie.get('username') && Cookie.get('password')) {
        return true;
      }
      return false;
  }

  getUserToken() {
    return Cookie.get('_token');
  }

  setPrivilages(userName, password, isRemberMeChecked): Promise<any> {
      Cookie.set('username', userName);
      Cookie.set('password', password);
      if (isRemberMeChecked) {
        localStorage.setItem('username', userName);
        localStorage.setItem('password', password);
        localStorage.setItem('isRemberMeChecked', isRemberMeChecked);
      }
      return Promise.resolve({data: 'user details stored successfully'});
  }
}
