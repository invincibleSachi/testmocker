import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login_model';
import { LoginResponse } from '../models/login_resp_model';
import { VerifyOtpRequest } from '../models/verify_otp_model';
import { UserRegistrationRequest } from '../models/register_model';
import { CommonHttpResponse } from '../models/common-resp';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(loginReq: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.API_ENDPOINT}/auth/login`,
      loginReq
    );
  }
  register(registerReq: UserRegistrationRequest): Observable<UserRegistrationRequest> {
    return this.http.post<UserRegistrationRequest>(
      `${environment.API_ENDPOINT}/auth/register`,
      registerReq
    );
  }

  verifyOtp(verifyOtpReq: VerifyOtpRequest): Observable<VerifyOtpRequest> {
    return this.http.post<VerifyOtpRequest>(
      `${environment.API_ENDPOINT}/auth/verifyOtp`,
      verifyOtpReq
    );
  }

  startServer(request:Object): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/auth/start-services`,request
    );
  }
}
