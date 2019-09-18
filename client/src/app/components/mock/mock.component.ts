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
import { ApiBody } from '../../models/body-model';
import { SoapEndPointsModel } from '../../models/soap-api-endpoints';
@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css'],
})
export class MockComponent implements OnInit {
  baseUrl: string;
  soapwsdl: string;
  selectedApiType: string;
  services: string[];
  headerKeyRequest: string[];
  headerValueRequest: string[];
  qParamKeyRequest: string[];
  qParamValueRequest: string[];
  headerKeyResponse: string[];
  headerValueResponse: string[];
  responseTokenValue: any[];
  requestTokenValue: any[];
  soapRequestTokenKey: any[];
  soapResponseTokenKey: any[];
  soapResponseTokenValue: any[];
  soapRequestTokenValue: any[];
  qParamKeyResponse: string[];
  qParamValueResponse: string[];
  contentTypeRequest: string;
  contentTypeResponse: string;
  requestBodyTokens: Map<string, string>;
  responseBodyTokens: Map<string, string>;
  bodyRequest: string;
  bodyResponse: string;
  responseLogic:string;
  headerChecked = false;
  bodyChecked = false;
  logicChecked=false;
  qParamChecked = false;
  responseChecked = false;
  responseHeaderChk = false;
  headers: Headers[] = [];
  responseHeaders: Headers[] = [];
  soapRequestHeaders: Headers[] = [];
  soapResponseHeaders: Headers[] = [];
  queryParams: Headers[] = [];
  requestMultipartFiles: MultipartFileUplod[] = [];
  bodyStr: string = undefined;
  responseMultipartFiles: MultipartFileUplod[] = [];
  showBody = false;
  showBodyResponse = false;
  showSubmitBtn = false;
  enableSoapSecondaryBtn = false;
  serviceName: string;
  serviceNameFromDropdown: string;
  setTokens = false;
  teamName: string;
  apiEndPoint: string;
  servicesList: string[] = [];
  multipartKeyRequest: string[] = [];
  multipartFileRequest: File[] = [];
  multipartKeyResponse: string[] = [];
  multipartFileResponse: File[] = [];
  addedRequestFiles: File[] = [];
  addedResponseFiles: File[] = [];
  responseTokenMap: Map<string, any> = new Map<string, any>();
  requestTokenMap: Map<string, any> = new Map<string, any>();

  soapResponseTokenMap: Map<string, any> = new Map<string, any>();
  soapRequestTokenMap: Map<string, any> = new Map<string, any>();
  apiEndpointDef: ApiEndpointModel;
  soapEndpointDef: SoapEndPointsModel;

  soapEndPoint: string;
  soapBody: string;
  soapResponse: string;
  soapHeaderKeyResponse: string[] = []
  soapHeaderValueResponse: any[] = [];
  soapHeaderKeyRequest: string[] = []
  soapHeaderValueRequest: any[] = [];

