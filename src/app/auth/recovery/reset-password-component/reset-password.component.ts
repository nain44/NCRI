import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'ncri-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  buid: any = "";
  token: any = "";

  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;

  reset: FormGroup;
  icon: boolean = false;
  matchPasswordCheck: boolean = false;
  loader: boolean = false;
  regexchecks = {
    capital: false,
    small: false,
    special: false,
    no: false,
    length: false
  }
  error: string = "";

  constructor(
    private route: ActivatedRoute,
     private router: Router,
      private formBuilder: FormBuilder,
      private service: AuthService
      ) {
    this.route.params.subscribe(params => {
      this.buid = params['uid'];
      this.token = params['token'];

      // if (this.buid === undefined || this.token === undefined) {
      //   this.router.navigate(['/signin']);
      // }
    });

    this.reset = this.formBuilder.group({
      'new_password': ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/), Validators.required])],
      'confirm_password': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  switchPassword() {
    if (this.password.nativeElement.type === "password") {
      this.password.nativeElement.type = "text";
      this.confirmPassword.nativeElement.type = "text";
      this.icon = true;
    } else {
      this.password.nativeElement.type = "password";
      this.confirmPassword.nativeElement.type = "password";
      this.icon = false;
    }
  }

  matchPassword() {
    if (this.reset.controls.new_password.value !== this.reset.controls.confirm_password.value) {
      this.matchPasswordCheck = true;
    } else {
      this.matchPasswordCheck = false;
    }
  }

  matchRegex() {
    this.reset.controls.new_password.value.match(/[A-Z]/) ? this.regexchecks.capital = true : this.regexchecks.capital = false;
    this.reset.controls.new_password.value.match(/[a-z]/) ? this.regexchecks.small = true : this.regexchecks.small = false;
    this.reset.controls.new_password.value.match(/[^\w\*]/) ? this.regexchecks.special = true : this.regexchecks.special = false;
    this.reset.controls.new_password.value.match(/[0-9]/) ? this.regexchecks.no = true : this.regexchecks.no = false;
    this.reset.controls.new_password.value.length >= 8 ? this.regexchecks.length = true : this.regexchecks.length = false;

    this.reset.controls.confirm_password.value !== "" ? this.matchPassword() : "";
  }

  resetPassword(form:any){
    this.loader = true;
    this.error = "";
    form.uid = this.buid;
    form.token = this.token;
    this.service.forgotPasswordAction(form).subscribe((res: any) => {
      
      if(res.status === 'success'){
        this.error = 'success';
        this.loader = false;
      }else{
        this.error = 'error';
        this.loader = false;
      }
    }, (error)=>{
      
      this.error = 'error';
      this.loader = false;
    })
  }

}
