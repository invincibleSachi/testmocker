import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { LoginRequest } from '../../models/login_model';
import { UserRegistrationRequest } from '../../models/register_model';
import { VerifyOtpRequest } from 'src/app/models/verify_otp_model';

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
  contactPerson: string;
  employeeId: string;
  password: string;
  cpassword: string;
  otp: string;
  signUpDone = false;
  showRegistrationForm = false;
  isLoggedIn = false;

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.signUpDone = false;
    this.showRegistrationForm = false;
  }

  toggleForm() {
    this.showRegistrationForm = true;
  }

  login() {

  }

  logout() {

  }

  signUp() {

    this.signUpDone = true;
    const registerReq = new UserRegistrationRequest();
    registerReq.email = this.email;
    registerReq.teamName = this.teamName;
    registerReq.employeeId = this.employeeId;
    registerReq.contactPerson = this.contactPerson;
    registerReq.password = this.password;
    registerReq.cpassword = this.cpassword;
    console.log(registerReq);
    this.authService.register(registerReq).subscribe(result => {
      console.log(result);
      alert('OTP sent to your mail.\n Id please verify OTP');
    });
    this.signUpDone = true;
  }

  verifyOtp() {
    const verifyOtpReq = new VerifyOtpRequest();
    verifyOtpReq.otp = Number(this.otp);
    verifyOtpReq.teamName = this.teamName;
    verifyOtpReq.purpose = 'user_Registration';
    this.authService.verifyOtp(verifyOtpReq).subscribe(result => {
      alert('OTP has been verified successfully.');
    });
    this.showRegistrationForm = false;
  }

}
