import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: Http) { }

  validateUserDetails(username, password): Promise<any> {
    return this.http.get('').toPromise().then(res => {
    });
  }

  getToken() {
      
  }
}
