import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { IMultiSelectTexts  } from 'ngx-bootstrap-multiselect';
import { IMultiSelectSettings  } from 'ngx-bootstrap-multiselect';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoleService } from '../services';

@Component({
  selector: 'ncri-system-roles',
  templateUrl: './system-roles.component.html',
  styleUrls: ['./system-roles.component.scss']
})
export class SystemRolesComponent implements OnInit {
  optionsModel: number[];
  responseText: any = [];
  modalRef: BsModalRef;
  requestLoader: boolean = false;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  myOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Car brands'},
    { id: 2, name: 'Volvo'},
    { id: 3, name: 'Honda' },
    { id: 4, name: 'BMW' },
    
];
  mySettings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    dynamicTitleMaxItems: 2,
    displayAllSelectedText: false
};
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
employeeTypeList: any = [];
  rolesList: any = [];
  selectedOBJ: any;
  blockUI: boolean = false;
  departmentList: any = [];
  constructor(
    private service: RoleService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {

    this.getEmployeeType();
    
    

  //   this.myOptions = [
  //     { id: 1, name: 'Option 1' },
  //     { id: 2, name: 'Option 2' },
  //     { id: 3, name: 'Option 3' },
  // ];
  }

  getEmployeeType(){
    this.requestLoader = true;
    this.service.getEmployeeTypeList().subscribe((res) => {
        if(res.status === "success"){
          this.employeeTypeList = res.data;
          this.employeeTypeList.map(it => {
            it.selectedRoles = [];
            it.selectedDepartment = "";
            it.loader = false;
          })
        }
        this.getUserRoles();
        this.getDepartments();
    },(error) =>{
      this.requestLoader = false;
    });
  }

  getUserRoles(){
    this.service.getRolesList().subscribe((res) => {
      this.requestLoader = false;
        if(res.status === "success"){
          this.rolesList = res.data;
        }
    },(error) =>{
      this.requestLoader = false;
    });
  }

  addRole(obj:any){
    if(obj.selectedRoles.length === 0){
      return;
    }else if(obj.selectedDepartment === ""){
      return;
    }
    this.selectedOBJ = obj;
    this.selectedOBJ.loader = true;
    this.blockUI = true;
    let model = {
      employee_type_id: obj.id,
      department_id: obj.selectedDepartment,
      user_role_ids: obj.selectedRoles
    };
    this.addSystemRole(model);
  }

  addSystemRole(obj:any){
    this.responseText = [];
    this.service.addUserRolePerEmployeeType(obj).subscribe((res) => {
      
      if(res.status === "error"){
        let list = [];
        if(res.errors){
          for(var key in res.errors){
            list.push({name:key, list:res.errors[key].toString()});
          }
        }else{
          list.push({name:"Error", list: res.code});
        }

        this.responseText = list;
        this.openErrorModal();  
      }else{
        this.responseText = [{name:"Success", list: "Role Assigned Successfully."}];
      }
      
      this.blockUI = false;
      this.selectedOBJ.loader = false;
    },(error) =>{
      
      this.blockUI = false;
      this.responseText = [{name:"Error", list: error.message}];
      this.selectedOBJ.loader = false;
      this.openErrorModal();
    })
  }

  openErrorModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  getDepartments(){
    this.service.getDepartmentList().subscribe((res) => {
      if(res.status === "success"){
        this.departmentList = res.data;
      }
    },(error) =>{

    })
  }

}
