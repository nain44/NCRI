import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, GlobalService } from 'src/app/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountImportService {
    constructor(
        private httpClient: HttpClient,
        private backend: HttpBackend,
        private global: GlobalService
        ) { }
    getImportService(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/ClientDemographicFileImporterList";
        return this.httpClient.post(url, body);
    }

    //getting field mapping dropdown data
    getFieldMappingList(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/FieldMappingDropdownList";
        return this.httpClient.get(url);
    }

    //uploading account import file
    uploadFile(formData:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/cmg/UploadDocument/";
        let headers = new HttpHeaders({
            'Authorization': "JWT " + this.global.token });
        let options = { headers: headers };
        let req = new HttpClient(this.backend);
        return req.post(url,formData,options);
    }

    //add account import api
    addAccountImporter(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/AddClientDemographicFileImporter";
        return this.httpClient.post(url, body);
    }

    //fetch importer with id
    fetchAccountImporterByID(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/FetchClientDemographicFileImporter";
        return this.httpClient.post(url, body);
    }

    //update account importer
    updateAccountImporter(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/EditClientDemographicFileImporter";
        return this.httpClient.post(url, body);
    }

    //rollback api
    rollbackImporter(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/RollbackClientDemographicFileImporter";
        return this.httpClient.post(url, body);
    }

    //download importer file
    downloadImporterFile(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/afm/DownloadClientDemographicFileImporterDocument";
        return this.httpClient.post(url, body,{ responseType: 'blob' });
    }

}