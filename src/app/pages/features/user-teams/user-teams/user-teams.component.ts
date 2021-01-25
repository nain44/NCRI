import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { APP_CONFIG, PrivilegesStore } from 'src/app/core';
import { TeamService } from '../services/user-teams.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'ncri-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent implements OnInit {

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

  teamData:any={};
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
  teamList: any=[];

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
   private service: TeamService,
   private router: Router,
  // public privileges: PrivilegesStore
   ) {}

  ngOnInit(): void {
    this.getTeams();
    //if(this.privileges.privilegeHash['uam.views.UsersList']['c']){
      // this.getStats();
   // }
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
    this.getTeams();
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
          this.getTeams()
        })
    )
    .subscribe();
  }

  changePageSize(){
    this.pageConfig.size = parseInt(this.selectedPageSize);
    this.pageConfig.page = 1;
    this.getTeams();
  }

  //set tab
  setTab(tab: string){
     this.tab = tab;
  }

  selectAll(){
      if(this.checkAll === true){
      this.teamList.map(it => {it.check = true
      });
    }else{
      this.teamList.map(it => it.check= false);
    }
  }
  
  openModalActivate(userActivate: TemplateRef<any>,data) {
    this.teamData = data
    this.modalRef = this.modalService.show(
      userActivate,this.config
      // , this.config
      );
      
    // this.modalRef.content.userActivate = 'Close';

  }
  openModalDeactivate(userDeactivate: TemplateRef<any>,data) {
    this.teamData = data
    this.modalRef = this.modalService.show(userDeactivate, this.config);
    // this.modalRef.content.userActivate = 'Close';

  }

  openDeleteTeam(deleteTeam: TemplateRef<any>,data) {
    
    this.teamData = data
    this.modalRef = this.modalService.show(deleteTeam, this.config);
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
  
  getTeams(){
    this.userLoader=true;
    this.service.TeamList(this.pageConfig).subscribe((res) => {
      
      if(res.status === "success"){
        this.teamList = res.data.qs;
        debugger
        this.teamList.map(it => it.check = false);
      
        this.paginationConfig = res.data;
        this.userLoader=false;
      } else{
        this.userLoader=false;
    
      }
    }, (error)=>{
      this.userLoader=false;
    })
  }

 
 
  pageChanged(event: any): void {
    //debugger
    this.pageConfig.page = event.page;
    this.getTeams();
    
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

  deleteTeamsMethod(){
    debugger
    this.loader = true;
    this.responseText = "";
    let obj = {
      id: this.teamData.id
    }
    this.service.DeleteTeam(obj).subscribe((res:any) => {
      
      if(res.status === "success"){
        this.getTeams();
        // this.getStats();
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

  showbtn(){
    
    let check = this.teamList.some(it => it.check === true)
    return check;
  }
  openErrorModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  filterByStatus(status:any){
    this.pageConfig.page = 1;
    this.pageConfig.filter_by = status;
    this.getTeams;
  }
}
