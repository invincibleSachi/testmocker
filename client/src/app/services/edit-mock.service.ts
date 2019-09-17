import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateService } from '../models/create-service-req';
import { CommonHttpResponse } from '../models/common-resp';

@Injectable({
  providedIn: 'root'
})
export class EditMockService {
  constructor(private http: HttpClient) { }
}
