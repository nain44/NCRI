import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { GradeService } from '../../grade/service';

@Component({
  selector: 'ncri-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
roleList: any = [];
  userList: any = [];
  userLoader = false;
  roleLoader = false;
  gradeForm: FormGroup;
  responseText: any = [];
  modalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  loader = false;
  newGradeID: any;
  gradeAvailable = '';
  searchRolesText = '';
  searchUsersText = '';
  constructor(
    // private service: GradeService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRoleList();
    this.getUserList();
  }

  openErrorModal(): void {
    this.modalRef = this.modalService.show(this.errorModal);
  }

  getRoleList(): void {
    this.roleLoader = true;
    // this.service.getRoleList().subscribe((res) => {
    //   if (res.status === 'success') {
    //     this.roleList = res.data;
    //     this.roleList.map(it => it.check = false);
    //   }
    //   this.roleLoader = false;
    // }, (error) => {
    //   this.roleLoader = false;
    // });
  }

  getUserList(): void {
    this.userLoader = true;
    // this.service.getUserList().subscribe((res) => {
    //   if (res.status === 'success') {
    //     this.userList = res.data.qs;
    //     this.userList.map(it => it.check = false);
    //   }
    //   this.userLoader = false;
    // }, (error) => {
    //   this.userLoader = false;
    // });
  }

  assignGradeToUser(obj: any): void {
    // this.service.assignGradeToUser(obj).subscribe((res) => {
    //   if (res.status === 'success') {
    //     let obj = {
    //       user_grade_id: this.newGradeID,
    //       user_role_ids: this.roleList.filter(it => it.check === true).map(it => it.id)
    //     };
    //     this.assignGradeToRole(obj);
    //   } else {
    //     this.loader = false;
    //     if (res.errors) {
    //       const list = [];
    //       for (var key in res.errors) {
    //         let error = { name: key, list: res.errors[key].toString() };
    //         list.push(error);
    //       }
    //       this.responseText = list;
    //     } else {
    //       this.responseText = [{ name: 'Error', list: res.code }];
    //     }
    //     this.openErrorModal();
    //   }

    // }, (error) => {
    //   this.loader = false;
    //   this.openErrorModal();
    //   this.responseText = [{ name: 'Error', list: error.message }];
    // });
  }

  assignGradeToRole(obj: any): void {
    // this.service.assignGradeToRole(obj).subscribe((res) => {
    //   if (res.status === 'success') {
    //     this.loader = false;
    //     this.router.navigate(['/grade']);
    //   } else {
    //     this.loader = false;
    //     if (res.errors) {
    //       const list = [];
    //       for (var key in res.errors) {
    //         let error = { name: key, list: res.errors[key].toString() };
    //         list.push(error);
    //       }
    //       this.responseText = list;
    //     } else {
    //       this.responseText = [{ name: 'Error', list: res.code }];
    //     }
    //     this.openErrorModal();
    //   }
    // }, (error) => {
    //   this.loader = false;
    //   this.openErrorModal();
    //   this.responseText = [{ name: 'Error', list: error.message }];
    // });
  }
  redirectToList(): void {
    this.router.navigate(['/grade']);
  }

  addGrade(obj: any): void {
    this.loader = true;
    // this.service.addGrade(obj).subscribe((res) => {
    //   if (res.status === 'success') {
    //     this.newGradeID = res.data.id;
    //     const obj = {
    //       user_grade_id: this.newGradeID,
    //       user_ids: this.userList.filter(it => it.check === true).map(it => it.id)
    //     };
    //     this.redirectToList();
    //   } else {
    //     this.loader = false;
    //     if (res.errors) {
    //       let list = [];
    //       for (var key in res.errors) {
    //         let error = { name: key, list: res.errors[key].toString() };
    //         list.push(error);
    //       }
    //       this.responseText = list;
    //     } else {
    //       this.responseText = [{ name: 'Error', list: res.code }];
    //     }
    //     this.openErrorModal();
    //   }

    // }, (error) => {
    //   this.loader = false;
    //   this.openErrorModal();
    //   this.responseText = [{ name: 'Error', list: error.message }];
    // });
  }

  submitForm(): void {
    const roleCheck = this.roleList.some(it => it.check === true);
    const userCheck = this.userList.some(it => it.check === true);
    if (roleCheck === false) {
      this.responseText = [{ name: 'Error: ', list: 'Please select at least one role to create grade.' }];
      this.openErrorModal();
      return;
    } else if (userCheck === false) {
      this.responseText = [{ name: 'Error: ', list: 'Please select at least one user to create grade.' }];
      this.openErrorModal();
      return;
    }
    const obj = {
      name: this.gradeForm.get('name').value,
      description: this.gradeForm.get('description').value,
      user_role_ids: this.roleList.filter(it => it.check === true).map(it => it.id),
      user_ids: this.userList.filter(it => it.check === true).map(it => it.id)
    };

    this.addGrade(obj);
  }

  isGradeAvailable(): void {
    this.gradeAvailable = '';
    // this.service.isGradeAvailable({ name: this.gradeForm.controls.name.value }).subscribe((res) => {
    //   if (res.status === 'success') {
    //     if (res.data.is_available === false) {
    //       this.gradeAvailable = 'Grade name already taken.';
    //     }
    //   }
    // }, (error) => {
    //   this.gradeAvailable = '';
    // });
  }

}

