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
      `${environment.API_ENDPOINT}/edit/edit-api`, createApiEndpoint,
    );
  }

  editSoapEndPoint(createSoapEndpoint: SoapEndPointsModel): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/edit/edit-soap`, createSoapEndpoint,
    );
  }

  getApiEndpointsNames(uniqueName: string, serviceName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.API_ENDPOINT}/edit/get-rest-endpoints-name?uniqueName=` + uniqueName + "&serviceName=" + serviceName
    );
  }

  getSoapEndpointsNames(uniqueName: string, serviceName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.API_ENDPOINT}/edit/get-soap-endpoints-name?uniqueName=` + uniqueName + "&serviceName=" + serviceName
    );
  }

  getApiEndpoints(uniqueName: string, serviceName: string): Observable<ApiEndpointModel[]> {
    return this.http.get<ApiEndpointModel[]>(
      `${environment.API_ENDPOINT}/edit/get-rest-endpoints?uniqueName=` + uniqueName + "&serviceName=" + serviceName
    );
  }

  getAllApiEndpoints(uniqueName: string): Observable<ApiEndpointModel[]> {
    return this.http.get<ApiEndpointModel[]>(
      `${environment.API_ENDPOINT}/edit/get-rest-endpoints?uniqueName=` + uniqueName
    );
  }

  getApiEndpoint(uniqueName: string, serviceName: string, apiEndpointName: string): Observable<ApiEndpointModel> {
    return this.http.get<ApiEndpointModel>(
      `${environment.API_ENDPOINT}/edit/get-rest-endpoint?uniqueName=` + uniqueName + "&serviceName=" + serviceName + "&restEndpointName=" + apiEndpointName
    );
  }

  deleteApiEndpoint(uniqueName: string, serviceName: string, apiEndpointName: string): Observable<CommonHttpResponse> {
    return this.http.get<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/edit/delete-rest-endpoint?uniqueName=` + uniqueName + "&serviceName=" + serviceName + "&restEndpointName=" + apiEndpointName
    );
  }

  getSoapEndpoints(uniqueName: string, serviceName: string): Observable<SoapEndPointsModel[]> {
    return this.http.get<SoapEndPointsModel[]>(
      `${environment.API_ENDPOINT}/edit/get-soap-endpoints?uniqueName=` + uniqueName + "&serviceName=" + serviceName
    );
  }
  getSoapEndpoint(uniqueName: string, serviceName: string, soapEndpointName: string): Observable<ApiEndpointModel> {
    return this.http.get<ApiEndpointModel>(
      `${environment.API_ENDPOINT}/edit/get-rest-endpoint?uniqueName=` + uniqueName + "&serviceName=" + serviceName + "&soapEndPointName=" + soapEndpointName
    );
  }
}
