import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core/configs';

@Injectable({providedIn: 'any'})
export class AccountSettingService {

  constructor(private http: HttpClient) { }

  // language dropdown
  UpdateAccountPreferences(obj): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/UpdateAccountPreferences/';
    return this.http.post(url, obj);
}
  // language dropdown
  LanguageDropdownList(): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/LanguageDropdownList/';
    return this.http.get(url);
}
  // fetch user
  FetchUser(obj:any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchUser/';
    return this.http.post(url,obj);
}
  // update password
  changePassword(obj:any): Observable<any>{
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/ChangePassword/';
    return this.http.post(url,obj);
}

changeEmail(obj:any): Observable<any>{
  let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/ChangeEmail/';
  return this.http.post(url,obj);
}

deactivateAccount(): Observable<any>{
  let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/DeactivateAccount/';
  return this.http.get(url);
}

  
}
