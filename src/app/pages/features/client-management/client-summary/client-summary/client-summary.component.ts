import { ClientDemographicService } from './../../../client-demographic/services/client-demographic.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GlobalService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { ClientManagementService } from './../../services/client-management.service';
import { AfterViewInit, Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
declare var $;
@Component({
  selector: 'ncri-client-summary',
  templateUrl: './client-summary.component.html',
  styleUrls: ['./client-summary.component.scss']
})
export class ClientSummaryComponent implements OnInit, AfterViewInit {
  commentList = [];
  informationList: any;
  transactionList = [];
  demographic: any;
  downloadFormat: string;
  token: string;
  userName: string;
  items = [];
  transactionFilterObj: any;
  paginationConfig: any;
  commentsOf = 'all';
  modalRef: BsModalRef;
  confige = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };
  primaryContactForm: FormGroup;
  CountryCodeDropdownList: any = [];
  editLoader = false;
  responseText = '';
  errorModalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  addCommentForm: FormGroup;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
  fileLoader = false;
  addCommentLoader = false;
  employeeTypeList: any = [];
  selectedUsers: any = [];
  fileUploadError = false;
  fileErrorText: string;
  constructor(
    private service: ClientManagementService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private global: GlobalService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private clientService: ClientDemographicService
  ) {
    
    // init primary contact
    this.initPrimaryContact();
    this.initAddCommentForm();
    this.getCountryCode();
   }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url: string = this.route.snapshot['_routerState'].url;
      const arr: Array<string> = url.split('/');
      this.token = arr[2];
    });
    this.transactionFilterObj = {
      size: 10,
      page: 1,
      client_demographic_id: this.token
    };
    this.paginationConfig = {
      size: 10,
      page: 1,
      filter_by_user: false,
      user_ids: [],
      filter_by_date: false,
      client_demographic_id: this.token,
      employee_type_ids:[],
      filter_by_employee_type: false
    };

    // this.reportingUserDropdownList();
    this.clientDemographicTransactionsList();
    this.fetchClientDemographic();
    this.clientDemographicContactInformationsList();
    this.clientDemographicCommentsList();
    this.getUser();
    this.getEmployeeType();
  }
  getCountryCode(): void {
    this.clientService.getCountryCodeDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.CountryCodeDropdownList = res.data;
      }
    }, (error) => {

    });
  }
  AddClientDemographicComment(): void {
    this.addCommentLoader = true;
    const obj = {
      comment_text: this.addCommentForm.value.comment_text,
      document_url: this.addCommentForm.value.document_url,
      client_demographic_id: this.token
    };
    this.service.AddClientDemographicComment(obj).subscribe((data) => {
      if (data.status) {
        this.closeModal();
        this.paginationConfig.filter_by_date = false;
        this.commentList = [];
        this.clientDemographicCommentsList();
        this.addCommentLoader = false;
      }
    }, (error) => {
      console.log(error);
      this.addCommentLoader = false;
    });

  }
  closeModal(): void {
    this.modalRef.hide();
    this.initAddCommentForm();
  }
  uploadDocument(input: HTMLInputElement): void {
    this.fileLoader = true;
    const formData = new FormData();
    if (input.files[0].size > 2000000) {
      this.fileErrorText = 'File larger then 2MB';
      this.fileUploadError = true;
      this.fileLoader = false;
      return;
    }
    if (this.global.validateUploadFileExtension(input.files[0].name)) {
      this.fileErrorText = 'Invalid file type. Only PDF, CSV & XLSX are allowed';
      this.fileUploadError = true;
      this.fileLoader = false;
      return;
    }
    formData.append('document_file', input.files[0]);
    // this.addCommentForm.controls.fileName.setValue(input.files[0].name);
    this.service.uploadDocument(formData).subscribe((data) => {
      if (data.status) {
        this.addCommentForm.controls.document_url.setValue(data.data.url);
        this.fileLoader = false;
      }
    }, (error) => {
      console.log(error);
      this.fileLoader = false;
    });

  }
  // init add Comment form
  initAddCommentForm(): void {
    this.addCommentForm = this.fb.group({
      comment_text: ['', Validators.required],
      document_url: [''],
      // fileName: [''],
    });
  }
  openModal(template: any): void {
    this.modalRef = this.modalService.show(template, this.config);
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
          phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\+?1?\d{10,10}$/)])],
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
        phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\+?1?\d{9,15}$/)])],
        phone_number_ext: [''],
        is_primary_contact: [false],
        is_deleted: [false]
      }));
    }
  }
  getErrors(response): string {
    const arr = [];
    if (response.errors) {
      for (var key in response.errors) {
        arr.push(key + ' ' + response.errors[key].toString());
      }
    } else {
      arr.push(response.message);
    }
    return arr.toString();
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
  selectIsPrimary(index: any): void {
    const form = this.primaryContactForm.controls.contact_information_list['controls'];
    for (let i = 0; i < form.length; i++) {
      if (i !== index) {
        form[i].controls.is_primary_contact.setValue(false);
      }
    }
  }
  openModalEditWidget(template: any): void {
    this.modalRef = this.modalService.show(template, this.confige);
  }
  // setCommentsOf(): void {
  //   if (this.commentsOf === 'all') {
  //     this.paginationConfig.page = 1;
  //     this.paginationConfig.filter_by_date = false;
  //     this.paginationConfig.filter_by_user = false;
  //     this.clientDemographicCommentsList();
  //   } else {
  //     this.paginationConfig.page = 1;
  //     this.paginationConfig.filter_by_date = false;
  //     this.paginationConfig.filter_by_user = true;
  //     this.paginationConfig.user_ids.length === 0 ? '' : this.clientDemographicCommentsList();
  //   }
  // }

  onSelectType(){ 
    if(this.commentsOf === "all"){
      this.selectedUsers = [];
      this.items = [];
      this.paginationConfig.page = 1;
      this.paginationConfig.filter_by_date = false;
      this.paginationConfig.filter_by_user = false;
      this.paginationConfig.filter_by_employee_type = false;
      this.paginationConfig.employee_type_ids = [];
      this.paginationConfig.user_ids = [];
      this.commentList = [];
      this.clientDemographicCommentsList();
    }else{
      this.getAllUserByType();
    }
  }

  onUserTagAdd(event): void {
    // if(this.paginationConfig.user_ids.length === 0){
      if(event === "" && this.selectedUsers.length === 0){
        return
      }
    // }
    
    this.paginationConfig.page = 1;
    this.paginationConfig.filter_by_date = false;
    this.paginationConfig.filter_by_user = true;
    this.paginationConfig.filter_by_employee_type = true;
    this.paginationConfig.employee_type_ids = [this.commentsOf];
    // this.paginationConfig.user_ids.push(event.id);
    this.paginationConfig.user_ids = this.selectedUsers.map(it => it.user_id);
    this.commentList = [];
    this.clientDemographicCommentsList();
  }


  // onUserTagAdd(event): void {
  //   this.paginationConfig.page = 1;
  //   this.paginationConfig.filter_by_date = false;
  //   this.paginationConfig.filter_by_user = true;
  //   this.paginationConfig.user_ids.push(event.id);
  //   this.clientDemographicCommentsList();
  // }
  // onUserTagRemove(event): void {
  //   this.paginationConfig.page = 1;
  //   this.paginationConfig.filter_by_date = false;
  //   this.paginationConfig.filter_by_user = true;
  //   const index = this.paginationConfig.user_ids.findIndex(it => it === event.id);
  //   this.paginationConfig.user_ids.splice(index, 1);
  //   // this.paginationConfig.user_ids.push(event.id);

  //   index === -1 ? '' : this.clientDemographicCommentsList();
  // }
  reportingUserDropdownList(): void {
    this.service.reportingUserDropdownList().subscribe((data) => {
      if (data.status) {
        this.items = data.data;
      }
    }, (error) => {
      console.log(error);
    });

  }
  commentFilterByDate($event): void {
    this.paginationConfig.page = 1;
    this.paginationConfig.start_date = this.global.dateFormat($event[0]);
    this.paginationConfig.end_date = this.global.dateFormat($event[1]);

    this.paginationConfig.filter_by_date = true;
    this.paginationConfig.filter_by_user = false;
    this.clientDemographicCommentsList();

  }
  toggleClientDemographicCommentBookmark(commentID): void {

    const obj = {
      id: commentID
    };
    this.service.toggleClientDemographicCommentBookmark(obj).subscribe((data) => {
      if (data.status) {
        this.paginationConfig.filter_by_date = false;
        this.paginationConfig.filter_by_user = false;
        this.clientDemographicCommentsList();
      }
    }, (error) => {
      console.log(error);
    });

  }
  filterByDate($event): void {
    this.transactionFilterObj.page = 1;
    this.transactionFilterObj.start_transaction_date = this.global.dateFormat($event[0]);
    this.transactionFilterObj.end_transaction_date = this.global.dateFormat($event[1]);

    this.transactionFilterObj.filter_by_transaction_date = true;
    this.clientDemographicTransactionsList();

  }
  getUser(): string {
    this.userName = localStorage.getItem('details');
    this.userName = JSON.parse(this.userName);
    this.userName = this.userName['user'].username;
    // this.items.push(this.userName);
    return this.userName;

  }
  downloadClientDemographicTransactionsList(type): void {
    const obj = {
      output_format: this.downloadFormat = type,
      client_demographic_id: this.token
    };
    this.service.downloadClientDemographicTransactionsList(obj).subscribe((data) => {
      debugger
      const a = this.renderer.createElement('a');
      this.renderer.setAttribute(a, 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
      this.renderer.setAttribute(a, 'download', 'transactions.' + type);
      this.renderer.setStyle(a, 'display', 'none');
      a.click();
    }, (error) => {
      debugger
      console.log(error);
      const hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(error.error.text);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'clients.csv';
      hiddenElement.click();
    });

  }
  clientDemographicTransactionsList(): void {

    this.service.clientDemographicTransactionsList(this.transactionFilterObj).subscribe((data) => {
      if (data.status) {
        this.transactionList = data.data.qs;
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
        // patching primary contact
        for (let index = 1; index < this.demographic.contact_information_list.length; index++) {
          this.addContactForm();
        }
        this.primaryContactForm.patchValue(this.demographic);

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
  clientDemographicCommentsList(): void {
    this.service.clientDemographicCommentsList(this.paginationConfig).subscribe((data) => {
      if (data.status) {
        this.commentList = data.data.qs;

      }
    }, (error) => {
      console.log(error);
    });

  }
  select2Init(): void {
    $('.selectDropdown').select2({
      minimumResultsForSearch: -1
    });
  }

  ngAfterViewInit(): void {
    // this.select2Init();
  }

  getEmployeeType(){
    const obj = {
      id: this.token
    };
    this.service.getEmployeeType(obj).subscribe((res) => {
      if(res.status === "success"){
        this.employeeTypeList = res.data;
      }
    },(error) =>{

    })
  }

  getAllUserByType(){
    let obj = {
      employee_type_id:this.commentsOf,
      client_demographic_id:this.token
    }
    this.service.getUserByType(obj).subscribe((res) => {
      if(res.status === "success"){
        this.items = res.data;
      }
    },(error) =>{

    })
  }

}
