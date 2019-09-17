import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { Credentials } from '../../models/credentials';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-mock',
  templateUrl: './edit-mock.component.html',
  styleUrls: ['./edit-mock.component.css']
})
export class EditMockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
