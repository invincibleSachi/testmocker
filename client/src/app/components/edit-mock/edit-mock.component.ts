import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import { EditMockService } from '../../services/edit-mock.service';
import { CreateMockService } from '../../services/create-mock-service';
import { AuthServiceService } from '../../services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { GerServiceList } from '../../models/get-service-resp';

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
  ngOnInit() {
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');
    this.selectApiEndpointTab();
  }

  tabchanged(event: Event) {
    if (event['index'] == 0) {

    } else if (event['index'] == 1) {
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
  onChangeOfService() {

  }
}
