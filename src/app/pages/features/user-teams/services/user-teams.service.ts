import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';

@Injectable({ providedIn: 'any' })
export class TeamService {
    constructor(private httpClient: HttpClient) { }
    FetchTeam(body: any): Observable<any> {
        const url = '/api/v1/uam/FetchTeam/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
    }

    TeamList(body: any): Observable<any> {
        const url = '/api/v1/uam/TeamList/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
    }

      
    TeamNameAvailability(body: any): Observable<any> {
        const url = '/api/v1/uam/TeamNameAvailability/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
    }

    AddTeam(body: any): Observable<any> {
        const url = '/api/v1/uam/AddTeam/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
    }
    EditTeam(body: any): Observable<any> {
        const url = '/api/v1/uam/EditTeam/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
    }

    DeleteTeam(body: any): Observable<any> {
        const url = '/api/v1/uam/DeleteTeam/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
    }

    TeamDropdownList(body: any): Observable<any> {
        const url = '/api/v1/uam/TeamDropdownList/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
      }    
      ClientDemographicDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmg/ClientDemographicDropdownList/";
        return this.httpClient.get(url);
    }
      
    UserDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/UserDropdownList/";
        return this.httpClient.get(url);
    }
    
      
      
      
}