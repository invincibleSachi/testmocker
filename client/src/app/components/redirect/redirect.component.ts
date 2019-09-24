import { Component, OnInit } from '@angular/core';
import { ApiEndpointModel } from '../../models/api-endpoint-model';
import { RedirectModel } from '../../models/redirect-model';
import { RedirectRequestModel } from '../../models/redirect-req-model';
import { RedirectServices } from '../../services/redirect-service';
import { EditMockService } from '../../services/edit-mock.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  teamName: string;
  uniqueName: string;
  redirectInfo: RedirectRequestModel[] = [];

  constructor(private editMockService: EditMockService, private cookieService: CookieService, private redirectServices: RedirectServices) {
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');
  }

  ngOnInit() {
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');
    this.getListOfRedirects();
    this.redirectInfo = [];

  }

  getListOfRedirects = () => {
    this.redirectServices.getRedirects(this.uniqueName).subscribe(result => {
      this.redirectInfo = result;
    });
  }

  onCheck = (type, index, chk) => {
    if (type === 'redirect') {
      this.redirectInfo[index].redirectEnabled = chk;
    } else {
      this.redirectInfo[index].autoUpdateEnabled = chk;
    }
  }

  onSave() {
    this.redirectInfo.forEach((request, index) => {
      if (request.redirectUrl && request.authHeader) {
        this.redirectServices.addRedirect(request).subscribe(result => {
          if (index === this.redirectInfo.length) {
            alert('saved successfully!!');
          }
        });
      } else {
        console.log(request.apiEndpointName + ' not saved');
      }
    });
  }

}
