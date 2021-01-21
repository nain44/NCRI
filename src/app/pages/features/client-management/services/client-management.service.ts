import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {

  constructor(

    private http: HttpClient
  ) { }
  // reporting user list 
  reportingUserDropdownList(): Observable<any> {
    const url = '/api/v1/uam/ReportingUserDropdownList/';
    return this.http.get(environment.apiBaseUrl + url);
  }
  // bookmark comment  
  toggleClientDemographicCommentBookmark(body): Observable<any> {
    const url = '/api/v1/cmg/ToggleClientDemographicCommentBookmark/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
  // add comment  
  AddClientDemographicComment(body): Observable<any> {
    const url = '/api/v1/cmg/AddClientDemographicComment/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
  // upload document  
  uploadDocument(body): Observable<any> {
    const url = '/api/v1/cmg/UploadDocument/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
  // comments
  clientDemographicCommentsList(body: any): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicCommentsList/';
    return this.http.post(environment.apiBaseUrl + url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // client details
  clientDemographicContactInformationsList(body: any): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicContactInformationsList/';
    return this.http.post(environment.apiBaseUrl + url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // client demographics
  fetchClientDemographic(body: any): Observable<any> {
    const url = '/api/v1/cmg/FetchClientDemographic/';
    return this.http.post(environment.apiBaseUrl + url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // transactions
  clientDemographicTransactionsList(body: any): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicTransactionsList/';
    return this.http.post(environment.apiBaseUrl + url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // download transactions
  downloadClientDemographicTransactionsList(body: any): Observable<any> {
    const url = '/api/v1/cmg/DownloadClientDemographicTransactionsList/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
  // required documents
  clientDemographicRequiredDocumentsList(body: any): Observable<any> {
    const url = '/api/v1/cmg/ClientDemographicRequiredDocumentsList/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }
  // group
  fetchClientGroup(body: any): Observable<any> {
    const url = '/api/v1/cmg/FetchClientGroup/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  //new apis for editing
  updateGenericSettings(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_GenericInformationSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateBankDetails(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_BankDetailsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateFinancialSettings(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_FinancialSettingsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateCreditReport(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_CreditBureauReportingSettingsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updatePartyPlatform(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_ThirdPartyPlatformDetailsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateInvoiceInfo(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_InvoiceOptionsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateCompanyView(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_ClientPortalSettingsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateCustomFields(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_CustomFieldsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateShowReport(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_ShowReportsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateRequiredFields(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_RequiredFieldsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updatePermission(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_PermissionsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateRequiredDocument(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_RequiredDocumentsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateGroups(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_GroupsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateUploadedDocuments(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_UploadedDocumentsSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updatePrimaryContact(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_ContactInformationSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  updateSystemClient(body: any): Observable<any> {
    const url = '/api/v1/cmg/EditClientDemographic_ClientSystemInformationSection/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  getEmployeeType(body: any): Observable<any> {
    const url = '/api/v1/cmg/EmployeeTypesPerClientDemographicCommentsList/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  getUserByType(body: any): Observable<any> {
    const url = '/api/v1/cmg/UsersPerEmployeeTypePerClientDemographicCommentsList/';
    return this.http.post(environment.apiBaseUrl + url, body);
  }

  
}
