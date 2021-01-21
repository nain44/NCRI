import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { GradeService } from '../service';

@Component({
  selector: 'ncri-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.scss']
})
export class EditGradeComponent implements OnInit, AfterViewInit {
  roleList = [];
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
  gradeID = '';
  sub: any;
  gradeDetail: any;
  @ViewChild('searchRoles') searchRoles: ElementRef;
  @ViewChild('searchUsers') searchUsers: ElementRef;
  searchRolesText = '';
  searchUsersText = '';
  constructor(
    private service: GradeService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.roleLoader = true;
    this.userLoader = true;
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    // fetching query param from route
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.gradeID = params.id ? params.id : '';
        this.gradeID === '' ? this.router.navigate(['/grade']) : '';
      });
  }

  ngOnInit(): void {
    this.fetchGradeDetail();
  }
  ngAfterViewInit(): void {
    
  }

  fetchGradeDetail(): void {
    const obj = {
      id: this.gradeID
    };
    this.service.fetchGrade(obj).subscribe((res: any) => {
      if (res.status === 'success') {
        this.gradeForm.controls.name.setValue(res.data.user_grade.name);
        this.gradeForm.controls.description.setValue(res.data.user_grade.description);
        this.gradeDetail = res.data;
        this.getRoleList();
        this.getUserList();
      }
    }, (error) => {

    });
  }

  openErrorModal(): void {
    this.modalRef = this.modalService.show(this.errorModal);
  }

  getRoleList(): void {
    this.service.getRoleList().subscribe((res) => {
      if (res.status === 'success') {
        this.roleList = res.data;
        this.roleList.map(it => {
          const check = this.gradeDetail.user_roles.some(r => r.user_role_id === it.id);
          check === true ? it.check = true : it.check = false;
        });
      }
      this.roleLoader = false;
    }, (error) => {
      this.roleLoader = false;
    });
  }

  getUserList(): void {
    this.service.getUserList().subscribe((res) => {
      if (res.status === 'success') {
        this.userList = res.data.qs;
        this.userList.map(it => {
          const check = this.gradeDetail.user_ids.some(u => u.id === it.id);
          check ? it.check = true : it.check = false;
        });
      }
      this.userLoader = false;
    }, (error) => {
      this.userLoader = false;
    });
  }

  updateGrade(obj: any): void {
    this.loader = true;
    this.service.updateGrade(obj).subscribe((res: any) => {
      if (res.status === 'success') {
        this.router.navigate(['/grade']);
      } else {
        this.loader = false;
        if (res.errors) {
          const list = [];
          for (let key in res.errors) {
            const error = { name: key, list: res.errors[key].toString() };
            list.push(error);
          }
          this.responseText = list;
        } else {
          this.responseText = [{ name: 'Error', list: res.code }];
        }
        this.openErrorModal();
      }

    }, (error) => {
      this.loader = false;
      this.openErrorModal();
      this.responseText = [{ name: 'Error', list: error.message }];
    });
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
      id: this.gradeID,
      name: this.gradeForm.get('name').value,
      description: this.gradeForm.get('description').value,
      user_role_ids: this.roleList.filter(it => it.check === true).map(it => it.id),
      user_ids: this.userList.filter(it => it.check === true).map(it => it.id)
    };
    this.updateGrade(obj);
  }

  isGradeAvailable(): void {
    this.gradeAvailable = '';
    this.service.isGradeAvailable({ name: this.gradeForm.controls.name.value }).subscribe((res) => {
      if (res.status === 'success') {
        if (res.data.is_available === false) {
          this.gradeAvailable = 'Grade name already taken.';
        }
      }
    }, (error) => {
      this.gradeAvailable = '';
    });
  }


}
