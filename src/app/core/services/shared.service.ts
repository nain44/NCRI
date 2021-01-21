import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../configs';

@Injectable({
  providedIn: 'any'
})
export class SharedService {

  constructor(private http: HttpClient) { }

   // get user theme
 fetchUserTheme(): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/FetchUserTheme/';
    return this.http.get(url);
  }
  
  addUserTheme(obj:any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/AddUserTheme/';
    return this.http.post(url,obj);
  }
  
}