  constructor(private cookieService: CookieService, private createMockService: CreateMockService) {
    this.apiEndpointDef = new ApiEndpointModel();
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
    this.soapwsdl = "";
    this.serviceNameFromDropdown = undefined
    this.headerChecked = false;
    this.bodyChecked = false;
    this.logicChecked=false;
    this.qParamChecked = false;
    this.responseChecked = false;
    this.responseHeaderChk = false;
    this.showSubmitBtn = true;
    this.setTokens = false;
    this.headers = [];
    this.queryParams = [];
    this.responseHeaders = [];
    this.responseTokenValue = [];
    this.requestTokenValue = [];
    this.requestMultipartFiles = [];
    this.responseMultipartFiles = [];
    this.requestBodyTokens = new Map<string, string>();
    this.responseBodyTokens = new Map<string, string>();
    this.responseTokenMap = new Map<string, any>();
    this.requestTokenMap = new Map<string, any>();
    this.soapResponseTokenMap = new Map<string, any>();
    this.soapRequestTokenMap = new Map<string, any>();
    this.responseLogic=undefined;
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
      this.requestMultipartFiles = [];
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
    this.apiEndpointDef = new ApiEndpointModel();
    this.teamName = this.cookieService.get('teamName');
    this.soapEndpointDef = undefined
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
    this.soapwsdl = "";
    this.serviceNameFromDropdown = undefined
    this.headerChecked = false;
    this.bodyChecked = false;
    this.qParamChecked = false;
    this.responseChecked = false;
    this.responseHeaderChk = false;
    this.showSubmitBtn = true;
    this.setTokens = false;
    this.headers = [];
    this.queryParams = [];
    this.responseHeaders = [];
    this.responseTokenValue = [];
    this.requestTokenValue = [];
    this.requestMultipartFiles = [];
    this.responseMultipartFiles = [];
    this.requestBodyTokens = new Map<string, string>();
    this.responseBodyTokens = new Map<string, string>();
    this.responseTokenMap = new Map<string, any>();
    this.requestTokenMap = new Map<string, any>();
    this.soapResponseTokenMap = new Map<string, any>();
    this.soapRequestTokenMap = new Map<string, any>();
    this.addedRequestFiles = [];
    this.addedResponseFiles = [];
    this.soapResponseTokenValue = [];
    this.soapRequestTokenValue = [];
    this.soapHeaderKeyRequest = []
    this.soapHeaderValueRequest = [];
    this.responseLogic=undefined;
  }
  addHeader(endPointType: string, headerType: string) {
    let header = new Headers();
    if (endPointType === 'api' && headerType === 'request') {
      this.headers.push(header);
    } else if (endPointType === 'api' && headerType === 'response') {
      this.responseHeaders.push(header);
    } else if (endPointType === 'soap' && headerType === 'request') {
      this.soapRequestHeaders.push(header);
    } else if (endPointType === 'soap' && headerType === 'response') {
      this.soapResponseHeaders.push(header);
    } else if (endPointType === 'api' && headerType === 'queryParam') {
      this.queryParams.push(header);
    }


  }

  addBody() {
    this.showBody = true;
  }
  addResponseBody() {
    this.showBodyResponse = true;
  }

  onFileChange(event: Event, index: number, type: string) {

    if ((<HTMLInputElement>event.target).files.length > 0) {
      let file: File = (<HTMLInputElement>event.target).files[0];
      let fileName = (<HTMLInputElement>event.target).files[0].name;
      console.log(fileName);
      console.log(type);
      if (type === 'request') {
        this.addedRequestFiles.push(file);
      } else if (type === 'response') {
        this.addedResponseFiles.push(file);
      }
    }
  }


  addMultipart() {
    let multipart: MultipartFileUplod = new MultipartFileUplod();
    this.requestMultipartFiles.push(multipart);
  }

  deleteFileUpload(index: number) {
    this.requestMultipartFiles.splice(index, 1);
  }

  addMultipartResponse() {
    let multipart: MultipartFileUplod = new MultipartFileUplod();
    this.responseMultipartFiles.push(multipart);
  }
  deleteFileUploadResponse(index: number) {
    this.responseMultipartFiles.splice(index, 1);
  }

