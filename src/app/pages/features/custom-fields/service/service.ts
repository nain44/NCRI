import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';

@Injectable()
export class CustomFieldService {
    constructor(private httpClient: HttpClient) { }

    getScreenOrientation(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmf/FetchAssignedScreenOrientation/";
        return this.httpClient.post(url, obj);
    }

    addCustomField(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmf/AddCustomField/";
        return this.httpClient.post(url, body);
    }

    fetchCustomField(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmf/FetchCustomField/";
        return this.httpClient.post(url, body);
    }

    updateCustomField(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmf/EditCustomField/";
        return this.httpClient.post(url, body);
    }

}