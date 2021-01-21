import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core';

@Injectable()
export class GradeService {
    constructor(private httpClient: HttpClient) { 

    }

    //get grade list
    postGradeList(obj): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/UserGradesList/";
        return this.httpClient.post(url, obj);
    }
    //get grade list
    getGradeList(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/UserGradeDropdownList/";
        return this.httpClient.get(url);
    }

    //get role dropdown list
    getRoleList(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/UserRoleDropdownList/";
        return this.httpClient.get(url);
    }

    //get user list
    getUserList(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/UsersList/";
        return this.httpClient.post(url, {"size": 20,"page": 1,"filter_by":'ALL', search_text: ''});
    }

    //create grade
    addGrade(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/AddUserGrade_CustomFlow/";
        return this.httpClient.post(url, obj);
    }

    assignGradeToUser(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/AssignUserGradeToMultipleUsers/";
        return this.httpClient.post(url, obj);
    }

    assignGradeToRole(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/ads_/AddUserRolesPerUserGrade/";
        return this.httpClient.post(url, obj);
    }

    //check grade available
    isGradeAvailable(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/UserGradeNameAvailability/";
        return this.httpClient.post(url, obj);
    }

    //deleting grade
    deleteGrade(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/DeleteUserGrade/";
        return this.httpClient.post(url, obj);
    }

    //fetching grade by id
    fetchGrade(obj:any){
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/FetchUserGrade_Complete/";
        return this.httpClient.post(url, obj)
    }
    
    //update grade detail
    updateGrade(obj:any){
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/EditUserGrade_CustomFlow/";
        return this.httpClient.post(url, obj)
    }
}