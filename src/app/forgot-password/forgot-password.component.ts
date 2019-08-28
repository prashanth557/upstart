import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: String = '';
  forgotPasswordForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  resetPasssword() {
  }

}
