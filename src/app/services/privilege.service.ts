import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(public http: Http) { }

  getPrivileges(): Promise<any> {
    return this.http.get('').toPromise().then(res => {
    });
  }

  getUserToken() {
    return Cookie.get('_token');
  }
}
