import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'ncri-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: FormGroup;
  showError: string = "";
  loader: boolean = false;
  constructor(private formBuilder: FormBuilder,private auth: AuthService) { 
    this.forgot = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.email, Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  forgotPassword(form:any){
    this.showError = "";
    this.loader = true;
    this.auth.forgotPassword(form).subscribe((res:any)=>{
      //debugger
      if(res.status === "error"){
        this.showError = "error";
        this.loader = false;
      }else{
        this.showError = 'success';
        this.loader = false;
      }
    },(error)=>{
      this.showError = "error";
      this.loader = false;
    })
  }

}
