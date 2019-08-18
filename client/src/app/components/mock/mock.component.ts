import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import { Headers } from '../../models/header-model';
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

  constructor() { }

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

}
