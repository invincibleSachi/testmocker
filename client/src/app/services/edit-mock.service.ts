import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateService } from '../models/create-service-req';
import { CommonHttpResponse } from '../models/common-resp';
import { ApiEndpointModel } from '../models/api-endpoint-model';
import { SoapEndPointsModel } from '../models/soap-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class EditMockService {
  constructor(private http: HttpClient) { }

  editApiEndPoint(createApiEndpoint: ApiEndpointModel): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/edit-mock/edit-api`, createApiEndpoint,
    );
  }

  editSoapEndPoint(createSoapEndpoint: SoapEndPointsModel): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/edit-mock/edit-soap`, createSoapEndpoint,
    );
  }

  getApiEndpointsNames(uniqueName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.API_ENDPOINT}/edit-mock/get-rest-endpoints-name?uniqueName=` + uniqueName
    );
  }

  getSoapEndpointsNames(uniqueName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.API_ENDPOINT}/edit-mock/get-soap-endpoints-name?uniqueName=` + uniqueName
    );
  }

  getApiEndpoints(uniqueName: string): Observable<ApiEndpointModel[]> {
    return this.http.get<ApiEndpointModel[]>(
      `${environment.API_ENDPOINT}/edit-mock/get-rest-endpoints?uniqueName=` + uniqueName
    );
  }

  getSoapEndpoints(uniqueName: string): Observable<SoapEndPointsModel[]> {
    return this.http.get<SoapEndPointsModel[]>(
      `${environment.API_ENDPOINT}/edit-mock/get-soap-endpoints?uniqueName=` + uniqueName
    );
  }
}
