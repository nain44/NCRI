import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../core';
import { Observable } from 'rxjs';

@Injectable()
export class CommissionService {
    constructor(private httpClient: HttpClient) { }

    // my commission dashboard
    MyCommissionCompensationList(): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/MyCommissionCompensationList/';
        return this.httpClient.get(url);
    }
    // approve commission dashboard
    CommissionCompensationListPerReportingUser(obj:any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/CommissionCompensationListPerReportingUser/';
        return this.httpClient.post(url,obj);
    }
    // delete system privileges
    FetchCommissionCompensationHistory(body): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/FetchCommissionCompensationHistory/';
        return this.httpClient.post(url, body);
    }

    CancelMultipleCommissionCompensation(body): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/CancelMultipleCommissionCompensation/';
        return this.httpClient.post(url, body);
    }
    PendingCommissionCompensationWithSuggestion(body): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/PendingCommissionCompensationWithSuggestion/';
        return this.httpClient.post(url, body);
    }
    ApproveMultipleCommissionCompensation(body): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/ApproveMultipleCommissionCompensation/';
        return this.httpClient.post(url, body);
    }
    FetchCommissionCompensation(body): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/FetchCommissionCompensation/';
        return this.httpClient.post(url, body);
    }
    getCurrencyCode(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/CurrencyCodeDropdownList/';
        return this.httpClient.get(url);
    }

    addCompensation(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AddCommissionCompensation/';
        return this.httpClient.post(url, obj);
    }

    addBreakEven(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AddBreakEvenPoint/';
        return this.httpClient.post(url, obj);
    }

    deleteBreakEven(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/DeleteBreakEvenPoint/';
        return this.httpClient.post(url, obj);
    }

    updateBreakEven(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/EditBreakEvenPoint/';
        return this.httpClient.post(url, obj);
    }

    //approve commission 
    approveCommission(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/ApproveMultipleCommissionCompensation/';
        return this.httpClient.post(url, obj);
    }

    //cancel commission
    cancelCommission(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/CancelMultipleCommissionCompensation/';
        return this.httpClient.post(url, obj);
    }

     //fetch user details
     fetchUserDetailsByID(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchUser/';
        return this.httpClient.post(url, obj);
    }

    //fetch one level user
    fetchLevelUser(): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/OneLevelUsersListByGrade/';
        return this.httpClient.get(url);
    }

    //fetch multi level user
    fetchUserLevel(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/UsersListByGrade/';
        return this.httpClient.post(url,obj);
    }

    //get tree data
    fetchTreeData(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/UsersListByGrade/';
        return this.httpClient.post(url, obj);
    }

    //add target 
    addTarget(obj:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AddTarget/';
        return this.httpClient.post(url,obj);
    }

    //add complete compensation flow
    addCompensationFlow(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AddCommissionCompensation/';
        return this.httpClient.post(url, body);
    }

    //fetch commission detail by id
    fetchCommissionDetailByID(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/FetchCommissionCompensation/';
        return this.httpClient.post(url, body);
    }

    //update commission compensation
    updateCommissionCompensation(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/EditCommissionCompensation/';
        return this.httpClient.post(url, body);
    }


    //get target map 
    fetchTargetMapData(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AssignedTargetsList_MapView/';
        return this.httpClient.post(url, body);
    }

    //get target list
    fetchTargetListData(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/AssignedTargetsList/';
        return this.httpClient.post(url, body);
    }

    //get target amount with user
    getTargetAmount(body:any): Observable<any>{
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/MyTargetsList/';
        return this.httpClient.post(url, body);
    }
    
}