import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';

@Injectable({ providedIn: 'any' })
export class UserService {
    constructor(private httpClient: HttpClient) { }
    // Get BranchLocationDropdownList
    branchLocationDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/BranchLocationDropdownList/';
        return this.httpClient.get(url);
    }
    // Get CountryCodeDropdownList
    countryCodeDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/CountryCodeDropdownList/';
        return this.httpClient.get(url);
    }
    // Get DepartmentDropdownList
    departmentDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DepartmentDropdownList/';
        return this.httpClient.get(url);
    }
    // Get EmployeeTypeDropdownList
    employeeTypeDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EmployeeTypeDropdownList/';
        return this.httpClient.get(url);
    }
    // Get TimeZoneDropdownList
    timeZoneDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/TimeZoneDropdownList/';
        return this.httpClient.get(url);
    }
    // Get UserGroupDropdownList
    userGroupDropdownList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UserGroupDropdownList/';
        return this.httpClient.get(url);
    }
    // Check EmailAvailability
    emailAvailability(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EmailAvailability/';
        return this.httpClient.post(url, body);
    }
    // Check UsernameAvailability
    usernameAvailability(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UsernameAvailability/';
        return this.httpClient.post(url, body);
    }
    // create User
    createUser(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/CreateUser/';
        return this.httpClient.post(url, body);
    }

    //edit user
    editUser(body: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EditUser/';
        return this.httpClient.post(url, body);
    }

    //delete user
    deleteUser(body: any) {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DeleteUser/';
        return this.httpClient.post(url, body);
    }

    // Get UsersList
    usersListCCM(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ccm/UsersList/';
        return this.httpClient.post(url, obj);
    }
    // Get UsersList
    usersList(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UsersList/';
        return this.httpClient.post(url, obj);
    }

    //get users list with search
    userListBySearch(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/SearchUsersList/';
        return this.httpClient.post(url, obj);
    }

    getUserRoles() {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UserRoleDropdownList/';
        return this.httpClient.get(url);
    }

    downloadList(obj: any) {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DownloadUsersList/';
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'text');
        return this.httpClient.post(url, obj, { headers: headers });
    }

    validateEmail(obj: any) {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EmailAvailability/';
        return this.httpClient.post(url, obj);
    }

    // update password
    updatePassword(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/ChangeDefaultPassword/';
        const headers = new HttpHeaders();
        const details = JSON.parse(localStorage.getItem('details'));
        console.log(details)
        console.log(details.token)
        headers.append('Authorization', `JWT ${details.token}`);
        return this.httpClient.post(url, obj, { headers: headers });
    }

    // activate User
    unlockUser(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UnlockAccount/';
        return this.httpClient.post(url, obj);
    }

    // activate User
    lockUser(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/LockAccount/';
        return this.httpClient.post(url, obj);
    }
    // activate User
    changeLogo(obj): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ads_/AddProductLogo/';
        // const headers = new HttpHeaders();
        // headers.set('Content-Type', null);
        // headers.set('Accept', "multipart/form-data");
        // headers.set('Content-Disposition', "form-data; name=\"json\"");
        return this.httpClient.post(url, obj);
    }

    getLogo(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/ads_/FetchProductLogo/';
        return this.httpClient.get(url);
    }

    fetchUserByID(obj: any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchUser/';
        return this.httpClient.post(url, obj);
    }

    //get reporting user
    getReportingList(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/ReportingUserDropdownList/";
        return this.httpClient.get(url);
    }

    //stats call
    getStats(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/FetchUserStats/";
        return this.httpClient.get(url);
    }

    approveMultiple(obj:any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/ApproveMultipleUser/";
        return this.httpClient.post(url, obj);
    }

    cancelMultiple(obj:any): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/CancelMultipleUser/";
        return this.httpClient.post(url, obj);
    }

    getApprover(): Observable<any> {
        let url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/ApproverUserDropdownList/";
        return this.httpClient.get(url);
    }

    downloadClientList(body: any): Observable<any> {
        const url = '/api/v1/ccm/DownloadUsersList/';
        return this.httpClient.post(APP_CONFIG.apiBaseUrl + url, body);
      }
}