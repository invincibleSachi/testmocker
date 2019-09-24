import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateService } from '../models/create-service-req';
import { CommonHttpResponse } from '../models/common-resp';
import { ApiEndpointModel } from '../models/api-endpoint-model';
import { RedirectRequestModel } from '../models/redirect-req-model';

@Injectable({
  providedIn: 'root'
})
export class RedirectServices {
  constructor(private http: HttpClient) { }
  addRedirect(redirectRequest: RedirectRequestModel): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/redirect/add`, redirectRequest,
    );
  }

  getRedirects(uniqueName: string): Observable<RedirectRequestModel[]> {
    return this.http.get<RedirectRequestModel[]>(
      `${environment.API_ENDPOINT}/redirect/get?uniqueName=` + uniqueName
    );
  }

}
