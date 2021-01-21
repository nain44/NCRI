import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountSettingService } from './../../account-settings/services/account-setting.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  // old
  passwordUpdate: FormGroup;
  // createUserLoader: boolean = false;
  // matchPasswordCheck: boolean = false;
  loader = false;
  // old
  // new
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  modalRef: BsModalRef;
  regexchecks = {
    capital: false,
    small: false,
    special: false,
    no: false,
    length: false
  };
  changePassword: FormGroup;
  createUserLoader = false;
  matchPasswordCheck = false;
  loader2 = false;
  errors: any[] = [];
  // new

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private accountServive: AccountSettingService,
    private modalService: BsModalService
  ) {
    this.changePassword = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(1)]],
      new_password: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/),
      Validators.required])],
      confirm_password: ['', [Validators.required]],
      mfa_enabled: [false]
    });
  }
  ngOnInit(): void { }
  // convenience getter for easy access to form fields

  // new
  get f() {
    console.log('f called==', this.changePassword);
    return this.changePassword;
  }
  changePasswordFun(obj: any): void {
    this.loader2 = true;
    this.accountServive.changePassword(obj).subscribe((res) => {
      if (res.status === 'success') {
        this.loader2 = false;
        this.router.navigate(['/user']);
      } else if (res.status === 'error') {
        if (res.errors) {
          const arr = [];
          for (var key in res.errors) {
            arr.push(key + ': ' + res.errors[key]);
          }
          this.errors = arr;
        } else {
          this.errors = [res.message];
        }
        this.openErrorModal();
        this.loader2 = false;
        //  alert("Something went wrong try again");
      }

    }, (error) => {
      this.loader2 = false;
    });
  }
  matchPassword(): void {
    if (this.changePassword.controls.new_password.value !== this.changePassword.controls.confirm_password.value) {
      this.matchPasswordCheck = true;
    } else {
      this.matchPasswordCheck = false;
    }
  }

  checkPassword(): void {
    if (this.changePassword.controls.confirm_password.value) {
      this.matchPassword();
    }
  }

  matchRegex(): void {
    this.changePassword.controls.new_password.value.match(/[A-Z]/) ? this.regexchecks.capital = true : this.regexchecks.capital = false;
    this.changePassword.controls.new_password.value.match(/[a-z]/) ? this.regexchecks.small = true : this.regexchecks.small = false;
    this.changePassword.controls.new_password.value.match(/[^\w\*]/) ? this.regexchecks.special = true : this.regexchecks.special = false;
    this.changePassword.controls.new_password.value.match(/[0-9]/) ? this.regexchecks.no = true : this.regexchecks.no = false;
    this.changePassword.controls.new_password.value.length >= 8 ? this.regexchecks.length = true : this.regexchecks.length = false;

    this.changePassword.controls.confirm_password.value !== '' ? this.matchPassword() : '';
  }

  openErrorModal(): void {
    this.modalRef = this.modalService.show(this.errorModal);
  }
  // new
  // old

  updatePassword(ob: any): void {
    this.loader = true;
    this.service.updatePassword(ob).subscribe((res) => {
      if (res.status === 'success') {
        this.loader = false;
        this.router.navigate(['/user']);
        this.router.navigate(['/user']);
      } else {
        this.loader = false;
        alert('Something went wrong try again');
      }
    }, (error) => {
      this.loader = false;
    });
  }

}
