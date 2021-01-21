import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core';

@Injectable()
export class SystemFieldService {
    constructor(private httpClient: HttpClient) { }
    
    getCustomFields(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmf/SystemFieldList/";
        return this.httpClient.post(url,body);
    }

    fetchSystemField(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmf/FetchSystemField/";
        return this.httpClient.post(url,body);
    }

    fetchDropdownValues(path:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1"+path;
        return this.httpClient.get(url);
    }

    updateSystemField(path:any,body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1"+path;
        return this.httpClient.post(url,body);
    }
}