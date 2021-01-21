import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core';
import { AccountSettingService } from '../services/account-setting.service';

@Component({
  selector: 'ncri-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  changeEmail: FormGroup;
  loader: boolean = false;
  currentEmail: string = "";
  error: boolean = false;
  errorText: string = "";
  constructor(
    private fb: FormBuilder,
    private global: GlobalService,
    private service: AccountSettingService
    ) {
    this.changeEmail = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
   }
  

  ngOnInit(): void {
    this.getCurrentEmail();
  }

  getCurrentEmail(){
    this.currentEmail = this.global.email;
  }

  updateEmail(form:any){
    this.loader = true;
    this.errorText = "";
    this.service.changeEmail(form).subscribe((res) => {
      if(res.status === "error"){
        this.error = true;
        this.errorText = "Sorry, we Couldn't change your email, Try again later";
      }else{
        this.error = false;
        this.errorText = "Email has successfully changed."
      }
      this.loader = false;
    }, (error) => {
      this.error = true;
      this.errorText = "Sorry something went wrong";
    })
  } 

}
