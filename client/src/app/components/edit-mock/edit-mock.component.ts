import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import { EditMockService } from '../../services/edit-mock.service';
import { CreateMockService } from '../../services/create-mock-service';
import { AuthServiceService } from '../../services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { GerServiceList } from '../../models/get-service-resp';
import { ApiEndpointModel } from '../../models/api-endpoint-model'
import { SoapEndPointsModel } from '../../models/soap-api-endpoints'

@Component({
  selector: 'app-edit-mock',
  templateUrl: './edit-mock.component.html',
  styleUrls: ['./edit-mock.component.css']
})
export class EditMockComponent implements OnInit {

  constructor(private cookieService: CookieService, private editMockService: EditMockService, private createMockService: CreateMockService, private authServices: AuthServiceService) {
    this.servicesList = [];
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');

  }
  teamName: string;
  uniqueName: string;
  servicesList: string[] = [];
  restEndpoint: ApiEndpointModel;
  soapEndpoint: SoapEndPointsModel;
  restEndPointNames: string[] = [];
  soapEndPointNames: string[] = [];
  serviceName: string = undefined;
  apiEndpointNameSelected: string = undefined;
  soapEndpointNameSelected: string = undefined;
  ngOnInit() {
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');
    this.getServicesList();
    this.restEndpoint = new ApiEndpointModel();
    this.soapEndpoint = new SoapEndPointsModel();
    this.restEndPointNames = [];
    this.soapEndPointNames = [];
    this.serviceName = undefined;
    this.apiEndpointNameSelected = undefined;
    this.soapEndpointNameSelected = undefined;
  }

  tabchanged(event: Event) {
    if (event['index'] == 0) {

    } else if (event['index'] == 1) {
    }
  }

  getServicesList() {
    this.createMockService.getServices(this.teamName.toLowerCase().replace(' ', '_')).subscribe(result => {
      console.log(result);
      result.forEach((res) => {
        this.servicesList.push(res.service_name);
      });
    });
  }
  getApiEndPointsList() {
    this.editMockService.getApiEndpointsNames(this.uniqueName, this.serviceName).subscribe(result => {
      result.forEach((res) => {
        this.restEndPointNames.push(res['apiEndpointName']);
      });
    });
    console.log('restendpoint array');
    console.log(this.restEndPointNames);
  }
  getSoapEndpointsList() {
    this.editMockService.getSoapEndpointsNames(this.uniqueName, this.serviceName).subscribe(result => {
      result.forEach((res) => {
        this.soapEndPointNames.push(res['soapEndpointName']);
      })
    })
  }
  onServiceChange(serviceName) {
    console.log('service selected ' + serviceName);
    this.serviceName = serviceName;
    this.restEndpoint = new ApiEndpointModel();
    this.soapEndpoint = new SoapEndPointsModel();
    this.restEndPointNames = [];
    this.soapEndPointNames = [];
    this.getApiEndPointsList();
    this.getSoapEndpointsList();
  }
  onApiChange(apiEndPointName) {
    console.log('api selected ' + apiEndPointName)
    this.restEndpoint = new ApiEndpointModel();
    this.apiEndpointNameSelected = apiEndPointName;
    this.editMockService.getApiEndpoint(this.uniqueName, this.serviceName, this.apiEndpointNameSelected).subscribe(result => {
      this.restEndpoint = result;
    });
    console.log(this.restEndpoint);
  }
  onSoapChange() {

  }

  updateApiEndpoint() {
    console.log('updating api endpoint');
    console.log(this.restEndpoint);
    this.editMockService.editApiEndPoint(this.restEndpoint).subscribe(result => {
      console.log(result);
      alert(result.msg);
    })
  }
  deleteApiEndpoint() {
    console.log('deleting api endpoint');
  }
  updateSoapEndpoint() {

  }
  deleteSoapEndpoint() {

  }
}
