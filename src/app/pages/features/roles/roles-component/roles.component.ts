import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoleService } from '../services';
import { fromEvent } from 'rxjs';
// import { Select2OptionData } from 'ng-select2';


@Component({
  selector: 'ncri-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  // public exampleData: Array<Select2OptionData>; 

  tab: string = 'customized'
  customizeRoleList: any[] = [];
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };
  modalRef: BsModalRef;
  globalRoleList: any[] = [];
  selectedRole: any = {
    name: "",
  };
  responseText: string = "";
  loader: boolean = false;
  error: boolean = false;
  requestLoader: boolean = false;
  //set tab
  setTab(tab: string) {
    this.tab = tab;
  }
  //pagination
  pageConfig: any = {
    size: 10,
    page: 1,
    search_text: ""
  }
  paginationConfig = {
    count: 0,
    num_pages: 0
  }
  @ViewChild('searchInput') searchInput: ElementRef;
  selectedPageSize: any = 10;

  constructor(
    private service: RoleService,
    private modalService: BsModalService,
    private router: Router, 
  ) {

  }

  getRoles() {
    this.requestLoader = true;
    this.service.getRoles(this.pageConfig)
      .subscribe((res) => {
        //debugger
        this.requestLoader = false;
        if (res.status === "success") {
          this.globalRoleList = res.data.qs;
          this.globalRoleList.map(it => it.check = false);
          this.paginationConfig = res.data;
          // res.data.map(it => {
          //   if (it.role_type === 'G') {
          //     this.globalRoleList.push(it);
          //   } else if (it.role_type === "C") {
          //     this.customizeRoleList.push(it);
          //   }
          // })
        }


      }, (error) => {
        this.requestLoader = false;
        //debugger
      });
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
          this.getRoles()
        })
    )
    .subscribe();
  }

  changePageSize(){
    this.pageConfig.size = parseInt(this.selectedPageSize);
    this.pageConfig.page = 1;
    this.getRoles();
  }
  pageChanged(event: any): void {
    //debugger
    this.pageConfig.page = event.page;
    this.getRoles();
    
  }
  ngOnInit(): void {
    this.getRoles();
    // select2
    // this.exampleData = [
    //   {
    //     id: 'basic1',
    //     text: 'Basic 1'
    //   },
    //   {
    //     id: 'basic2',
    //     disabled: true,
    //     text: 'Basic 2'
    //   },
    //   {
    //     id: 'basic3',
    //     text: 'Basic 3'
    //   },
    //   {
    //     id: 'basic4',
    //     text: 'Basic 4'
    //   }
    // ];
    // end
  }

  deleteRole() {
    this.loader = true;
    this.responseText = "";
    this.service.deleteRole({ id: this.selectedRole.id })
      .subscribe((res) => {
        if(res.status === "success"){
          this.modalRef.hide();
          this.getRoles();
          this.responseText = "";
        }else{
          this.responseText = res.code;
          this.error = true;
        }
        this.loader = false;
        
      }, (error) => {
        this.error = true;
        this.loader = false;
        this.responseText = "Sorry something went wrong, Try again later";
        //debugger
      });
  }

  openModal(modal: TemplateRef<any>,obj:any) {
    this.selectedRole = obj;
    this.modalRef = this.modalService.show(modal, this.config);

  }

  navigateToUpdate(role){
    this.router.navigate(['/role/update'], { queryParams: { roleID: role.id, roleName: role.name } });
  }

  navigateToCopy(role){
    this.router.navigate(['/role/copy'], { queryParams: { roleID: role.id } });
  }
}
