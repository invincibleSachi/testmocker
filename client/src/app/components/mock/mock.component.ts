import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import { CookieService } from 'ngx-cookie-service';
import { Headers } from '../../models/header-model';
import { CreateService } from '../../models/create-service-req';
import { CreateMockService } from '../../services/create-mock-service';
import { MultipartFileUplod } from '../../models/multipart-file-model';
import { GerServiceList } from '../../models/get-service-resp';
import { ApiEndpointModel } from '../../models/api-endpoint-model';
@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css'],
})
export class MockComponent implements OnInit {
  baseUrl: string;
  selectedApiType: string;
  services: string[];
  headerKeyRequest: string[];
  headerValueRequest: string[];
  qParamKeyRequest: string[];
  qParamValueRequest: string[];
  headerKeyResponse: string[];
  headerValueResponse: string[];
  qParamKeyResponse: string[];
  qParamValueResponse: string[];
  contentTypeRequest: string;
  contentTypeResponse: string;
  requestBodyTokens: Map<string, string>;
  responseBodyTokens: Map<string, string>;
  bodyRequest: string;
  bodyResponse: string;
  headerChecked: boolean = false;
  bodyChecked: boolean = false;
  qParamChecked: boolean = false;
  responseChecked: boolean = false;
  responseHeaderChk: boolean = false;
  headers: Headers[] = [];
  responseHeaders: Headers[] = [];
  queryParams: Headers[] = [];
  multipartFiles: MultipartFileUplod[] = [];
  bodyStr: string = undefined;
  responseMultipartFiles: MultipartFileUplod[] = [];
  showBody: boolean = false;
  showBodyResponse: boolean = false;
  serviceName: string;
  setTokens = false;
  teamName: string;
  apiEndPoint: string;
  servicesList: string[] = [];
  multipartKeyRequest: string[] = [];
  multipartFileRequest: string[] = [];
  multipartKeyResponse: string[] = [];
  multipartFileResponse: string[] = [];

  filemenuResponse: string;

  constructor(private cookieService: CookieService, private createMockService: CreateMockService) {
    this.teamName = this.cookieService.get('teamName');
    this.servicesList = [];
    this.headerKeyRequest = [];
    this.headerValueRequest = [];
    this.qParamKeyRequest = [];
    this.qParamValueRequest = [];
    this.headerKeyResponse = [];
    this.headerValueResponse = [];
    this.qParamKeyResponse = [];
    this.qParamValueResponse = [];
    this.headerValueResponse = [];
    this.contentTypeRequest = "";
    this.bodyRequest = "";
    this.headerChecked = false;
    this.bodyChecked = false;
    this.qParamChecked = false;
    this.responseChecked = false;
    this.responseHeaderChk = false;
    this.setTokens = false;
    this.headers = [];
    this.queryParams = [];
    this.multipartFiles = [];
    this.responseHeaders = [];
    this.requestBodyTokens = new Map<string, string>();
    this.responseBodyTokens = new Map<string, string>();
  }

  headerSelected(event: Event) {
    console.log(event);
    if ((<HTMLInputElement>event.target).checked) {
      this.headerChecked = true;
    } else {
      this.headerChecked = false;
      this.headers = [];
    }
  }

