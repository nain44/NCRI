import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../user/services/user.service';
import { RoleService } from '../services';

@Component({
  selector: 'ncri-copy-role',
  templateUrl: './copy-role.component.html',
  styleUrls: ['./copy-role.component.scss']
})
export class CopyRoleComponent implements OnInit {

  oneAtATime: boolean = true;
  requestLoader: boolean = false;
  role: FormGroup;
  isFirstOpen = true;
  privilegesList: any[] = [];
  departmentList: any = [];
  roleType: string = "G";
  branchList: any = [];
  countryList: any = [];
  modalRef: BsModalRef;
  responseText: any = "";
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  loader: boolean = false;
  roleID: any = "";
  selectAll: boolean = false;
  error: boolean = false;
  editRoleID: any = "";
  editRoleName: any = "";
  roleNameCheck: boolean = false;
  selectedRole: any;
  isCopy: any = false;

  constructor(
    private service: RoleService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
    
  ) {
    //fetching role id
    this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.editRoleID = params.roleID ? params.roleID : "";
      this.editRoleID === "" ? this.router.navigate(['/role']) : "";
    });

    this.role = this.fb.group({
      name: ['', Validators.required],
      role_type: ["", Validators.required],
      country_code: ['', Validators.required],
      branch_location_id: ['', Validators.required],
      department_id: ['', Validators.required],
    });
  }

  openModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  checkNameForCopy(name:string){
    let check = name.match(/\d/g);
    let num = "";
    check !== null ? num = check[0] : "";
    if(num === "" || !name.match("("+num+")")){
      name += " (1)";
    }else if(name.match("("+num+")")){
      name = name.replace("("+num+")","("+(parseInt(num)+1)+")")
    }

    this.role.controls.name.setValue(name);
    this.checkRoleName();
  }

  ngOnInit(): void {
    this.getRoleDetailByID();
    this.getPrivileges();
    this.getDepartments();
    this.getBranchList();
    this.getCountryList();
    
  }

  getPrivileges() {
    this.requestLoader = true;
    this.service.getPrivileges()
      .subscribe((res) => {
        this.requestLoader = false;
        if (res.status === "success") {
          this.privilegesList = res.data;
          this.privilegesList.map(it => {
            it.check = false;
          });

          this.fetchSystemPrivileges();
        }
        //debugger
      }, (error) => {
        //debugger
        this.requestLoader = false;
      });

  }

  getDepartments() {
    this.userService.departmentDropdownList()
      .subscribe((res) => {
        //debugger
        if (res.status === "success") {
          this.departmentList = res.data;
          // this.role.controls.department_id.setValue(this.departmentList[0].id);
        }

      }, (error) => {

      });
  }

  getBranchList() {
    this.userService.branchLocationDropdownList()
      .subscribe((res) => {
        //debugger
        if (res.status === "success") {
          this.branchList = res.data;
          // this.role.controls.branch_location_id.setValue(this.branchList[0].id);
        }

      }, (error) => {

      });
  }

  getCountryList() {
    this.userService.countryCodeDropdownList()
      .subscribe((res) => {
        //debugger
        if (res.status === "success") {
          this.countryList = res.data;
          // this.role.controls.country_code.setValue(this.countryList[0].code);
        }

      }, (error) => {

      });
  }

  submitForm(form: any) {
    //debugger
    this.responseText = [];
    let finalPrivilegeList = this.privilegesList.filter(it => it.check === true).map(it => it.resource_code);
    if (finalPrivilegeList.length === 0) {
      this.responseText = [{name:"Error", list:"Please select at least one privilege."}];
      this.error = true;
      this.openModal();
      return
    } else {
      this.addUserRole(form, finalPrivilegeList);
      
    }
  }

  addUserRole(form: any, list: any) {
    this.loader = true;
    this.responseText = [];
    this.error = false;
    // form.id = this.editRoleID;
    this.service.addRole(form).subscribe((res) => {
      //debugger
      if (res.status === "success") {
        //debugger
        this.roleID = res.data.id;
        let obj = {
          user_role_id: this.roleID,
          resource_codes: list
        }
        // this.addPrivileges(obj);
      } else {
        this.error = true;
        this.responseText = [];
        if (res.errors) {
          for (var key in res.errors) {
            let obj = { name: key, list: res.errors[key].toString() };
            this.responseText.push(obj);
          }
        } else {
          this.responseText.push({ name: "Error", list: res.code });
        }
        
        this.openModal();
      }

      this.loader = false;

    }, (error) => {
      //debugger
      this.error = true;
      this.loader = false;
      this.responseText.push({ name: "Error", list: "Sorry something went wrong, try again later." });
      this.openModal();
    })
  }

  // addPrivileges(obj: any) {
  //   this.service.addPrivileges(obj).subscribe((res) => {
  //     //debugger
  //     if (res.status === "success") {
  //       // this.responseText = "Role Added Successfully.";
  //       // this.error = false;
  //       this.role.reset();
  //       this.privilegesList.map(it => it.check = false);
  //       this.router.navigate(['/role/user'], { queryParams: { roleID: this.roleID } });
  //     } else {
  //       this.error = true;
  //       this.responseText = [];
  //       if (res.errors) {
  //         for (var key in res.errors) {
  //           let obj = { name: key, list: res.errors[key].toString() };
  //           this.responseText.push(obj);
  //         }
  //       } else {
  //         this.responseText.push({ name: "Error", list: res.code });
  //       }
  //       this.openModal();
  //     }
  //     this.loader = false;
  //   }, (error) => {
  //     //debugger
  //     this.error = true;
  //     this.loader = false;
  //     this.responseText.push({ name: "Error", list: "Sorry something went wrong, try again later." });
  //     this.openModal();
  //   })
  // }

  changeType() {
    if (this.roleType === "G") {
      this.role.controls.country_code.setValue(this.countryList[0]?.code);
      this.role.controls.branch_location_id.setValue(this.branchList[0]?.id);
    } else {
      this.role.controls.country_code.setValue(this.countryList[0]?.code);
      this.role.controls.branch_location_id.setValue(this.branchList[0]?.id);
    }

    this.role.controls.role_type.setValue(this.roleType);
  }

  selectAllPrivileges() {
    this.selectAll === true ? this.privilegesList.map(it => it.check = true) : this.privilegesList.map(it => it.check = false);
  }

  selectPrivilege() {
    let check = this.privilegesList.some(it => it.check === false);
    check === true ? this.selectAll = false : this.selectAll = true;
  }

  // updateUserRole(form:any){
  //   this.loader = true;
  //   this.responseText = "";
  //   this.service.updateRole(form).subscribe((res) => {
  //     //debugger
  //     if(res.status === "success"){
  //       this.error = false;
  //       this.router.navigate(['/role']);
  //     }else{
  //       this.error = true;
  //       this.responseText = res.code;
  //     }
  //     this.loader = false;
  //   },(error) =>{
  //     //debugger
  //     this.error = true;
  //     this.loader = false;
  //     this.responseText = "Sorry something went wrong, try again later.";
  //   })
  // }

  fetchSystemPrivileges(){
    this.service.fetchSystemPrivilegesByID({id: this.editRoleID}).subscribe((res) => {
      //debugger
      if(res.status === "success"){
        this.privilegesList.map(it => {
          let index = res.data.findIndex(i => i.resource_code === it.resource_code);
          index !== -1 ? this.privilegesList[index].check = true : "";
          this.selectPrivilege();
        })
      }
    },(error) => {
      //debugger
    })
  }

  checkRoleName(){
    if(!this.role.controls.name.value){
      return
    }if(this.role.controls.name.value === this.editRoleName){
      return
    }
    // this.roleNameCheck = false;
    this.service.checkRoleName({name:this.role.controls.name.value}).subscribe((res) =>{
      //debugger
      if(res.status === "success"){
        if(res.data.is_available === false){
          this.checkNameForCopy(this.role.controls.name.value);
          // this.roleNameCheck = true;
        }else{
          // this.roleNameCheck = false;
        }
      }
    }, (error) =>{
      //debugger
    })
  }

  getRoleDetailByID(){
    this.service.getRoleByID({id:this.editRoleID}).subscribe((res) => {
      //debugger
      if(res.status === "success"){
        this.selectedRole = res.data;
        this.role.controls.name.setValue(this.selectedRole.name);
        this.role.controls.country_code.setValue(this.selectedRole.country_code);
        this.role.controls.branch_location_id.setValue(this.selectedRole.branch_location);
        this.role.controls.department_id.setValue(this.selectedRole.department);
        this.role.controls.role_type.setValue(this.selectedRole.role_type);
        this.roleType = this.selectedRole.role_type;
        this.checkNameForCopy(this.selectedRole.name);
      }
    },(error) => {
      //debugger
    })
  }
}
