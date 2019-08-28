import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from '../services/privilege.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: String = '';
  password: String = '';
  constructor(public privilegeService: PrivilegeService) { }

  ngOnInit() {
  }

  login() {
    if (this.userName && this.password) {
      this.privilegeService.getPrivileges().then(res => {
        console.log('RES::', res);
      });
    }
  }

}
