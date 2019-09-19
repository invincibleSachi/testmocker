import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teamName: string;
  contactPerson: string;
  email: string;
  noOfServices: number;
  restEndpoints: number;
  soapEndpoints: number;
  uniqueName: string;
  serverStatus: string;
  serverStatusClass: string;
  buttonClass: string;
  serverIconClass: string;
  serverBtnText: string;
  portNumber: number;

  constructor(private cookieService: CookieService, private authService: AuthServiceService) {
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
    this.authService.getServicesCounts(this.uniqueName).subscribe(result => {
      this.noOfServices = result.serversCount;
      this.restEndpoints = result.apiCount;
      this.soapEndpoints = result.soapCount;
      this.portNumber = result.portNumber;
      if (this.noOfServices > 0) {
        this.serverStatus = 'RUNNING';
        this.serverStatusClass = 'running-server-status';
        this.buttonClass = 'btn btn-success btn-lg';
        this.serverIconClass = 'fa fa-stop';
        this.serverBtnText = 'STOP';
      }
    });
  }

  onChangeServerStatus() {
    if (this.serverStatus === 'STOPPED') {

      const request = { uniqueName: this.uniqueName };
      this.authService.startServer(request).subscribe(result => {
        console.log(result);
        alert(result.msg);
        if (result.msg !== 'no api end points available.') {
          this.serverStatus = 'RUNNING';
          this.serverStatusClass = 'running-server-status';
          this.buttonClass = 'btn btn-success btn-lg';
          this.serverIconClass = 'fa fa-stop';
          this.serverBtnText = 'STOP';
          this.authService.getServicesCounts(this.uniqueName).subscribe(result1 => {
            this.noOfServices = result1.serversCount;
            this.restEndpoints = result1.apiCount;
            this.soapEndpoints = result1.soapCount;
            this.portNumber = result1.portNumber;
          });
        }


      });

    } else {
      this.serverStatus = 'STOPPED';
      this.serverStatusClass = 'stopped-server-status';
      this.buttonClass = 'btn btn-danger btn-lg';
      this.serverIconClass = 'fa fa-play';
      this.serverBtnText = 'START';
      const request = { uniqueName: this.uniqueName };
      this.authService.stopServer(request).subscribe(result => {
        console.log(result);
        alert(result.msg);
        this.authService.getServicesCounts(this.uniqueName).subscribe(result1 => {
          this.noOfServices = result1.serversCount;
          this.restEndpoints = result1.apiCount;
          this.soapEndpoints = result1.soapCount;
          this.portNumber = result1.portNumber;
        });
      });
    }
  }

}
