import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AfmService {

  constructor(
    private http: HttpClient) { }

    FetchFieldMapping(body): Observable<any> {
      const url = '/api/v1/afm/FetchFieldMapping';
      return this.http.post(environment.apiBaseUrl + url, body);
    }

    GetAvailableSystemFields(body): Observable<any> {
      const url = '/api/v1/afm/GetAvailableSystemFields';
      return this.http.post(environment.apiBaseUrl + url, body);
    }

    GetAvailableCustomFields(body): Observable<any> {
      const url = '/api/v1/afm/GetAvailableCustomFields';
      return this.http.post(environment.apiBaseUrl + url, body);
    }

    FieldMappingList(body): Observable<any> {
      const url = '/api/v1/afm/FieldMappingList';
      return this.http.post(environment.apiBaseUrl + url, body);
    }

    DeleteFieldMapping(body): Observable<any> {
      const url = '/api/v1/afm/DeleteFieldMapping';
      return this.http.post(environment.apiBaseUrl + url, body);
    }

    ClientDemographicDropdownList(): Observable<any> {
      const url = '/api/v1/cmg/ClientDemographicDropdownList/';
      return this.http.get(environment.apiBaseUrl + url);
    }

    updateFieldMapping(body): Observable<any> {
      const url = '/api/v1/afm/EditFieldMapping';
      return this.http.post(environment.apiBaseUrl + url, body);
    }
    
}
