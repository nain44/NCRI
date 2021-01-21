import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core';

@Injectable()
export class ProfileService {
    constructor(private httpClient: HttpClient) { }
    
     updateProfile(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/EditProfile/';
        return this.httpClient.post(url, body);
    }

    //change avatar
    changeImage(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ups/ChangeAvatar/';
        return this.httpClient.post(url, body);
    }
}