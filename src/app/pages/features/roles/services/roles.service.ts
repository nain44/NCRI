import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/core';

@Injectable()
export class RoleService {
    constructor(private _http: HttpClient) { }

    // delete system privileges
    DeleteSystemPrivilegesPerUserRole(body): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DeleteUserRole/';
        return this._http.post(url, body);
    }
    // edit system privileges
    EditSystemPrivilegesPerUserRole(body): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EditSystemPrivilegesPerUserRole/';
        return this._http.post(url, body);
    }
    // get system privileges
    SystemPrivilegesDropdownList(): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/SystemPrivilegesDropdownList/';
        return this._http.get(url);
    }
    // get roles
    getRoles(obj:any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchUserRoleWithUserCount/';
        return this._http.post(url, obj);
    }

    // deleting roles
    deleteRole(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DeleteUserRole/';
        return this._http.post(url, obj);
    }

    // fetching privileges
    getPrivileges(): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/SystemPrivilegesDropdownList/';
        return this._http.get(url);
    }

    // adding role
    addRole(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/AddUserRole/';
        return this._http.post(url, obj);
    }

    // adding role
    AddSystemPrivilegesPerUserRole(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/AddSystemPrivilegesPerUserRole/';
        return this._http.post(url, obj);
    }

    // update role
    updateRole(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EditUserRole/';
        return this._http.post(url, obj);
    }

    // fetching system privileges
    fetchSystemPrivilegesByID(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchSystemPrivilegesPerUserRole/';
        return this._http.post(url, obj);
    }

    // checking role name availability
    checkRoleName(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UserRoleNameAvailability/';
        return this._http.post(url, obj);
    }

    getRoleByID(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/FetchUserRole/';
        return this._http.post(url, obj);
    }

    assignRoleToMultipleUser(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/AssignUserRoleToMultipleUsers/';
        return this._http.post(url, obj);
    }

    // get employee type list
    getEmployeeTypeList(): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/EmployeeTypeDropdownList/';
        return this._http.get(url);
    }

    // get roles list
    getRolesList(): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/UserRoleDropdownList/';
        return this._http.get(url);
    }

    // adding user role per employee type
    addUserRolePerEmployeeType(obj: any): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/ads_/AddUserRolesPerEmployeeType/';
        return this._http.post(url, obj);
    }

    // get department list
    getDepartmentList(): Observable<any> {
        const url = APP_CONFIG.apiBaseUrl + '/api/v1/uam/DepartmentDropdownList/';
        return this._http.get(url);
    }



}
