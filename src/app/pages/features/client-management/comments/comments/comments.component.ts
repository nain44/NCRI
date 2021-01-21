import { IMultiSelectTexts, IMultiSelectSettings } from 'ngx-bootstrap-multiselect';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientManagementService } from '../../services/client-management.service';
import { GlobalService } from 'src/app/core';

@Component({
  selector: 'ncri-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  modalRef: BsModalRef;
  selectedUsers: any = []
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment'
  };

  configs = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };

  items = [];
  commentList: any = [];
  addCommentForm: FormGroup;

  token: string;

  paginationConfig: any;
  userName: string;
  loader = false;
  fileLoader = false;
  addCommentLoader = false;
  selectedUser: any;
  filterForm: FormGroup;
  commentsOf = 'all';
  isLoadMore: boolean = false;
  demographic: any;
  employeeTypeList: any = [];
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    
};
mySettings: IMultiSelectSettings = {
  enableSearch: false,
  checkedStyle: 'checkboxes',
  buttonClasses: 'btn btn-default',
  dynamicTitleMaxItems: 2,
  displayAllSelectedText: false
};
  fileUploadError = false;
  constructor(
    private service: ClientManagementService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private global: GlobalService,
  ) {
    this.initAddCommentForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url: string = this.route.snapshot['_routerState'].url;
      const arr: Array<string> = url.split('/');
      this.token = arr[2];
    });

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
    this.getComments();
    this.fetchClientDemographic();
    // this.reportingUserDropdownList();
    this.getUser();
    this.getEmployeeType();

  }
  //fetch client demographics
  fetchClientDemographic(): void {
    const obj = {
      id: this.token
    };
    this.service.fetchClientDemographic(obj).subscribe((data) => {
      if (data.status) {
        this.demographic = data.data;
      }
    }, (error) => {
      console.log(error);
    });

  }
  // setCommentsOf(): void {
  //   if (this.commentsOf === 'all') {
  //     this.paginationConfig.page = 1;
  //     this.paginationConfig.filter_by_date = false;
  //     this.paginationConfig.filter_by_user = false;
  //     this.commentList = [];
  //     this.getComments();
  //   } else {
  //     this.paginationConfig.page = 1;
  //     this.paginationConfig.filter_by_date = false;
  //     this.paginationConfig.filter_by_user = true;
  //     if (this.paginationConfig.user_ids.length !== 0) {
  //       this.commentList = [];
  //       this.getComments();
  //     }
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
      this.getComments();
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
    this.getComments();
  }
  // onUserTagRemove(event): void {
  //   this.paginationConfig.page = 1;

  //   this.paginationConfig.filter_by_date = false;
  //   this.paginationConfig.filter_by_user = true;
  //   const index = this.paginationConfig.user_ids.findIndex(it => it === event.id);
  //   this.paginationConfig.user_ids.splice(index, 1);
  //   if (index === -1) {
  //     this.commentList = [];
  //     this.getComments();
  //   }
  // }
  filterByDate($event): void {

    this.paginationConfig.page = 1;
    this.paginationConfig.start_date = this.global.dateFormat($event[0]);
    this.paginationConfig.end_date = this.global.dateFormat($event[1]);

    this.paginationConfig.filter_by_date = true;
    this.getComments();

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
        this.getComments();
        this.addCommentLoader = false;
      }
    }, (error) => {
      console.log(error);
      this.addCommentLoader = false;
    });

  }
  toggleClientDemographicCommentBookmark(commentID): void {

    const obj = {
      id: commentID
    };
    this.service.toggleClientDemographicCommentBookmark(obj).subscribe((data) => {
      if (data.status) {
        this.paginationConfig.filter_by_date = false;
        this.commentList = [];
        this.getComments();
      }
    }, (error) => {
      console.log(error);
    });

  }
  reportingUserDropdownList(): void {
    this.service.reportingUserDropdownList().subscribe((data) => {
      if (data.status) {
        this.items = data.data;
      }
    }, (error) => {
      console.log(error);
    });

  }
  uploadDocument(input: HTMLInputElement): void {
    this.fileLoader = true;
    const formData = new FormData();
    if (input.files[0].size > 2000000) {
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
  getUser(): string {
    this.userName = localStorage.getItem('details');
    this.userName = JSON.parse(this.userName);
    this.userName = this.userName['user'].username;
    // this.items.push(this.userName);
    return this.userName;

  }

  getComments(): void {
    this.loader = true;
    this.service.clientDemographicCommentsList(this.paginationConfig).subscribe((res) => {
      if (res.status === 'success') {
        this.commentList = [...this.commentList, ...res.data.qs];
      }

      // res.data.count = 22
       //checking if load more should show or not
       if(res.data.count <= this.paginationConfig.size){
        this.isLoadMore = false;
      }else{
        this.isLoadMore = true;
      }
      this.loader = false;
    }, (error) => {
      this.loader = false;
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
  // init filter form
  initFilterForm(): void {
    this.filterForm = this.fb.group({
      selectedUsers: [''],
    });
  }

  loadNext(): void {
    this.paginationConfig.page += 1;
    this.getComments();
  }


  closeModal(): void {
    this.modalRef.hide();
    this.initAddCommentForm();
  }

  openModal(template: any): void {
    this.modalRef = this.modalService.show(template, this.config);
  }
  openModalContent(template: any): void {
    this.modalRef = this.modalService.show(template, this.configs);
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
