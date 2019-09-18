import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import {EditMockService} from '../../services/edit-mock.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-mock',
  templateUrl: './edit-mock.component.html',
  styleUrls: ['./edit-mock.component.css']
})
export class EditMockComponent implements OnInit {

  constructor(private cookieService: CookieService, private editMockService: EditMockService,private authServices:AuthServiceService) { }
  teamName:string;
  uniqueName:string;
  ngOnInit() {
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName=this.cookieService.get('uniqueName');
  }

  tabchanged(event: Event) {
    if (event['index'] == 0) {

    } else if (event['index'] == 1) {
    } 
  }

}
