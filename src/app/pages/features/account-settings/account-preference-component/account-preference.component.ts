import { GlobalService } from 'src/app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountSettingService } from '../services/account-setting.service';

@Component({
  selector: 'ncri-account-preference',
  templateUrl: './account-preference.component.html',
  styleUrls: ['./account-preference.component.scss']
})
export class AccountPreferenceComponent implements OnInit {

  loader: boolean = false;
  error: boolean = false;
  responseText: any;;
  modalRef: BsModalRef;
  userID: string;
  language__name: string;
  language_id: string;
  date_format: string;
  scheduled_holidays: string;
  start_date: any;
  end_date: any;
  languageList:any;
  constructor(
    private service: AccountSettingService,
    private router: Router,
    private modalService: BsModalService,
    public global: GlobalService,
  ) { }

  ngOnInit(): void {

    this.LanguageDropdownList();
    // this.FetchUser();
  }
  get Time(): Date {
    return new Date();
  }
  UpdateAccountPreferences(): void {
    this.loader = true;
    const obj = {
      language_id: this.language_id,
      date_format: this.date_format,
      scheduled_holidays: this.scheduled_holidays,
      start_date: this.global.dateFormat(this.start_date),
      end_date: this.global.dateFormat(this.end_date)
    };
    debugger
    this.service.UpdateAccountPreferences(obj).subscribe((res) => {
      // this.languageList = res.data;
      this.FetchUser();
      this.loader = false;
      // this.router.navigate(['']) 
      this.global.setCustomFieldAddTeaser('this text');
      // this.responseText = [{ name: '', list: 'Profile updated Successfully.' }];
    }, (error) => {
      this.loader = true;
    })
  }
  LanguageDropdownList(): void {
    this.service.LanguageDropdownList().subscribe((res) => {
      this.languageList = res.data;
      this.FetchUser();
      this.loader = false;
    }, (error) => {
    })
  }
  FetchUser(): void {
    let data: any = localStorage.getItem('details');
    if (data !== null) {
      data = JSON.parse(data);
      this.userID = data.user.id;
    }
    const obj = {
      id: this.userID
    };
    this.service.FetchUser(obj).subscribe((res) => {
      if (res.status === 'error') {
        this.error = true;
        let list = [];
        if (res.errors) {
          for (var key in res.errors) {
            let obj = { name: key, list: res.errors[key].toString() }
            list.push(obj);
          }
          this.responseText = list;
        } else {
          this.responseText = [{ name: 'Error', list: res.code }];
        }
      } else {
        this.language_id = res.data.language_id;
        this.language__name = res.data.language__name;
        this.date_format = res.data.date_format;
        this.scheduled_holidays = res.data.scheduled_holidays;
        this.start_date = new Date(res.data.start_date);
        this.end_date = new Date(res.data.end_date);
        this.error = false;
      }
      // this.openErrorModal();
      this.loader = false;
    }, (error) => {
      this.error = true;
      this.responseText = [{ name: 'Error', list: 'Sorry something went wrong try again.' }];
      // this.openErrorModal();
      this.loader = false;
    })
  }



  deactivateAccount() {
    this.loader = true;
    this.responseText = "";
    this.service.deactivateAccount().subscribe((res) => {

      this.modalRef.hide();
      if (res.status === "error") {
        this.error = true;
        this.responseText = "Cannot process your request, Try again later.";
      } else {

        this.error = false;
        let counter = 3;
        this.responseText = "Your account successfully deactivated. you will be logout in " + counter + "";
        setInterval(() => {
          counter -= 1;
          if (counter > 0) {
            this.responseText = "Your account successfully deactivated. you will be logout in " + counter + "";
          } else {
            localStorage.removeItem('details');
            this.router.navigateByUrl('/signin');
          }
        }, 1000)

      }
      this.loader = false;
    }, (error) => {

      this.loader = false;
      this.modalRef.hide();
      this.error = true;
      this.responseText = "Sorry, something went wrong";
    })
  }

  openModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modal);

  }

  // confirmDialog(){
  //   let check = confirm("Are you sure you want to deactivate this account!");
  //   check === true ? this.deactivateAccount() : "";
  // }

}
