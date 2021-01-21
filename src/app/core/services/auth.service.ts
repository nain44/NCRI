import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getTicket(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainTicket/';
    return this.http.post(url, obj);
  }

  getJWTToken(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainJWT/';
    return this.http.post(url, obj);
  }

  forgotPassword(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ForgotPassword/';
    return this.http.post(url, obj);
  }

  forgotUsername(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ForgotUsername/';
    return this.http.post(url, obj);
  }

  forgotPasswordAction(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ForgotPasswordAction/';
    return this.http.post(url, obj);
  }

  getQRCode(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainQRCode/';
    return this.http.post(url, obj);
  }

  getJWTWithQRCode(obj:any){
    let url = APP_CONFIG.apiBaseUrl + '/api/v1/sso/ObtainJWTWithQRCode/';
    return this.http.post(url, obj);
  }
}