  bodySelected(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.bodyChecked = true;
    } else {
      this.bodyChecked = false;
      this.showBody = false;
      this.multipartFiles = [];
      this.bodyRequest = "";
    }

  }
  responseSelected(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.responseChecked = true;
    } else {
      this.responseChecked = false;
      this.showBody = false;
      this.responseMultipartFiles = [];
      this.showBodyResponse = undefined;
    }

  }
  qParamSelected(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.qParamChecked = true;
    } else {
      this.qParamChecked = false;
      this.queryParams = [];
    }
  }

  responseHeaderSelected(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.responseHeaderChk = true;
    } else {
      this.responseHeaderChk = false;
      this.responseHeaders = [];
    }
  }

  ngOnInit() {
  }
  addHeader() {
    let header = new Headers();
    this.headers.push(header);
  }

  addBody() {
    this.showBody = true;
  }
  addResponseBody() {
    this.showBodyResponse = true;
  }

  addResponseHeaders() {
    let responseHeader = new Headers();
    this.responseHeaders.push(responseHeader);
  }
  addQueryParam() {
    let header = new Headers();
    this.queryParams.push(header);
  }

  onFileChange(event: Event, index: number) {

  }

  addMultipart() {
    let multipart: MultipartFileUplod = new MultipartFileUplod();
    this.multipartFiles.push(multipart);
  }

  deleteFileUpload(index: number) {
    this.multipartFiles.splice(index, 1);
  }

  addMultipartResponse() {
    let multipart: MultipartFileUplod = new MultipartFileUplod();
    this.responseMultipartFiles.push(multipart);
  }
  deleteFileUploadResponse(index: number) {
    this.responseMultipartFiles.splice(index, 1);
  }

  createNewService() {
    var service = new CreateService();
    service.serviceName = this.serviceName;
    service.teamName = this.teamName;
    this.createMockService.createService(service).subscribe(result => {
      console.log(result);
      alert(result.msg);
    }, err => {
      alert('service already exists');
    });
  }

  tabchanged(event: Event) {
    if (event['index'] == 0) {

    } else if (event['index'] == 1) {
      this.selectApiEndpointTab();
    } else if (event['index'] == 2) {
    }
  }


  selectApiEndpointTab() {
    this.createMockService.getServices(this.teamName.toLowerCase().replace(' ', '_')).subscribe(result => {
      console.log(result);
      result.forEach((res) => {
        this.servicesList.push(res.service_name);
      });
    });

  }

  submitApiEndpointDef() {
    if (!this.serviceName) {
      alert('select a service');
    }

    if (!this.apiEndPoint) {
      alert('please Enter a valid Api Name');
    }


    const reqHeadersMap: Map<string, string> = new Map<string, string>();
    const reqQParamMap: Map<string, string> = new Map<string, string>();
    const respHeadersMap: Map<string, string> = new Map<string, string>();
    const reqMultipartFiles: Map<string, string> = new Map<string, string>();
    const respMultipartFiles: Map<string, string> = new Map<string, string>();

    console.log('headers');
    this.headers.forEach((header, index) => {
      reqHeadersMap.set(this.headerKeyRequest[index], this.headerValueRequest[index]);
    });
    console.log(this.headers);
    console.log('queryParams');
    this.queryParams.forEach((qParam, index) => {
      reqQParamMap.set(this.qParamKeyRequest[index], this.qParamValueRequest[index]);
    });
    console.log(this.queryParams);
    console.log('bodyRequest');
    console.log(this.bodyRequest);
    console.log('responseHeaders');
    console.log(this.responseHeaders);
    this.responseHeaders.forEach((rHeaders, index) => {
      respHeadersMap.set(this.headerKeyResponse[index], this.headerKeyResponse[index]);
    });
    console.log('bodyResponse');
    console.log(this.bodyResponse);
    this.multipartFiles.forEach((mPartRequest, index) => {
      reqMultipartFiles.set(this.multipartKeyRequest[index], this.multipartFileRequest[index]);
    });

    this.responseMultipartFiles.forEach((mPartRequest, index) => {
      respMultipartFiles.set(this.multipartKeyResponse[index], this.multipartKeyResponse[index]);
    });

    const apiEndpointDef = new ApiEndpointModel();
    apiEndpointDef.apiEndpointName = this.apiEndPoint;
    apiEndpointDef.serviceName = this.serviceName;
    apiEndpointDef.apiYype = this.selectedApiType;
    apiEndpointDef.requestHeaders = reqHeadersMap;
    apiEndpointDef.requestBody.body = this.bodyRequest;
    apiEndpointDef.requestBody.multipart = reqMultipartFiles;
    apiEndpointDef.responseBody.multipart = respMultipartFiles;
    apiEndpointDef.responseBody.body = this.bodyResponse;
    apiEndpointDef.requestBody.contentType = this.contentTypeRequest;
    apiEndpointDef.responseBody.contentType = this.contentTypeResponse;
    const regex = /##.*##/gi;
    const responseTokenMap: Map<string, any> = new Map<string, any>();
    const requestTokenMap: Map<string, any> = new Map<string, any>();
    if (this.bodyRequest) {
      const requestTokens = this.bodyRequest.match(regex);

      requestTokens.forEach(token => {
        requestTokenMap.set(token, undefined);
      });
    }
    if (this.bodyResponse) {

      const responseTokens = this.bodyResponse.match(regex);
      responseTokens.forEach(token => {
        responseTokenMap.set(token, undefined);
      });
    }

    if (responseTokenMap.size > 0 || requestTokenMap.size > 0) {
    }

  }

}
