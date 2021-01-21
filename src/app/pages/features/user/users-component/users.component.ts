import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { APP_CONFIG, PrivilegesStore } from 'src/app/core';
import { UserService } from '../services/user.service';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'ncri-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete '
  };
  configs = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };

  userData:any={};
  loader: boolean = false;
  responseText: any = "";
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('usersDownload') downloadModal: any;
  tab: string = 'allUsers';
  downloadType: string = "csv"; 
  userLoader: boolean=false;
  activateLoader:boolean=false;
  deactivateLoader:boolean=false;
  uncheckableRadioModel = 'Middle';
  selectedPageSize: any = 10;
  checkAll: boolean = false;
  pageConfig: any = {
    size: 10,
    page: 1,
    filter_by:"ALL",
    search_text: ""
  }
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  @ViewChild('uploadRecord') uploadRecord: TemplateRef<any>;
  @ViewChild('preview') preview: TemplateRef<any>;
  paginationConfig = {
    count: 0,
    num_pages: 0
  }
  userList: any = [];
  userStats: any = {
    "total_users_count": 0,
    "locked_users_count": 0,
    "unlocked_users_count": 0,
    "activated_users_count": 0,
    "deactivated_users_count": 0,
    "pending_users_count": 0,
    "approved_users_count": 0,
    "cancelled_users_count": 0
  }
  approveLoader: boolean = false;
  cancelLoader: boolean = false;
  errors: any[];


  // select2
  public exampleData: Array<Select2OptionData>; 
  public options: Options;
  public value: string[];
  public placeholder = 'placeholder';
  selectedStatusFilter = 'ALL';
  // end

  records = "records";
  preview_fields = "preview_fields";
  preview_fields_edit = "preview_fields_edit";
 constructor(
   private modalService: BsModalService,
   private service: UserService,
   private router: Router,
   public privileges: PrivilegesStore
   ) {}

  ngOnInit(): void {
    this.getUsers();
    if(this.privileges.privilegeHash['uam.views.UsersList']['c']){
      this.getStats();
    }
    // select2 
    this.exampleData = [
      {
        id: '',
        text: ''
      },
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2', 
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];  
    this.options = { 
      multiple: false, 
      minimumResultsForSearch:-1,
      theme : "custom-select",   
      placeholder: 'Input Type',
    }; 
    // end
  }
  statusFilter(): void {
    debugger
    this.pageConfig.filter_by = this.selectedStatusFilter;
    this.pageConfig.page = 1;
    this.getUsers();
  }
  public valueChanged(event: string) {
    console.log('value changed: ' + event);
  }

  public modelChanged(event: string) {
    console.log('model changed: ' + event);
  }

  ngAfterViewInit(){
    fromEvent(this.searchInput.nativeElement,'keyup')
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          // console.log(this.searchInput.nativeElement.value)
          this.pageConfig.page = 1;
          // this.pageConfig.search_text = this.searchInput.nativeElement.value;
          this.getUsers()
        })
    )
    .subscribe();
  }

  changePageSize(){
    this.pageConfig.size = parseInt(this.selectedPageSize);
    this.pageConfig.page = 1;
    this.getUsers();
  }

  //set tab
  setTab(tab: string){
     this.tab = tab;
  }

  selectAll(){
    if(this.checkAll === true){
      this.userList.map(it => {
        (!this.privileges.privilegeHash['uam.views.ApproveMultipleUser']['c']
          && !this.privileges.privilegeHash['uam.views.CancelMultipleUser']['c']) ?

          '' : (this.privileges.privilegeHash['uam.views.ApproveMultipleUser']['c']
            || this.privileges.privilegeHash['uam.views.CancelMultipleUser']['c']) ?
            (it.status === 'P' && it.imported_from_active_directory === false)
              ? it.check = true : ''
            : ''
      });
    }else{
      this.userList.map(it => it.check= false);
    }
  }
  
  openModalActivate(userActivate: TemplateRef<any>,data) {
    this.userData = data
    this.modalRef = this.modalService.show(
      userActivate,this.config
      // , this.config
      );
      
    // this.modalRef.content.userActivate = 'Close';

  }
  openModalDeactivate(userDeactivate: TemplateRef<any>,data) {
    this.userData = data
    this.modalRef = this.modalService.show(userDeactivate, this.config);
    // this.modalRef.content.userActivate = 'Close';

  }

  openDeleteUser(deleteUser: TemplateRef<any>,data) {
    this.userData = data
    this.modalRef = this.modalService.show(deleteUser, this.config);
    // this.modalRef.content.userActivate = 'Close';

  }
  openUsersDownload(usersDownload: TemplateRef<any>) { 
    this.modalRef = this.modalService.show(usersDownload, this.config);
    // this.modalRef.content.userActivate = 'Close';

  }
  openUploadRecode(uploadRecord: TemplateRef<any>) { 
    this.modalRef = this.modalService.show(uploadRecord, this.config);
    this.modalRef.content.uploadRecord = 'Close'; 
  }
  openPreviewFields(preview: TemplateRef<any>) { 
    this.modalRef = this.modalService.show(preview, this.configs);
    this.modalRef.content.preview = 'Close'; 
  }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  getUsers(){
    this.userLoader=true;
    this.service.usersList(this.pageConfig).subscribe((res) => {
      
      if(res.status === "success"){
        this.userList = res.data.qs;
        this.userList.map(it => it.check = false);
        // this.userList[0].imported_from_active_directory = true;
        // this.userList[0].required_columns_missing_values = true;
        this.paginationConfig = res.data;
        this.userLoader=false;
      } else{
        this.userLoader=false;
        // alert("Something went wrong try again");
      }
    }, (error)=>{
      this.userLoader=false;
    })
  }

  // searchUser(){
  //   this.pageConfig.page = 1;
  //   this.getUsers();
  // }

  downloadUserList(){
    //debugger
    let obj = {
      output_format: this.downloadType
    }
    this.service.downloadList(obj).subscribe((res:any) => {
      //debugger
      if(res.status === "success"){
        //debugger
      }
    }, (error)=>{
      //debugger
    })
  }

  pageChanged(event: any): void {
    //debugger
    this.pageConfig.page = event.page;
    this.getUsers();
    
  }

  downloadFile(type) {
    this.downloadType = type;
    let _this = this;
    if (this.downloadType === "xlsx") { return }
    var url = APP_CONFIG.apiBaseUrl + "/api/v1/uam/DownloadUsersList/";
    var xhr = new XMLHttpRequest();
    const details = JSON.parse(localStorage.getItem('details'));
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `JWT ${details.token}`);
    xhr.onreadystatechange =  () => {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(xhr.responseText);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'data.csv';
        hiddenElement.click();
      }
    };
    var data = '{"output_format": "' + this.downloadType + '"}';

    xhr.send(data);
  }
  //activate User
 activateUser(ob:any){
   this.activateLoader=true;
  let obj = {
    id: ob
  }
  this.service.unlockUser(obj).subscribe((res) => {
     if(res.status === "success"){
      this.activateLoader=false;
      this.modalRef.hide();
      this.getUsers();
      // this.router.navigate(['/user']);
     }else{
      // alert("Something went wrong try again");
       this.activateLoader=false;
     }
   },(error)=>{
   
   })
  }

   //activate User
 deactivateUser(ob:any){
 this.deactivateLoader=true;
  let obj = {
    id: ob
  }
  this.service.lockUser(obj).subscribe((res) => {
     if(res.status === "success"){
      this.deactivateLoader=false;
      this.modalRef.hide();
      this.getUsers();
    
      // this.router.navigate(['/user']);
     }else{
     this.deactivateLoader=true;
      //  alert("Something went wrong try again");
     }
   },(error)=>{
   
   })
  }

  redirectToCreateUser(id:any,type:any){
    if(type === "view"){
      this.router.navigate(['/user/add'], { queryParams: { type: 'view', id:id } });
    }else{
      this.router.navigate(['/user/view/', id]);
    }
    
  }

  // confirmDelete(obj:any){
  //   let check = confirm("Are you sure you want to delete this user "+obj.first_name + ' ' + obj.last_name+"");
  //   check ? this.deleteUser(obj.id) : "";
  // }

  deleteUserMethod(){
    this.loader = true;
    this.responseText = "";
    let obj = {
      id: this.userData.id
    }
    this.service.deleteUser(obj).subscribe((res:any) => {
      
      if(res.status === "success"){
        this.getUsers();
        this.getStats();
        this.modalRef.hide();
      }else{
        this.responseText = res.code;
      }

      this.loader = false;
    },(error) =>{
      this.loader = false;
      this.responseText = "Sorry something went wrong, Try again.";
    })
  }

  getStats(){
    this.service.getStats().subscribe((res) =>{
      if(res.status === "success"){
        this.userStats = res.data;
      }
    },(error) =>{

    })
  }

  approveAll(){
    let obj = {
      ids: this.userList.filter(it => it.check === true).map(u => u.id)
    }
    this.approveLoader = true;
    this.service.approveMultiple(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.userList.map(it => it.check = false);
        this.checkAll = false;
        this.errors = ["User Approved Successfully"];
        this.getStats();
        this.getUsers();
      }else{
        if(res.errors){
          let arr = [];
          for(var key in res.errors){
            arr.push(key+": " + res.errors[key]);
          }
          this.errors = arr;
        }else{
          this.errors = [res.message]
        }
      }
      this.openErrorModal();
      this.approveLoader = false;
    },(error) =>{
      this.approveLoader = false;
    })
  }

  showbtn(){
    let check = this.userList.some(it => it.check === true)
    return check;
  }

  cancelAll(){
    let obj = {
      ids: this.userList.filter(it => it.check === true).map(u => u.id)
    }
    this.cancelLoader = true;
    this.service.cancelMultiple(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.userList.map(it => it.check = false);
        this.checkAll = false;
        this.errors = ["User Cancelled Successfully"];
        this.getStats();
        this.getUsers();
      }else{
        if(res.errors){
          let arr = [];
          for(var key in res.errors){
            arr.push(key+": " + res.errors[key]);
          }
          this.errors = arr;
        }else{
          this.errors = [res.message]
        }
      }
      this.openErrorModal();
      this.cancelLoader = false;
    },(error) =>{
      this.cancelLoader = false;
    })
  }
  openErrorModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  filterByStatus(status:any){
    this.pageConfig.page = 1;
    this.pageConfig.filter_by = status;
    this.getUsers();
  }
}
