import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teamName: string;
  contactPerson: string;
  email: string;
  noOfServices: string;
  restEndpoints: number;
  soapEndpoints: number;
  uniqueName: string;
  serverStatus: string;
  serverStatusClass: string;
  buttonClass: string;
  serverIconClass: string;
  serverBtnText: string

  constructor(private cookieService: CookieService) {
    this.teamName = this.cookieService.get('teamName');
    this.contactPerson = this.cookieService.get('contactPerson');
    this.email = this.cookieService.get('email');
    this.uniqueName = this.cookieService.get('uniqueName');
    this.restEndpoints = 1;
    this.soapEndpoints = 1;
    this.serverStatus = 'STOPPED';
    this.serverStatusClass = 'stopped-server-status';
    this.buttonClass = 'btn btn-danger btn-lg';
    this.serverIconClass = 'fa fa-play';
    this.serverBtnText = 'START';
  }

  ngOnInit() {
    this.teamName = this.cookieService.get('teamName');
    this.contactPerson = this.cookieService.get('contactPerson');
    this.email = this.cookieService.get('email');
    this.uniqueName = this.cookieService.get('uniqueName');
    this.restEndpoints = 1;
    this.soapEndpoints = 1;
  }

  onChangeServerStatus() {
    if (this.serverStatus === 'STOPPED') {
      this.serverStatus = 'RUNNING';
      this.serverStatusClass = 'running-server-status';
      this.buttonClass = 'btn btn-success btn-lg';
      this.serverIconClass = 'fa fa-stop';
      this.serverBtnText = 'STOP';
      
    } else {
      this.serverStatus = 'STOPPED';
      this.serverStatusClass = 'stopped-server-status';
      this.buttonClass = 'btn btn-danger btn-lg';
      this.serverIconClass = 'fa fa-play';
      this.serverBtnText = 'START';
    }
  }

}
