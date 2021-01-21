import { SettingService } from './../services/setting.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-change-logo',
  templateUrl: './change-logo.component.html',
  styleUrls: ['./change-logo.component.scss']
})
export class ChangeLogoComponent implements OnInit {
  logoLoader = false;
  modalRef: BsModalRef;
  @ViewChild('changeLogo') changeLogoModal: TemplateRef<any>;
  // tslint:disable-next-line: variable-name
  logo_file: File;
  logo: any = '';
  responseText = '';
  uploadForm: FormGroup;
  public imagePath;
  url: any = {};
  constructor(
    private service: SettingService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    // this.fetchLogo();
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  deleteFile(): void {
    this.uploadForm.get('profile').setValue('');
  }
  uploadDocument(input: any, type: string): void {
    debugger
    const files = type === 'drop' ? input[0] : input.files[0];
    this.responseText = '';
    if (files) {
      if (files.type !== 'image/png') {
        this.responseText = 'Only files with specific extensions are allowed: png';
      } else if (files.size > 3000000) {
        this.responseText = 'Maximum size allowed 3 MB';
      }
      else {
        this.checkSize(files);
      }
    }
  }
  /**
   * on file drop handler
   */
  onFileDropped(event): void {
    this.uploadDocument(event, 'drop');
  }
  onSelectFile(event): void { // called each time file input changes
    this.responseText = '';
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/png') {
        this.responseText = 'Only files with specific extensions are allowed: png';
      } else if (file.size > 3000000) {
        this.responseText = 'Maximum size allowed 3 MB';
      }
      else {
        this.checkSize(file);
      }
    }
  }
  openModal(): void {
    this.modalRef = this.modalService.show(this.changeLogoModal);
  }
  uploadLogo(): void {
    this.logoLoader = true;
    const formData = new FormData();

    formData.append('logo_file', this.uploadForm.get('profile').value);
    console.log('profile', formData);
    this.service.changeLogo(formData).subscribe((res) => {
      if (res.status === 'success') {
        this.logo = res.data.url + "?time="+new Date().getTime();
        if(document.getElementsByClassName('img-fluid')[0]){
          document.getElementsByClassName('img-fluid')[0]['src'] = this.logo
        }
        console.log('change logo res==', res.data);
        this.logoLoader = false;
      } else {
        this.logoLoader = false;
        if (res.errors) {
          const list = [];
          for (var key in res.errors) {
            list.push(res.errors[key].toString());
          }
          this.responseText = list.toString();
        } else {
          this.responseText = res.code;
        }
        // alert("Something went wrong try again");
      }
    }, (error) => {
      this.logoLoader = false;
      this.responseText = 'Sorry something went wrong try again.';
    });
  }

  fetchLogo(): void {
    this.service.getLogo().subscribe((res) => {

      if (res.status === 'success') {
        this.logo = res.data.logo_file_url;
      } else {
        this.logo = 'error';
      }
    }, (error) => {
      this.logo = 'error';
    });
  }

  checkSize(file: any): void {
    const _URL = window.URL || window.webkitURL;
    const img = new Image();
    img.onload = (data) => {
      // alert(this.width + " " + this.height);
      if (data.target['width'] === 300 && data.target['height'] === 150) {
        this.uploadForm.get('profile').setValue(file);
        console.log('saddd', this.uploadForm.get('profile').setValue(file));
        // this.uploadLogo();
        // this.openModal();
        this.uploadLogo();
      } else {
        this.responseText = 'File resolution should be 300x150';
      }

    };
    img.onerror = function () {
      // alert( "not a valid file: " + file.type);
      this.responseText = 'not a valid file: ' + file.type;
    };
    img.src = _URL.createObjectURL(file);
  }
  saveLogo(){
    window.location.reload();
  }
}