  onFileUpload(index: number, type: string) {
    console.log(type);
    let file;
    if (type === 'request') {
      file = this.addedRequestFiles[index];
    } else if (type === 'response') {
      file = this.addedResponseFiles[index];
    }

    let formData = new FormData();
    formData.append('uniqueName', this.teamName.trim().toLowerCase().replace(/" "/g, '_'));
    formData.append('serviceName', this.serviceNameFromDropdown);
    formData.append('apiEndoint', this.apiEndPoint);
    formData.append('fileKey', this.multipartKeyRequest[index]);
    formData.append('fileName', this.multipartKeyRequest[index]);
    formData.append('file', file, file.name);
    this.createMockService.uploadMultipartFile(formData, type).subscribe(result => {
      console.log(result);
      alert(result.msg);
    });

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
      this.selectApiEndpointTab();
      this.soapEndpointDef = new SoapEndPointsModel();
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
    console.log(this.serviceNameFromDropdown);
    if (!this.serviceNameFromDropdown) {
      alert('select a service');
    }

    if (!this.apiEndPoint) {
      alert('please Enter a valid Api Name');
    }


    const reqHeadersMap: Map<string, string> = new Map<string, string>();
    const reqQParamMap: Map<string, string> = new Map<string, string>();
    const respHeadersMap: Map<string, string> = new Map<string, string>();
    const reqMultipartFiles: Map<string, File> = new Map<string, File>();
    const respMultipartFiles: Map<string, File> = new Map<string, File>();

    console.log('headers');
    this.headers.forEach((header, index) => {
      if (this.headerValueRequest[index] !== undefined) {
        reqHeadersMap.set(this.headerKeyRequest[index], this.headerValueRequest[index]);
      }
    });
    console.log(this.headers);
    console.log('queryParams');
    this.queryParams.forEach((qParam, index) => {
      if (this.qParamValueRequest[index] !== undefined) {
        reqQParamMap.set(this.qParamKeyRequest[index], this.qParamValueRequest[index]);
      }
    });
    console.log(this.queryParams);
    console.log('bodyRequest');
    console.log(this.bodyRequest);
    console.log('responseHeaders');
    console.log(this.responseHeaders);
    this.responseHeaders.forEach((rHeaders, index) => {
      if (this.headerKeyResponse[index] !== undefined) {
        respHeadersMap.set(this.headerKeyResponse[index], this.headerKeyResponse[index]);
      }
    });
    console.log('bodyResponse');
    console.log(this.bodyResponse);
    this.requestMultipartFiles.forEach((mPartRequest, index) => {
      reqMultipartFiles.set(this.multipartKeyRequest[index], this.multipartFileRequest[index]);
    });

    this.responseMultipartFiles.forEach((mPartRequest, index) => {
      respMultipartFiles.set(this.multipartKeyResponse[index], this.multipartFileResponse[index]);
    });

    const requestBody = new ApiBody();
    if (this.bodyRequest !== undefined) {
      requestBody.body = this.bodyRequest.replace(/\n/g, "").replace(/\t/g, "");
    }

    requestBody.contentType = this.contentTypeRequest;
    requestBody.multipart = [...reqMultipartFiles];


    console.log(requestBody);
    const responseBody = new ApiBody();
    if (this.bodyResponse != undefined) {
      responseBody.body = this.bodyResponse.replace(/\n/g, "").replace(/\t/g, "");
    }

    responseBody.contentType = this.contentTypeResponse;
    responseBody.multipart = [...respMultipartFiles];
    if(this.responseLogic){
      responseBody.logic=this.responseLogic;
    }
    console.log(responseBody);
    this.apiEndpointDef.uniqueName = this.teamName.trim().toLowerCase().replace(/" "/g, "_");
    this.apiEndpointDef.apiEndpointName = this.apiEndPoint;
    this.apiEndpointDef.serviceName = this.serviceNameFromDropdown;
    this.apiEndpointDef.apiType = this.selectedApiType;
    this.apiEndpointDef.requestQueryParams = [...this.queryParams]
    this.apiEndpointDef.requestHeaders = [...reqHeadersMap];
    this.apiEndpointDef.responseHeaders = [...respHeadersMap];
    this.apiEndpointDef.requestBody = requestBody;
    this.apiEndpointDef.responseBody = responseBody;
    const regex = /##.*##/gi;

    if (this.bodyRequest) {
      const requestTokens = this.bodyRequest.match(regex);
      if (requestTokens != null && requestTokens !== undefined) {
        requestTokens.forEach(token => {
          this.requestTokenMap.set(token, undefined);
        });
      }
    }
    if (this.bodyResponse) {

      const responseTokens = this.bodyResponse.match(regex);
      if (responseTokens != null && responseTokens !== undefined) {
        responseTokens.forEach(token => {
          this.responseTokenMap.set(token, undefined);
        });
      }

    }

    if (this.responseTokenMap.size > 0 || this.requestTokenMap.size > 0) {
      this.showSubmitBtn = false;
    } else {
      this.createMockService.createApiEndPoint(this.apiEndpointDef).subscribe(result => {
        this.resetApiEndoints();
        console.log(result.msg);
      });
    }
  }
  submitApiFinally() {
    console.log(this.requestTokenMap);
    if (this.requestTokenMap.size > 0) {
      let index = 0;
      for (let entry of this.requestTokenMap.entries()) {
        this.requestTokenMap.set(entry[0], this.requestTokenValue[index++]);
      }
      this.apiEndpointDef.requestBody.tokenMap = [...this.requestTokenMap];
    }

    if (this.responseTokenMap.size > 0) {
      let index = 0;
      for (let entry of this.responseTokenMap.entries()) {
        this.responseTokenMap.set(entry[0], this.responseTokenValue[index++]);
      }
      this.apiEndpointDef.responseBody.tokenMap = [...this.responseTokenMap];
    }
    console.log(this.apiEndpointDef);
    this.createMockService.createApiEndPoint(this.apiEndpointDef).subscribe(result => {
      this.apiEndpointDef = undefined
      console.log(result.msg);
      alert(result.msg);
    }, err => {
      console.log(err);
      alert(err);
      this.resetApiEndoints();
    });

  }

