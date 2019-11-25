import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [FormBuilder]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isPasswordSent: boolean;
  passwordResetMsg: string;
  submitted: boolean;
  showErrorMessage: string;
  constructor(public service: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
  });
  }

  get forgotForm() {
    return this.forgotPasswordForm.controls;
  }

  resetPassword(isValid) {
    this.submitted = true;
    if (isValid) {
      console.log('this.forgotPasswordForm.controls.email', this.forgotPasswordForm.controls.email);
      this.service.changeUserPassword(this.forgotPasswordForm.controls.email.value)
      .then( (res: any) => {
          this.isPasswordSent = true;
          this.passwordResetMsg = res;
          this.submitted = false;
      }).catch( (err: any) => {
        if(err && err.status === 200) {
          this.isPasswordSent = true;
          this.passwordResetMsg = 'Email sent to reset password.';
        } else {
          this.showErrorMessage = err && err.error.message && err.error.message ? err.error.message : 'Something went wronng please try after sometime';
        }
        this.submitted = false;
      });
    } else {
      this.showErrorMessage ="Invalid Email Address";
      this.submitted = false;
    }
  }

}
