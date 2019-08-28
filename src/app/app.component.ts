import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from './services/privilege.service';
import { Router } from '@angular/router';
import { TokenUtil } from './utils/token.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  privileges: any = { admin_access: true };
  constructor(public privilegeService: PrivilegeService, public router: Router, public tokenUtil: TokenUtil) {

  }

  ngOnInit() {
    // this.getUserDetails();
  }

  getUserDetails(): void {
    const tokenData: any = this.tokenUtil.getTokenData();
    if (tokenData && tokenData.user) {
      this.privileges.admin_access = true;
    } else {
      this.privileges.admin_access = false;
      this.router.navigate(['/login']);
    }
  }

  navigateToPage(event) {
    this.router.navigate([event.link]);
  }
}