  addSoapEndpoint() {
    let requestHeaderMap = new Map<string, any>();
    let responseHeaderMap = new Map<string, any>();

    this.soapHeaderKeyRequest.forEach((header, index) => {
      requestHeaderMap.set(header, this.soapHeaderValueRequest[index]);
    });
    this.soapHeaderKeyResponse.forEach((header, index) => {
      responseHeaderMap.set(header, this.soapHeaderValueResponse[index]);
    });
    this.soapEndpointDef.requestBody = this.soapBody.replace(/\n/g, "").replace(/\t/g, "");
    this.soapEndpointDef.responseBody = this.soapResponse.replace(/\n/g, "").replace(/\t/g, "");
    this.soapEndpointDef.soapwsdl = this.soapwsdl.replace(/\n/g, "").replace(/\t/g, "");;
    this.soapEndpointDef.soapServiceName = this.serviceNameFromDropdown;
    this.soapEndpointDef.soapServiceName = this.soapEndPoint;
    this.soapEndpointDef.uniqueName = this.teamName.trim().toLowerCase().replace(/" "/g, "_");
    this.soapEndpointDef.requestHeaders = [...requestHeaderMap];
    this.soapEndpointDef.responseHeaders = [...responseHeaderMap];
    const regex = /##.*##/gi;
    if (this.soapBody) {
      const soapRequestTokens = this.soapBody.match(regex);
      if (soapRequestTokens != null) {
        soapRequestTokens.forEach(token => {
          this.soapRequestTokenMap.set(token, undefined);
        });
      }

    }
    if (this.soapResponse) {

      const soapResponseTokens = this.soapResponse.match(regex);
      if (soapResponseTokens != null) {
        soapResponseTokens.forEach(token => {
          this.soapResponseTokenMap.set(token, undefined);
        });
      }
    }

    if (this.soapRequestTokenMap.size > 0 || this.soapResponseTokenMap.size > 0) {
      this.enableSoapSecondaryBtn = true;
    } else {
      this.createMockService.createSoapEndPoint(this.soapEndpointDef).subscribe(result => {
        console.log(result.msg);
        this.resetSoapEndpoints();
        alert(result.msg);
      });
    }


  }

  submitSoapEndpointFinally() {
    let soapTokenMapRequest = new Map<string, any>();
    let soapTokenMapResponse = new Map<string, any>();
    let index = 0;
    for (const entry of this.soapRequestTokenMap.entries()) {
      if (this.soapRequestTokenValue[index] !== undefined && this.soapRequestTokenValue[index] !== "") {
        soapTokenMapRequest.set(entry[0], this.soapRequestTokenValue[index++]);
      }
    }
    index = 0;
    for (const entry of this.soapResponseTokenMap.entries()) {
      if (this.soapRequestTokenValue[index] !== undefined && this.soapRequestTokenValue[index] !== "") {
        soapTokenMapResponse.set(entry[0], this.soapResponseTokenValue[index++]);
      }
    }

    this.soapEndpointDef.requestTokens = [...soapTokenMapRequest];
    this.soapEndpointDef.responseTokens = [...soapTokenMapResponse];
    this.createMockService.createSoapEndPoint(this.soapEndpointDef).subscribe(result => {
      console.log(result.msg);
      this.resetSoapEndpoints();
      alert(result.msg);
    });
  }
  resetApiEndoints() {
    this.apiEndPoint = undefined;
    this.bodyRequest = undefined;
    this.headerChecked = false;
    this.bodyChecked = false;
    this.logicChecked=false;
    this.responseChecked = false;
    this.qParamChecked = false;
    this.responseHeaderChk = false;
    this.apiEndpointDef = new ApiEndpointModel();
  }

  resetSoapEndpoints() {
    this.soapEndPoint = undefined;
    this.soapBody = undefined;
    this.soapResponse = undefined;
    this.soapEndpointDef = new SoapEndPointsModel();
  }

  logicSelected(event:Event){
    if ((<HTMLInputElement>event.target).checked) {
      this.logicChecked=true;
      alert('Warning \n compilation issues may corrupt your server!!')
    }else{
      this.logicChecked=false;
    }
    
  }

}
