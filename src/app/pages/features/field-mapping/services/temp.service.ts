import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, GlobalService } from 'src/app/core';

@Injectable({providedIn: 'root'})
export class TempService {
    constructor(private httpClient: HttpClient,private backend: HttpBackend, private global: GlobalService) { }

    //uploading file for result
    uploadFile(file:any):Observable<any>{
        debugger
        let headers = new HttpHeaders({
            'Authorization': "JWT " + this.global.token });
        let options = { headers: headers };
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/PreFieldMappingReport";
        let req = new HttpClient(this.backend);
        return req.post(url,file,options);
        
        // return this.httpClient.post(url,file)
    }

    //getting system fields from db
    getSystemFields(obj:any):Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/GetAvailableSystemFields";
        return this.httpClient.post(url,obj)
    }

    //getting custom fields from db
    getCustomFields(obj:any):Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/GetAvailableCustomFields";
        return this.httpClient.post(url,obj)
    }

    //get client demographics
    getClients():Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmg/ClientDemographicDropdownList/";
        return this.httpClient.get(url)
    }

    //fetching client demographic by id
    fetchProduct(obj:any):Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmg/FetchClientDemographic/";
        return this.httpClient.post(url,obj);
    }

    addFieldMapping(obj:any):Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/AddFieldMapping";
        return this.httpClient.post(url,obj);
    }


    
}