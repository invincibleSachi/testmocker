import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import { CookieService } from 'ngx-cookie-service';
import { Headers } from '../../models/header-model';
import { CreateService } from '../../models/create-service-req';
import { CreateMockService } from '../../services/create-mock-service';
import { MultipartFileUplod } from '../../models/multipart-file-model';
@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css']
})
export class MockComponent implements OnInit {
  baseUrl: string;
  services: string[];
  headerChecked: boolean = false;
  bodyChecked: boolean = false;
  qParamChecked: boolean = false;
  responseChecked: boolean = false;
  headers: Headers[] = [];
  queryParams: Headers[] = [];
  multipartFiles: MultipartFileUplod[] = [];
  bodyStr: string = undefined;
  responseBodyStr: String = undefined;
  responseMultipartFiles: MultipartFileUplod[] = [];
  showBody: boolean = false;
  showBodyResponse: boolean = false;
  serviceName: string;
  teamName: string;
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
      this.bodyStr = undefined;
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

  constructor(private cookieService: CookieService, private createMockService: CreateMockService) {
    this.teamName = this.cookieService.get('teamName');
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

}
