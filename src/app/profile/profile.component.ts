import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
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
  passwordMistach: boolean;
  changePasswordForm: FormGroup;
  submitted: boolean;
  updateMesssage: string;
  userDetails: any;
  constructor(public formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    // this.changePasswordForm = this.formBuilder.group({
    //   currentPassword: ['', [Validators.required, Validators.email]],
    //   newPasssword: ['', Validators.required, Validators.minLength(6)],
    //   confirmNewPassword: ['', Validators.required, Validators.minLength(6)]
    // }, {validator: this.checkPasswords });
    this.fetchUserDetails();
  }

  // get passwordFields() {
  //   return this.changePasswordForm.controls;
  // }

  // checkPasswords(group: FormGroup) {
  //   const pass = group.get('newPasssword').value;
  //   const confirmPass = group.get('confirmNewPassword').value;
  //   return pass === confirmPass ? null : { notSame: true };
  // }

  fetchUserDetails() {
    this.userDetails = this.authService.fetchUserDetails();
    if (this.userDetails.extension_isAdmin) {
      this.userDetails.role = 'Admin';
    } else {
      this.userDetails.role = 'Vendor';
    }
  }

  checkPasswords() {
    return this.newPassword === this.confirmPassword ? true : false;
  }

  changePassword() {
    this.submitted = true;
    if (this.checkPasswords()) {
      this.passwordMistach = false;
      this.authService.changePassword(this.currentPassword, this.newPassword, this.confirmPassword).then(res => {
        if (res) {
          this.updateMesssage = 'Password updated successfully';
          this.resetPasswordFields();
        }
      });
    } else {
      this.passwordMistach = true;
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  editDetails(param) {
    if (param.toLowerCase() === 'firstname') {
      this.editFirstName = true;
    }
    if (param.toLowerCase() === 'lastname') {
      this.editLastName = true;
    }
  }

  restoreDetails() {
    this.editFirstName = false;
    this.editLastName = false;
  }

  resetPasswordFields() {
    // this.changePasswordForm.reset();
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  onFileChanged(event) {

  }

}
