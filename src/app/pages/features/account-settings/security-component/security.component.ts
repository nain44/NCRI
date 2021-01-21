import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountSettingService } from '../services/account-setting.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
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
  }
  changePassword: FormGroup;
  createUserLoader:boolean=false;
  matchPasswordCheck: boolean = false;
  loader2: boolean = false;
  errors: any[] = [];
  constructor(private fb: FormBuilder, private accountServive: AccountSettingService,private router: Router,private modalService: BsModalService) {
    this.changePassword = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(1)]],
      new_password: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/), Validators.required])],
      confirm_password: ['', [Validators.required]],
      mfa_enabled: [false]
    });
  }
  ngOnInit(): void { }
// convenience getter for easy access to form fields
  get f() {
    console.log('f called==',this.changePassword)
      return this.changePassword;
     }
     updatePassword(obj:any){
       this.loader2 = true;
       this.accountServive.changePassword(obj).subscribe((res) => {
        if(res.status === "success"){
          this.loader2=false;
          this.router.navigate(['/user']);
        }else if(res.status === "error"){
        if(res.errors){
          let arr = [];
          for(var key in res.errors){
            arr.push(key+": " + res.errors[key]);
          }
          this.errors = arr;
        }else{
          this.errors = [res.message]
        }
        this.openErrorModal();
         this.loader2=false;
        //  alert("Something went wrong try again");
       }
      
      },(error)=>{
        this.loader2=false;
      })
     }
     matchPassword() {
      if (this.changePassword.controls.new_password.value !== this.changePassword.controls.confirm_password.value) {
        this.matchPasswordCheck = true;
      } else {
        this.matchPasswordCheck = false;
      }
    }

    checkPassword(){
      if(this.changePassword.controls.confirm_password.value){
        this.matchPassword();
      }
    }

    matchRegex() {
      this.changePassword.controls.new_password.value.match(/[A-Z]/) ? this.regexchecks.capital = true : this.regexchecks.capital = false;
      this.changePassword.controls.new_password.value.match(/[a-z]/) ? this.regexchecks.small = true : this.regexchecks.small = false;
      this.changePassword.controls.new_password.value.match(/[^\w\*]/) ? this.regexchecks.special = true : this.regexchecks.special = false;
      this.changePassword.controls.new_password.value.match(/[0-9]/) ? this.regexchecks.no = true : this.regexchecks.no = false;
      this.changePassword.controls.new_password.value.length >= 8 ? this.regexchecks.length = true : this.regexchecks.length = false;
  
      this.changePassword.controls.confirm_password.value !== "" ? this.matchPassword() : "";
    }

    openErrorModal(){
      this.modalRef = this.modalService.show(this.errorModal);
    }
}
