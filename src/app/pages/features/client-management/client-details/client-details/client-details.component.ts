import { ActivatedRoute } from '@angular/router';
import { ClientManagementService } from './../../services/client-management.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientDemographicService } from '../../../client-demographic/services/client-demographic.service';
import { GlobalService } from 'src/app/core';

@Component({
  selector: 'ncri-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  errorModalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
  confige = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };

  commentList: any;
  addCommentForm: FormGroup;
  errorMessage: string;
  // forms declaration
  genericForm: FormGroup;

  demographic: any;
  viewMoreRF = false;
  informationList: any;
  requiredDocuments: any = [];
  groups: any;
  token: string;
  // tslint:disable-next-line: variable-name
  correspondence_language_id: any = [];
  clientIndustryList: any = [];
  clientRemittance: any = [];
  editLoader = false;
  responseText = '';
  bankDetails: FormGroup;
  financialForm: FormGroup;
  // tslint:disable-next-line: variable-name
  interest_rate_cycle_type_id: any = [];
  creditReport: FormGroup; 
  usernameAndPassword: FormGroup;
  // tslint:disable-next-line: variable-name
  credit_bureau_id: any = [];
  partyPlatformForm: FormGroup;
  // tslint:disable-next-line: variable-name
  third_party_platform_id: any = [];
  sortBy = [
    { id: 'DE', name: 'Date Entered' },
    { id: 'P', name: 'Product' },
    { id: 'T', name: 'Time' },
    { id: 'TD', name: 'Transaction Date' },
  ];
  sortByEnum = {
    'DE': 'Date Entered',
    'P': 'Product',
    'T': 'Time',
    'TD': 'Transaction Date'
  }
  invoiceInfo: FormGroup;
  invoice_format_code_id: any = [];
  companyPortalViewForm: FormGroup;
  clientPortalDropdownList: any = [];
  customFieldsForm: FormGroup;
  customFieldDropdown: any = [];
  showReportForm: FormGroup;
  requiredDocumentsForm: FormGroup;
  requiredFieldsForm: FormGroup;
  permissionForm: FormGroup;
  primaryContactForm: FormGroup;
  documentList: any = [];
  groupsList: any = [];
  groupsForm: FormGroup;
  document_type_id: any = [];
  uploadDocumentForm: FormGroup;
  uploadDocumentList: any = [];
  CountryCodeDropdownList: any = [];
  masterClientList: any = [];
  ClientGroupDropdownList: any = [];
  ClientStatusDropdownList: any = [];
  salesRepresentativeList: any = [];
  collectorList: any = [];
  CurrencyCodeDropdownList: any = [];
  ClientTypeDropdownList: any = [];
  HomeBranchDropdownList: any = [];
  clientSystemInfoForm: FormGroup;
  documentQueue: any = [];
  constructor(
    private service: ClientManagementService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public global: GlobalService,
    private clientService: ClientDemographicService
  ) {
    this.initAddCommentForm();

    // init forms
    // init generic info
    this.initGenericInfoForm();
    this.getfinal_demands_end_id();
    this.getClientIndustry();
    this.getClientRemittance();

    // init bank details
    this.initBankDetailsForm();

    // init financial settings form
    this.initFinancialSettings();
    this.getinterest_rate_cycle_type_id();

    // init credit reporting
    this.initCreditReport();
    this.getcredit_bureau_id();

    // init username and password
    this.initUsernameAndPassword();
    this.getUsernameAndPass();

    // init party platform
    this.initPartyPlatform();
    this.getthird_party_platform_id();

    // init invoice option form
    this.initInvoiceInfo();
    this.getinvoice_format_code_id();

    // init company portal view
    this.initCompanyView();
    this.getClientPortal();

    // init custom fields
    this.initCustomFields();
    this.getCustomFieldDropdown();

    // init show reports
    this.initShowReport();

    // init required document
    this.initRequiredDocuments();

    // init required fields
    this.initRequiredFields();

    // init permission
    this.initPermission();

    // init groups
    this.initGroups();

    // init uploaded documents
    this.getDocument_type_id();
    this.initUploadDocument();

    // init primary contact
    this.initPrimaryContact();
    this.getCountryCode();

    // init client system info
    this.getMasterClient();
    this.getClientGroup();
    this.getClientStatus();
    this.getCollector();
    this.getCurrency();
    this.getClientType();
    this.getHomeBranch();
    this.initClientInfoSystem();
  }
  /**
   * on file drop handler
   */
  onFileDropped(event): void {
    this.uploadDocument(event, 'drop');
  }



  getfinal_demands_end_id(): void { // no call available
    this.clientService.getfinal_demands_end_id().subscribe((data) => {
      if (data.status === 'success') {
        this.correspondence_language_id = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getClientIndustry(): void { // no call available
    this.clientService.getClient_industry_id().subscribe((data) => {
      if (data.status === 'success') {
        this.clientIndustryList = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getClientRemittance(): void { // no call available
    this.clientService.getclient_remittance_type_id().subscribe((data) => {
      if (data.status === 'success') {
        this.clientRemittance = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url: string = this.route.snapshot['_routerState'].url;
      const arr: Array<string> = url.split('/');
      this.token = arr[2];
    });

    this.fetchClientDemographic();
    this.clientDemographicContactInformationsList();
    this.clientDemographicRequiredDocumentsList();
  }
  fetchClientGroup(group): void {
    const obj = {
      id: group
    };
    this.service.fetchClientGroup(obj).subscribe((data) => {
      if (data.status) {
        this.groups = data.data;

      }
    }, (error) => {
      console.log(error);
    });

  }
  clientDemographicRequiredDocumentsList(): void {
    const obj = {
      size: 10,
      page: 1,
      client_demographic_id: this.token
    };
    this.service.clientDemographicRequiredDocumentsList(obj).subscribe((data) => {
      if (data.status) {
        this.requiredDocuments = data.data.qs;
      }
    }, (error) => {
      console.log(error);
    });

  }
  clientDemographicContactInformationsList(): void {
    const obj = {
      size: 10,
      page: 1,
      client_demographic_id: this.token
    };
    this.service.clientDemographicContactInformationsList(obj).subscribe((data) => {
      if (data.status) {
        this.informationList = data.data.qs;
        this.informationList = this.informationList.find(it => it.is_primary_contact);

      }
    }, (error) => {
      console.log(error);
    });

  }
  fetchClientDemographic(): void {
    const obj = {
      id: this.token
    };
    this.service.fetchClientDemographic(obj).subscribe((data) => {
      if (data.status) {
        this.demographic = data.data;
        this.demographic ? this.fetchClientGroup(this.demographic.client_group_id) : '';

        // patching value for generic form
        this.genericForm.patchValue(this.demographic);
        this.genericForm.controls.start_date.setValue(new Date(this.demographic.start_date));
        this.genericForm.controls.last_placement.setValue(new Date(this.demographic.last_placement));

        this.genericForm.markAsTouched();
        // this.genericForm. mark();
        this.genericForm.updateValueAndValidity();

        // patching bank details form
        this.bankDetails.patchValue(this.demographic);

        // patching financial settings
        this.financialForm.patchValue(this.demographic);
 
        // patching credit reporting
        this.creditReport.patchValue(this.demographic);
        
        // patching username And Password
        this.usernameAndPassword.patchValue(this.demographic);

        // patching value for party platform
        this.partyPlatformForm.patchValue(this.demographic);

        // patching invoice info form
        this.invoiceInfo.patchValue(this.demographic);

        // patching value for company portal view
        this.companyPortalViewForm.patchValue(this.demographic);

        // patching value for custom fields
        this.customFieldsForm.patchValue(this.demographic);
        this.customFieldsForm.controls.date_for_custom_field.setValue(new Date(this.demographic.date_for_custom_field));

        // patching show reports
        this.showReportForm.patchValue(this.demographic);

        // required document and groups is pending

        // patching required fields
        this.requiredFieldsForm.patchValue(this.demographic);

        // patching permission
        this.permissionForm.patchValue(this.demographic);

        // patching required documents form
        this.demographic.required_document_list.map(it => it.is_deleted = false);
        this.documentList = this.demographic.required_document_list.map(object => ({ ...object }));

        // patching groups
        this.demographic.group_list.map(it => {
          it.is_checked = false;
          it.is_deleted = false;
        });
        this.groupsList = this.demographic.group_list.map(object => ({ ...object }));

        // patching uploaded documents
        this.demographic.document_list.map(it => it.is_deleted = false);
        this.uploadDocumentList = this.demographic.document_list.map(object => ({ ...object }));
        this.uploadDocumentForm.patchValue(this.demographic);

        // patching primary contact
        for (let index = 1; index < this.demographic.contact_information_list.length; index++) {
          this.addContactForm();
        }
        this.primaryContactForm.patchValue(this.demographic);

        // patching client info
        this.clientSystemInfoForm.patchValue(this.demographic);
      }
    }, (error) => {
      console.log(error);
    });
  }

  // init add Comment form
  initAddCommentForm(): void {
    this.addCommentForm = this.fb.group({
      commentText: ['', Validators.required],
      documentUrl: [''],
      // fileName: [''],
    });
  }
  closeModal(): void {
    this.modalRef.hide();
    this.initAddCommentForm();
  }

  openModal(template: any): void {
    this.modalRef = this.modalService.show(template, this.config);
  }
  openModalEditWidget(template: any): void {
    this.modalRef = this.modalService.show(template, this.confige);
  }

  getinterest_rate_cycle_type_id(): void {
    this.clientService.getinterest_rate_cycle_type_id().subscribe((data) => {
      if (data.status) {
        this.interest_rate_cycle_type_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  getcredit_bureau_id(): void {
    this.clientService.getcredit_bureau_id().subscribe((data) => {
      if (data.status) {
        this.credit_bureau_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  getUsernameAndPass(): void {
    this.clientService.getUsernameAndPass().subscribe((data) => { 
      if (data.status) {
        this.credit_bureau_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  getthird_party_platform_id(): void {
    this.clientService.getthird_party_platform_id().subscribe((data) => {
      if (data.status) {
        this.third_party_platform_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  getinvoice_format_code_id(): void {
    this.clientService.getinvoice_format_code_id().subscribe((data) => {
      if (data.status) {
        this.invoice_format_code_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  getClientPortal(): void {
    this.clientService.getClientPortalDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.clientPortalDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getDocument_type_id(): void {
    this.clientService.getDocument_type_id().subscribe((data) => {
      if (data.status) {
        this.document_type_id = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getCustomFieldDropdown(): void {
    this.clientService.getSystemFieldList().subscribe((res: any) => {
      if (res.status === 'success') {
        this.customFieldDropdown = res.data;
      }
    }, (error) => {

    });
  }

  initGenericInfoForm(): void {
    this.genericForm = this.fb.group({
      client_industry_id: [''],
      correspondence_language_id: ['', Validators.required],
      start_date: [new Date(), Validators.required],
      last_placement: [''],
      client_remittance_type_id: ['', Validators.required]
    });
  }

  initBankDetailsForm(): void {
    this.financialForm = this.fb.group({
      hold_debtor_cheques_for_days_num: [''],
      default_settlement: [''],
      return_merchandise_rate: [''],
      return_merchandise_rate_type: [false],
      interest_rate_to_change: ['', Validators.required],

      interest_rate_cycle_type_id: ['', Validators.required],
      on_principle_only: [false],
      calculate_daily: [false],
      daily_debtor_trans: [false]
    });
  }

  initFinancialSettings(): void {
    this.bankDetails = this.fb.group({
      bank_account_number: [''],
      routing_number: [''],
      cheques_payable_to: [''],
      is_pst_exempt: [false],
      is_gst_or_hst_exempt: [false]
    });
  }

  initUsernameAndPassword(): void {
    this.usernameAndPassword = this.fb.group({
      username: [''], 
      password: ['']
    });
  }

  initCreditReport(): void { 
    this.creditReport = this.fb.group({
      credit_bureau_id: [''],
      report_to_credit_bureau: [false],
      report_to_credit_bureau_after_days_num: [''],
      no_credit_bureaus_on_debtors_allowed: [false],
      client_requires_acknowledgements: [false],
      client_requires_payment_notices: [false],
      permission_form_received: [false]
    });
  }

  initPartyPlatform(): void {
    this.partyPlatformForm = this.fb.group({
      third_party_platform_id: [''],
      client_short_name: [''],
      client_member_type: [''],
      client_member_id: ['']
    });
  }

  initInvoiceInfo(): void {
    this.invoiceInfo = this.fb.group({
      invoice_format_code_id: ['', Validators.required],
      sort_by: [''],
      use_direct_invoicing: [''],
      required_individual_debtor_invoices: [''],
      show_outstanding_invoices: [''],
      show_client_payments: [''],
      show_acc_transactions: [''],
      contra_available_funds: [''],
    });
  }

  initCompanyView(): void {
    this.companyPortalViewForm = this.fb.group({
      client_portal_id: ['', Validators.required],
      client_portal_controller: [false],

    });
  }

  initCustomFields(): void {
    this.customFieldsForm = this.fb.group({
      ace_number: [''],
      pcs_number: [''],
      date_for_custom_field: [''],
      custom_field_id: ['']
    });
  }

  initShowReport(): void {
    this.showReportForm = this.fb.group({
      sr_accounts_report: [false],
      sr_client_statement_without_adjustments: [false],
      sr_client_statement_report_no_interest: [false],
      sr_client_statement_with_adjustments: [false],
      sr_payments_with_client_disb: [false],
      sr_payments_with_notes: [false],
      sr_portfolio_dashboard_report: [false],
      sr_portfolio_liquidation: [false],
      sr_status_report: [false],
      sr_status_report_all_notes: [false],
      sr_status_report_2: [false]
    });
  }

  initRequiredDocuments(): void {
    this.requiredDocumentsForm = this.fb.group({
      required_document_list: [[]],
      document_name: ['']
    });
  }

  addDocumentName(): void {
    if (this.requiredDocumentsForm.controls.document_name.value) {
      const check = this.documentList.some(it => it.name.toLowerCase() ===
        this.requiredDocumentsForm.controls.document_name.value.toLowerCase());
      if (!check) {
        const obj = {
          id: '',
          name: this.requiredDocumentsForm.controls.document_name.value,
          is_deleted: false
        };
        this.documentList.push(obj);
        this.requiredDocumentsForm.controls.document_name.setValue('');
      }

    }
  }

  deleteDocumentName(obj): void {
    obj.is_deleted = true;
  }

  initGroups(): void {
    this.groupsForm = this.fb.group({
      group_list: [[]],
      group_name: ['']
    });
  }

  addGroup(): void {
    if (this.groupsForm.controls.group_name.value) {
      const check = this.groupsList.some(it => it.name.toLowerCase() === this.groupsForm.controls.group_name.value.toLowerCase());
      if (!check) {
        const obj = {
          id: '',
          name: this.groupsForm.controls.group_name.value,
          is_deleted: false,
          is_checked: false
        };
        this.groupsList.push(obj);
        this.groupsForm.controls.group_name.setValue('');
      }

    }
  }

  deleteGroup(obj): void {
    obj.is_deleted = true;
  }

  initRequiredFields(): void {
    this.requiredFieldsForm = this.fb.group({
      rf_first_name: [false],
      rf_middle_name: [false],
      rf_last_name: [false],
      rf_aka: [false],
      rf_company_name: [false],
      rf_contact_title: [false],
      rf_contact_name: [false],
      rf_address: [false],
      rf_city: [false],
      rf_state_or_province: [false],
      rf_zip_code: [false],


      rf_cell: [false],
      rf_phone: [false],
      rf_fax: [false],
      rf_ssn: [false],
      rf_date_of_birth: [false],
      rf_email_address: [false],
      rf_notes: [false],
    });
  }

  initPermission(): void {
    this.permissionForm = this.fb.group({
      p_edit_collection_status: [false],
      p_reminder: [false],
      p_add_accounts_manually: [false],
      p_upload_documents: [false],
      p_upload_bulk_account_files: [false],
      p_search_for_accounts: [false],
    });
  }

  initPrimaryContact(): void {
    this.primaryContactForm = this.fb.group({
      contact_information_list: new FormArray([
        this.fb.group({
          id: [''],
          contact_title: ['', Validators.required],
          full_name: ['', Validators.required],
          email_address: ['', Validators.compose([Validators.required, Validators.email])],
          country_code: ['', Validators.required],
          phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10,10}$/)])],
          phone_number_ext: [''],
          is_primary_contact: [false],
          is_deleted: [false]
        })
      ]),
    });
  }

  addContactForm(): void {
    const formArray = this.primaryContactForm.controls.contact_information_list as FormArray;
    if (this.isContactDelete()) {
      formArray.push(this.fb.group({
        id: [''],
        contact_title: ['', Validators.required],
        full_name: ['', Validators.required],
        email_address: ['', Validators.compose([Validators.required, Validators.email])],
        country_code: ['', Validators.required],
        phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10,10}$/)])],
        phone_number_ext: [''],
        is_primary_contact: [false],
        is_deleted: [false]
      }));
    }
  }

  toggleMasterClient() {
    let check = this.clientSystemInfoForm.controls.is_master_client.value;
    if(check){
      this.clientSystemInfoForm.controls.master_client_id.setValue("");
    }
    // check === true ? this.showMasterClient = false : this.showMasterClient = true;

  }

  selectIsPrimary(index: any): void {
    const form = this.primaryContactForm.controls.contact_information_list['controls'];
    for (let i = 0; i < form.length; i++) {
      if (i !== index) {
        form[i].controls.is_primary_contact.setValue(false);
      }
    }
  }

  deletePrimaryContact(index): void {
    
    const formArray = this.primaryContactForm.controls.contact_information_list as FormArray;
    formArray.controls[index]['controls'].is_deleted.setValue(true);
    
  }

  isContactDelete(){
    const formArray = this.primaryContactForm.controls.contact_information_list as FormArray;
    let arr = formArray.controls.filter(it => it['controls'].is_deleted.value === false)
    if(arr.length <= 2){
      return true
    }else{return false}
  }

  getCountryCode(): void {
    this.clientService.getCountryCodeDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.CountryCodeDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  initUploadDocument(): void {
    this.uploadDocumentForm = this.fb.group({
      document_type_id: [''],
      document_list: [[]],
      document_description: [false]
    });
  }

  uploadDocument(input: any, type: string): void {
    // if (input.files?.length === 0) {
    //   return;
    // }
    this.errorMessage = '';
    debugger
    if (type === 'drop' ? input.length === 0 : input.files.length === 0) {
      this.errorMessage = 'Please select file';
      return;
    }
    if (!this.document_type_id || !this.document_type_id[0]?.name) {
      this.errorMessage = 'Please select file type first';
      return;
    }
    const formData = new FormData();
    type === 'drop' ? formData.append('document_file', input[0]) : formData.append('document_file', input.files[0]);
    if (this.global.validateUploadFileExtension(type === 'drop' ? input[0].name : input.files[0].name, this.document_type_id[0]?.name)) {
      return;
    }
    // this.addCommentForm.controls.fileName.setValue(input.files[0].name);
    this.service.uploadDocument(formData).subscribe((data) => {
      let type = this.document_type_id.find(it => it.id === this.uploadDocumentForm.controls.document_type_id.value);
      if (data.status) {
        const obj = {
          document_url: data.data.url,
          filename: type === 'drop' ? input[0].name :
          input.files[0].name,
          id: '',
          document_description:this.uploadDocumentForm.controls.document_description.value,
          document_type__name:type.name,
          is_deleted: false,
          created_at: new Date(),
          user__first_name:this.global.userFullName.split(' ')[0],
          user__last_name:this.global.userFullName.split(' ')[1]
        };
        // this.uploadDocumentList.push(obj);
        this.documentQueue.push(obj)
      }
    }, (error) => {
      console.log(error);
    });
  }

  deleteDocument(obj: any): void {
    obj.is_deleted = true;
  }

  addToList(){
    this.uploadDocumentList = [...new Set([...this.uploadDocumentList ,...this.documentQueue])];
    this.documentQueue = [];
    this.uploadDocumentForm.controls.document_description.setValue("");
  }

  // update upload documents
  uploadUpdateDocuments(body: any): void {
    body.document_list = this.uploadDocumentList.filter(it => {
      if(it.id === "" && it.is_deleted === true){
        return false;
      }

      return true
    })
    // body.document_list = this.uploadDocumentList;
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateUploadedDocuments(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }



  // updating generic settings
  updateGenericSettings(body: any): void {
    body.start_date = this.global.dateFormat(body.start_date);
    body.last_placement = this.global.dateFormat(body.last_placement);
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateGenericSettings(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateBankDetails(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateBankDetails(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateFinancialSettings(body: any): void {
    // adding client id in body
    body.id = this.token;
    // to do: set true false for return_merchandise_rate_type
    body.return_merchandise_rate_type ? body.return_merchandise_rate_type = '$' :
    body.return_merchandise_rate_type = '%';
    this.editLoader = true;
    this.service.updateFinancialSettings(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateCreditReport(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateCreditReport(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updatePrtyPlatform(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updatePartyPlatform(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateInvoiceOptions(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateInvoiceInfo(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateCompanyView(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateCompanyView(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateCustomFields(body: any): void {
    body.date_for_custom_field = this.global.dateFormat(body.date_for_custom_field);
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateCustomFields(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateShowReport(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateShowReport(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateRequiredFields(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateRequiredFields(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updatePermission(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updatePermission(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateRequiredDocument(body: any): void {
    // adding client id in body
    body.id = this.token;
    body.required_document_list = this.documentList;
    this.editLoader = true;
    this.service.updateRequiredDocument(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updateGroup(body: any): void {
    // adding client id in body
    body.id = this.token;
    body.group_list = this.groupsList;
    this.editLoader = true;
    this.service.updateGroups(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  updatePrimaryContact(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updatePrimaryContact(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }

  getErrors(response): string {
    let arr = [];
    if (response.errors) {
      for (var key in response.errors) {
        arr.push(key + ' ' + response.errors[key].toString());
      }
    } else {
      arr.push(response.message);
    }
    return arr.toString();
  }


  closeUploadedDocumentsModal(): void {
    this.modalRef.hide();
    this.uploadDocumentList = this.demographic.document_list;
  }

  closeGroupModal(): void {
    this.modalRef.hide();
    // this.groupsList.map(it => it.is_deleted = false);
    this.groupsList = this.demographic.group_list;
  }

  closeRequiredDocuments(): void {
    this.modalRef.hide();
    this.documentList = this.demographic.required_document_list;

  }

  // client system info
  updateSystemClient(body: any): void {
    // adding client id in body
    body.id = this.token;
    this.editLoader = true;
    this.service.updateSystemClient(body).subscribe((res) => {
      if (res.status === 'success') {
        this.fetchClientDemographic();
        this.modalRef.hide();
      } else {
        this.responseText = this.getErrors(res);
        this.errorModalRef = this.modalService.show(this.errorModal, this.config);
      }
      this.editLoader = false;
    }, (error) => {
      this.editLoader = false;
    });
  }
  initClientInfoSystem(): void {
    this.clientSystemInfoForm = this.fb.group({
      home_branch_id: [''],
      client_type_id: [''],
      currency_code: [''],
      default_commission: [''],
      sales_representative_id: [''],
      collector_id: [''],
      client_status_id: [''],
      client_group_id: [''],
      master_client_id: [''],
      is_master_client: [false],
      restricted_access_client: [false],
    });

  }


  getHomeBranch(): void {
    this.clientService.getHomeBranchDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.HomeBranchDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getClientType(): void {
    this.clientService.getClientTypeDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.ClientTypeDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getCurrency(): void {
    this.clientService.getCurrencyCodeDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        // this.CurrencyCodeDropdownList = res.data;
        for (var key in res.data) {
          let obj = { name: res.data[key].name, code: res.data[key].code };
          this.CurrencyCodeDropdownList.push(obj);
        }
      }
    }, (error) => {

    });
  }

  getCollector(): void {
    this.clientService.getReportingUserDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.collectorList = res.data;
        this.salesRepresentativeList = res.data;
      }
    }, (error) => {

    });
  }

  getClientStatus(): void {
    this.clientService.getClientStatusDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.ClientStatusDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getClientGroup(): void {
    this.clientService.getClientGroupDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.ClientGroupDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getMasterClient(): void {
    this.clientService.getClientDemographicDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.masterClientList = res.data;
      }
    }, (error) => {

    });
  }

}
