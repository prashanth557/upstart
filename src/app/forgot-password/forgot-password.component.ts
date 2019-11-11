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
  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

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
      this.authService.resetPassword(this.forgotPasswordForm.controls.email).then( res => {
        if (res) {
          this.isPasswordSent = true;
          this.passwordResetMsg = 'Your password has been sent to your email';
        }
      }).catch(err => {
        this.showErrorMessage = err.error.message;
      });
    }
  }

}
