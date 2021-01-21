import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../user/services/user.service';
import { RoleService } from '../services';

@Component({
  selector: 'ncri-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  oneAtATime = true;
  requestLoader = false;
  role: FormGroup;
  isFirstOpen = true;
  privilegesList: any[] = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  modalRef: BsModalRef;
  departmentList: any = [];
  roleType = 'C';
  branchList: any = [];
  countryList: any = [];
  responseText: any = '';
  loader = false;
  roleID: any = '';
  selectAll = false;
  error = false;
  creationType: any = '';
  roleNameCheck = false;
  roleName = '';
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };

  constructor(
    private service: RoleService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    // fetching role id
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.creationType = params.type ? params.type : '';
      });

    this.role = this.fb.group({
      name: ['', Validators.required],
      role_type: [this.roleType, Validators.required],
      country_code: ['', Validators.required],
      branch_location_id: ['', Validators.required],
      department_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.getPrivileges();
    // this.getDepartments();
    // this.getBranchList();
    // this.getCountryList();
    this.SystemPrivilegesDropdownList();
  }
  isGeneralSelect(type, event): void {
    this.privilegesList.map(it => {
      it.maker.map(its => {
        its.resource_type === type ? event.srcElement.checked ? its.check = true : its.check = false : '';
      });
      it.checker.map(its => {
        its.resource_type === type ? event.srcElement.checked ? its.check = true : its.check = false : '';
      });
      it.general.map(its => {
        its.resource_type === type ? event.srcElement.checked ? its.check = true : its.check = false : '';
      });
    });

    console.log(this.privilegesList);
  }

  SystemPrivilegesDropdownList(): void {
    this.requestLoader = true;
    this.service.SystemPrivilegesDropdownList()
      .subscribe((res) => {
        this.requestLoader = false;
        if (res.status === 'success') {

          this.privilegesList = res.data;
          this.privilegesList.map(it => {
            it.maker.map(its => {
              its.check = false;
              its.category = 'M';

            });
            it.checker.map(its => {
              its.check = false;
              its.category = 'C';

            });
            it.general.map(its => {
              its.check = false;
              its.category = 'G';

            });
          });
        }
        // debugger
      }, (error) => {
        this.requestLoader = false;
        // debugger
      });
  }


  submitForm(form: any): void {
    // debugger
    this.responseText = [];
    const finalPrivilegeList = this.privilegesList.filter(it => it.check === true).map(it => it.resource_code);
    if (finalPrivilegeList.length === 0) {

      this.responseText = [{ name: 'Error', list: 'Please select at least one privilege.' }];
      this.error = true;
      this.loader = false;
      this.openModal();
      return;
    } else {
      // this.addRole(form, finalPrivilegeList);

    }
  }
  AddSystemPrivilegesPerUserRole(): void {
    this.loader = true;
    debugger
    this.responseText = [];
    let finalPrivilegeList = [];
    let makerList = [];
    let checkerList = [];
    let generalList = [];
    this.privilegesList.forEach(element => {
      const maker = element.maker.filter(it => it.check === true);
      maker.length > 0 ? makerList = [...makerList, ...maker] : '';
      const checker = element.checker.filter(it => it.check === true);
      checker.length > 0 ? checkerList = [...checkerList, ...checker] : '';
      const general = element.general.filter(it => it.check === true);
      general.length > 0 ? generalList = [...generalList, ...general] : '';
    });
    finalPrivilegeList = [...makerList, ...checkerList, ...generalList];
    finalPrivilegeList = finalPrivilegeList.map(it => {
      return {
        category: it.category,
        resource_code: it.resource_code,
      }
    });
    // const finalPrivilegeList = this.privilegesList.filter(it => it.check === true);
    if (finalPrivilegeList.length === 0) {

      this.responseText = [{ name: 'Error', list: 'Please select at least one privilege.' }];
      this.error = true;
      this.loader = false;
      this.openModal();
      return;
    }
    const obj = {
      name: this.roleName,
      privileges: finalPrivilegeList
    };
    this.service.AddSystemPrivilegesPerUserRole(obj).subscribe((res) => {
      this.loader = false;
      // debugger
      if (res.status === 'success') {
        // this.responseText = "Role Added Successfully.";
        // this.error = false;
        this.role.reset();
        this.privilegesList.map(it => it.check = false);
        this.router.navigate(['/role']);
      } else {
        this.error = true;
        this.responseText = [];
        if (res.errors) {
          for (const key in res.errors) {
            const obj = { name: key, list: res.errors[key].toString() };
            this.responseText.push(obj);
          }
        } else {
          this.responseText.push({ name: 'Error', list: res.code });
        }
        this.openModal();
      }
      this.loader = false;
    }, (error) => {
      // debugger
      this.error = true;
      this.loader = false;
      this.responseText.push({ name: 'Error', list: 'Sorry something went wrong, try again later.' });
      this.openModal();
    });
  }

  // addRole(form: any, list: any): void {
  //   this.loader = true;
  //   this.responseText = [];
  //   this.error = false;
  //   this.service.addRole(form).subscribe((res) => {
  //     // debugger
  //     if (res.status === 'success') {
  //       // debugger
  //       this.roleID = res.data.id;
  //       const obj = {
  //         user_role_id: this.roleID,
  //         resource_codes: list
  //       };
  //       this.addPrivileges(obj);
  //     } else {
  //       this.error = true;
  //       this.responseText = [];
  //       if (res.errors) {
  //         for (const key in res.errors) {
  //           const obj = { name: key, list: res.errors[key].toString() };
  //           this.responseText.push(obj);
  //         }
  //       } else {
  //         this.responseText.push({ name: 'Error', list: res.code });
  //       }
  //       this.loader = false;
  //       this.openModal();
  //     }

  //   }, (error) => {
  //     // debugger
  //     this.error = true;
  //     this.loader = false;
  //     this.responseText.push({ name: 'Error', list: 'Sorry something went wrong, try again later.' });
  //     this.openModal();
  //   });
  // }

  // 

  // changeType(): void {
  //   if (this.countryList.length === 0 || this.branchList.length === 0) {
  //     return;
  //   }
  //   if (this.roleType === 'G') {
  //     this.role.controls.country_code.setValue(this.countryList[0].code);
  //     this.role.controls.branch_location_id.setValue(this.branchList[0].id);
  //   } else {
  //     this.role.controls.country_code.setValue(this.countryList[0].code);
  //     this.role.controls.branch_location_id.setValue(this.branchList[0].id);
  //   }

  //   this.role.controls.role_type.setValue(this.roleType);
  // }

  // selectAllPrivileges(): void {
  //   this.selectAll === true ? this.privilegesList.map(it => it.check = true) : this.privilegesList.map(it => it.check = false);
  // }
  selectPrivilegeAll(type, i, event): void {
    debugger
    // this.privilegesList.forEach(element => {

    // });
    this.privilegesList[i][type].map(it => {
      event.srcElement.checked ? it.check = true : it.check = false;
    });
    console.log(this.privilegesList[i][type]);
  }

  selectPrivilege(item): void {
    console.log(item);
  }

  checkRoleName(): void {
    if (!this.roleName) {
      return;
    }
    this.loader = true;
    this.roleNameCheck = false;
    this.service.checkRoleName({ name: this.roleName }).subscribe((res) => {
      // debugger
      this.loader = false;
      if (res.status === 'success') {
        if (res.data.is_available === false) {
          this.roleNameCheck = true;
        } else {
          this.roleNameCheck = false;
        }
      }
    }, (error) => {
      this.loader = false;
      // debugger
    });
  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.errorModal, this.config);
  }

}
