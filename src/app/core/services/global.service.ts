import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { APP_CONFIG } from '../configs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  userName: string = '';
  private tokenValue: string = '';
  private profileImageURL: string = '';
  private logoUrl: string = 'https://ncri-media.s3.amazonaws.com/logo.jpg?time=' + new Date().getTime() 

  //clock
  private clock: Observable<Date>;
  customFieldAddTeaser = false;
  customFieldTeaserText = '';
  constructor(private router: Router,private httpClient: HttpClient) {
    //setting clock observable
    // this.clock = interval(1000).pipe(
    //   map(tick => new Date()),
    //   share()
    // );
  }
  setExtension(fileName): string {
    return fileName.substring((fileName.indexOf('.')) + 1, fileName.length);
  }
  validateUploadFileExtension(fileName, fileType?): boolean {
    const extension = fileName.substring((fileName.indexOf('.')) + 1, fileName.length);
    if (fileType) {
      if (extension === fileType) {
        return false;
      } else {
        return true;
      }
    }
    if (extension === 'pdf' || extension === 'csv' || extension === 'xlsx') {
      return false;
    } else {
      return true;
    }
  }
  setCustomFieldAddTeaser(type) {
    this.customFieldTeaserText = type;
    this.customFieldAddTeaser = true;
    setTimeout(() => {
      this.customFieldAddTeaser = false;
    }, 6000);
  }

  //token getter
  get token() {
    let token = localStorage.getItem("details");
    if (token !== null && JSON.parse(token).token) {
      this.tokenValue  = JSON.parse(token).token;
    }else{
      this.tokenValue  = '';
    }
    return this.tokenValue;
  }
  //profile image getter
  get profileImage() {
    let user = localStorage.getItem("details");
    if (user !== null && JSON.parse(user).user) {
      this.profileImageURL  = JSON.parse(user).user.avatar_url;
    }else{
      this.profileImageURL  = '';
    }
    return this.profileImageURL;
  }
  //user name  getter
  get userFullName() {
    let user = localStorage.getItem("details");
    if (user !== null && JSON.parse(user).user) {
      this.userName  = JSON.parse(user).user.first_name + ' ' + JSON.parse(user).user.last_name;
    }else{
      this.userName  = '';
    }
    return this.userName;
  }

  //returning clock
  getClock(): Observable<Date> {
    return this.clock;
  }
  // get logo
  get logo() {
    return this.logoUrl;
  }
  logOut() {
    // remove user from local storage and route to signin page
    localStorage.removeItem('details');
    this.router.navigate(['/signin']);
}

  get email() {
    let data = localStorage.getItem('details');
    if (data === null) {
      return ""
    } else {
      data = JSON.parse(data);
      return data['user'].email;
    }
  }

   dateFormat(date:Date){
    let newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return newDate
  }

}