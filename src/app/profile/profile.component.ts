import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentPassword: String = '';
  newPassword: String = '';
  confirmPassword: String = '';
  editFirstName: boolean;
  editLastName: boolean;
  constructor() { }

  ngOnInit() {
  }

  changePassword() {
    console.log('Change password is called');
  }

  editDetails(param) {
    if ( param.toLowerCase() === 'firstname') {
      this.editFirstName = true;
    }
    if ( param.toLowerCase() === 'lastname') {
      this.editLastName = true;
    }
  }

}
