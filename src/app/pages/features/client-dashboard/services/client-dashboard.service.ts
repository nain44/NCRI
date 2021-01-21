import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDashboardService {

  constructor(

    private http: HttpClient
  ) { }
   // delete client
   deleteClientDemographic(body: any): Observable<any> {
    const url = '/api/v1/cmg/DeleteClientDemographic/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
   // client list
   clientDemographicsList(body: any): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicsList/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  downloadClientList(body: any): Observable<any> {
    const url = '/api/v1/cmg/DownloadClientDemographicsList/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
}
