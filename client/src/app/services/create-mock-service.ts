import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateService } from '../models/create-service-req';
import { CommonHttpResponse } from '../models/common-resp';
import { GerServiceList } from '../models/get-service-resp';
import { ApiEndpointModel } from '../models/api-endpoint-model';

@Injectable({
  providedIn: 'root'
})
export class CreateMockService {
  constructor(private http: HttpClient) { }

  createService(createServiceReq: CreateService): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/mock/create-service`, createServiceReq,
    );
  }

  getServices(uniqueName: string): Observable<GerServiceList[]> {
    return this.http.get<GerServiceList[]>(
      `${environment.API_ENDPOINT}/mock/get-services-list?uniqueName=` + uniqueName,
    );
  }

  createApiEndPoint(createApiEndpoint: ApiEndpointModel): Observable<CommonHttpResponse> {
    return this.http.post<CommonHttpResponse>(
      `${environment.API_ENDPOINT}/mock/create-api`, createApiEndpoint,
    );
  }
}
