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
  headers: Headers[] = [];
  queryParams: Headers[] = [];
  multipartFiles: MultipartFileUplod[] = [];
  bodyStr: string = undefined;
  showBody: boolean = false;
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

}
