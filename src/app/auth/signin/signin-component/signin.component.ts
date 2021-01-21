import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../core';


@Component({
  selector: 'ncri-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  @ViewChild('password') passField: ElementRef;
  changeIcon: boolean = false;
  loginLoading: boolean = false;

  showQRForm: boolean = false;
  showQRImage: boolean = false;
  QRCode: string = "";
  QRImage: any = "";

  responseText: string = "";

  signIn: FormGroup;
  error: boolean = false;
  errorMessage: string = '';
  showError: boolean;
  signInLoader:boolean=false;
  ticket: any = "";
  showMaxAttempt: any;
  maxCount: any;

  constructor(
    private router: Router,
    private zone: NgZone,
    public global: GlobalService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.signIn = this.formBuilder.group({
      'user_id': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  } 
  
  obtainTicket(form:any){
    
    this.responseText = "";
    this.signInLoader=true;
    this.showMaxAttempt = false;
    this.showError = false;
    form.hostname = location.origin;
    this.auth.getTicket(form)
    .subscribe((response:any)=> {
      if(response.status === "error"){
        this.showError = true;
        this.signInLoader=false;
        if(response.message){
          response?.message?.failed_login_attempts_count ? this.showMaxAttempt = true : this.showMaxAttempt = false;
          this.maxCount = response?.message?.failed_login_attempts_count;
        }
        this.responseText = response.code;
      }else{
        // response.data.ticket_type = 'm';
        //response.data.is_mfa_setup = false;
        this.ticket = response.data.ticket;
        if(response.data.ticket_type.toLowerCase() === 'j'){
          this.showQRForm = false;
          this.showQRImage = false;
          this.obtainJWT({ticket: response.data.ticket});
        }else if(response.data.ticket_type.toLowerCase() === 'm' && response.data.is_mfa_setup === false){
          this.obtainQRCode({ticket:response.data.ticket});
        }else if(response.data.ticket_type.toLowerCase() === 'm' && response.data.is_mfa_setup === true){
          this.showQRForm = true;
          this.showQRImage = false;
          this.signInLoader=false;
        }
      }
      
    },(error)=>{
      console.log(error);
       this.showError = true;
      this.signInLoader=false;
      this.responseText = "Sorry something went wrong, Try again later";
    })
  }

  obtainJWT(obj:any){
    this.showError = false;
    this.responseText = "";
    this.auth.getJWTToken(obj)
    .subscribe((response:any)=> {
      if(response.status === "success"){
        this.signInLoader=false;
        this.showError = false;
        localStorage.setItem('details', JSON.stringify(response.data));
        if(response.data.user.default_password_changed === false){
          this.signInLoader=false;
          this.router.navigate(['/user/change-password']);
        }else{
          this.signInLoader=false;
          this.router.navigate(['/client-dashboard']);
          // this.router.navigate(['/user']);
        }
        
      }else{
        this.signInLoader=false;
        this.showError = true;
        this.responseText = response.code;
      }

    },(error)=>{
      console.log(error);
      this.showError = true;
      this.signInLoader=false;
      this.responseText = "Sorry something went wrong, Try again later";
      // this.showError = true;
    })
  }

  obtainQRCode(obj:any){
    this.showError = false;
    this.responseText = "";
    this.auth.getQRCode(obj).subscribe((res:any) => {
      if(res.status === "error"){
        this.showError = true;
        this.showQRForm = false;
        this.showQRImage = false;
        this.responseText = res.code;
      }else{
        this.showQRForm = true;
        this.showQRImage = true;
        this.showError = false;
        let img = res.data.qr_code_url.replace("https://www.google.com/","https://chart.googleapis.com/")
        this.QRImage = this.sanitizer.bypassSecurityTrustResourceUrl(img);
        
        // document.getElementById('qrimage')
      }
      
      this.signInLoader=false;
    },(error) =>{
      
      this.showError = true;
      this.showQRForm = false;
      this.signInLoader=false;
      this.responseText = "Sorry something went wrong, Try again later";
      this.showQRImage = false;
    })
  }

  getTokenWithQR(){
    let obj = {
      ticket: this.ticket,
      code: this.QRCode
    };
    this.responseText = "";
    this.showError = false;
    this.signInLoader = true;
    this.auth.getJWTWithQRCode(obj).subscribe((res:any) => {
      if(res.status === "error"){
        this.showError = true;
        this.responseText = res.code;
      }else{
        this.showError = false;
        localStorage.setItem('details', JSON.stringify(res.data));
        this.router.navigate(['/client-dashboard']);
        // this.router.navigate(['/user']);
      }

      this.signInLoader = false;
    },(error) => {
      this.signInLoader = false;
      this.showError = true;
      this.responseText = "Sorry something went wrong, Try again later";
    })
  }

  changeType(){
    if(this.passField.nativeElement.type === "password"){
      this.passField.nativeElement.type = "text";
      this.changeIcon = true;
    }else{
      this.passField.nativeElement.type = "password"
      this.changeIcon = false;
    }
  }

}
