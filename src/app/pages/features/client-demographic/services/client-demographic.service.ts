import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientDemographicService {

  constructor(
    private http: HttpClient
  ) { }
  FetchAssignedScreenOrientation(body): Observable<any> {
    const url = '/api/v1/cmf/FetchAssignedScreenOrientation/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
  getClient_industry_id(): Observable<any> {
    const url = '/api/v1/cmg/ClientIndustryDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getclient_remittance_type_id(): Observable<any> {
    const url = '/api/v1/cmg/ClientRemittanceTypeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getinvoice_format_code_id(): Observable<any> {
    const url = '/api/v1/cmg/InvoiceFormatCodeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getinterest_rate_cycle_type_id(): Observable<any> {
    const url = '/api/v1/cmg/InterestRateCycleTypeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getcredit_bureau_id(): Observable<any> {
    const url = '/api/v1/cmg/CreditBureauDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  } 
  getthird_party_platform_id(): Observable<any> {
    const url = '/api/v1/cmg/ThirdPartyPlatformDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getfinal_demands_start_id(): Observable<any> { // no call available
    const url = '/api/v1/cmf/LanguageDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getfinal_demands_end_id(): Observable<any> { // no call available
    const url = '/api/v1/cmf/LanguageDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  // getdue_days_num(): Observable<any> { // no call available
  //   const url = '';
  //   return this.http.get(environment.apiBaseUrl + url);
  // }
  getletter_id(): Observable<any> {
    const url = '/api/v1/cmg/LetterDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getletter_sequence_start_id(): Observable<any> { // no call available
    const url = '/api/v1/cmg/LetterDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getletter_sequence_end_id(): Observable<any> { // no call available
    const url = '/api/v1/cmf/LanguageDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  getDocument_type_id(): Observable<any> {
    const url = '/api/v1/cmg/DocumentTypeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  uploadDocument(body): Observable<any> {
    const url = '/api/v1/cmg/UploadDocument/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  // client info dropdown lists
  getBusinessTypeDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/BusinessTypeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getCountryCodeDropdownList(): Observable<any> {
    const url = '/api/v1/uam/CountryCodeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getCountryDropdownList(): Observable<any> {
    const url = '/api/v1/cmf/CountryDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getCityDropdownList(): Observable<any> {
    const url = '/api/v1/cmf/CityDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getProvinceDropdownList(): Observable<any> {
    const url = '/api/v1/cmf/ProvinceDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getHomeBranchDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/HomeBranchDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getCurrencyCodeDropdownList(): Observable<any> {
    const url = '/api/v1/ccm/CurrencyCodeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  // sales representative call is not available
  // same as reporting user call

  getClientStatusDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/ClientStatusDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  // master client call is not available
  getClientDemographicDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getClientTypeDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/ClientTypeDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  // collector call is not available 
  getReportingUserDropdownList(): Observable<any> {
    const url = '/api/v1/uam/ReportingUserDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  getClientGroupDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/ClientGroupDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  // dropdown list for portal settings
  getClientPortalDropdownList(): Observable<any> {
    const url = '/api/v1/cmg/ClientPortalDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  // adding user
  addUser(body: any): Observable<any> {
    const url = '/api/v1/cmg/AddClientDemographic_CustomFlow/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  // check client number availability
  checkClientNumberAvailability(body: any): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicClientNumberAvailability/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  getSystemFieldList(): Observable<any> {
    const url = '/api/v1/cmf/SystemFieldList/';
    return this.http.get(environment.apiBaseUrl + url);
  }

  // client number
  getClientNumberByYear(): Observable<any> {
    const url = '/api/v1/cmg/GetClientNumberByYear/';
    let body = {
      year: new Date().getFullYear()
    }
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  getUsernameAndPass(): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_UsersSection/';
    return this.http.get(environment.apiBaseUrl + url);
  }
}
