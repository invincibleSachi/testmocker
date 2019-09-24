import { Component, OnInit } from '@angular/core';
import {ApiEndpointModel} from '../../models/api-endpoint-model';
import { EditMockService } from '../../services/edit-mock.service';
import { CookieService } from 'ngx-cookie-service';
import { OverlayPanelModule } from "primeng/overlaypanel";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  apiEndpointsList:ApiEndpointModel[]=[];
  teamName:string;
  serviceName:string;
  uniqueName:string;
  redirectEnabled:boolean[]=[];
  updateEnabled:boolean[]=[];

  constructor(private editMockService:EditMockService,private cookieService:CookieService) { 
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');
  }

  ngOnInit() {
    this.teamName = this.cookieService.get('teamName');
    this.uniqueName = this.teamName.toLowerCase().replace(' ', '_');
    this.getListOfApiEndpoints();
    this.redirectEnabled=[];
    this.updateEnabled=[]
    
  }

  getListOfApiEndpoints=()=>{
    this.editMockService.getAllApiEndpoints(this.uniqueName).subscribe(result=>{
      console.log(result);
      this.apiEndpointsList=result;
      result.forEach(point=>{
        this.redirectEnabled.push(false);
        this.updateEnabled.push(false);
      });
    })
  }

  onCheck=(type,index,chk)=>{
    if(type==='redirect'){
      this.redirectEnabled[index]=chk;
    }else{
      this.updateEnabled[index]=chk;
    }
  }

}
