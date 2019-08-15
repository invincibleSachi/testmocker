import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usernameLogin: string;
  passwordLogin: string;
  email: string;
  teamName: string;
  teamContact: string;
  employeeId: string;
  otp: string;
  signUpDone = false;
  showRegistrationForm = true;
  isLoggedIn = false;

  constructor() { }

  ngOnInit() {
  }

  toggleForm() {

  }

  login() {

  }

  logout() {

  }

  signUp() {

  }

  verifyOtp() {

  }

}
