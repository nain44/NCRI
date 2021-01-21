import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'src/app/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class SettingService {
    constructor(private httpClient: HttpClient) { }
    getLogo(): Observable<any>{
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/ads_/FetchProductLogo/';
        return this.httpClient.get(url);
    }
    changeLogo(obj): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/ads_/AddProductLogo/';
        // const headers = new HttpHeaders();
        // headers.set('Content-Type', null);
        // headers.set('Accept', "multipart/form-data");
        // headers.set('Content-Disposition', "form-data; name=\"json\"");
        return this.httpClient.post(url, obj);
    }
    uploadDocument(body): Observable<any> {
        const url = '/api/v1/cmg/UploadDocument/';
        return this.httpClient.post(environment.apiBaseUrl + url, body);
    }

    //add portal name
    addPortalName(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/ads_/AddThirdPartyPortal/";
        return this.httpClient.post(url, obj);
    }

    //add third party api config
    addThirdPartyConfig(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/ads_/AddThirdPartyPortalConfiguration/";
        return this.httpClient.post(url, obj);
    }

    //get dropdown data
    getDropdownData(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/ads_/ThirdPartyPortalConfigurationDropdownList/";
        return this.httpClient.get(url);
    }
}