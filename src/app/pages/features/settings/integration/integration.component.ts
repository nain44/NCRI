import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingService } from '../services';

@Component({
  selector: 'ncri-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  tab = 'employee';
  type: string = "api";
  subType: string = "a";
  modalRef: BsModalRef;
  integration: FormGroup;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  loader: boolean = false;
  responseText: any = "";
  parentID: any;
  exportDate: any = new Date();
  fileExported: boolean = false;
  apiList: any[] = [];
  ftpList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private service: SettingService
  ) {
    this.integration = this.fb.group({
      upload_manually: [false],
      upload_via_api: [false],
      api_client_id: [''],
      api_secret_key: [''],
      upload_via_ftp_server: [false],
      ftp_server_username: [''],
      ftp_server_password: [''],
      ftp_server_host: [''],
      ftp_server_port: [''],
      ftp_server_path_location: ['']
    });
   }

  ngOnInit(): void {
    this.getDropdownList();
  }

  setTab(tab: string) {
    this.tab = tab; 

  }

  openModal(template:any) {
    this.modalRef = this.modalService.show(template);
  }

  openErrorModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  addPortalName(){
    let obj = {
      name: "portal" + (Math.floor(Math.random() * 10000) + 1)
    }
    this.loader = true;
    this.responseText = "";
    this.service.addPortalName(obj).subscribe((res) => {
      //debugger
      if(res.status === "success"){
        this.parentID = res.data.id;
        let obj = this.integration.getRawValue();
        obj.third_party_portal_id = this.parentID;
        this.subType === 'm' ? obj.upload_manually = true : obj.upload_manually = false;
        if(this.type === "api"){
          obj.upload_via_api = true;
          obj.upload_via_ftp_server = false;
        }else{
          obj.upload_via_api = false;
          obj.upload_via_ftp_server = true;
        }
        this.addPortalConfig(obj);
      }else{
        this.responseText = [{name:"Error", list:res.code}];
        this.openErrorModal();
      }
      // this.loader = false;
    },(error) =>{
      //debugger
      this.loader = false;
    })
  }

  addPortalConfig(obj:any){
    //debugger
    this.service.addThirdPartyConfig(obj).subscribe((res) => {
      //debugger
      if(res.status === "success"){
        this.fileExported = true;
      }else{
        this.openErrorModal();
        this.responseText = [];
        if(res.errors){
          for(var key in res.errors){
            this.responseText.push({name:key, list:res.errors[key].toString()});
          }
        }else{
          this.responseText = [{name:"Error", list:res.code}];
        }
        
      }
      this.loader = false;
    },(error) =>{
      this.loader = false;
    })
  }

  getDropdownList(){
    this.service.getDropdownData().subscribe((res) => {
      //debugger
      if(res.status === "success"){
        this.apiList = this.filterList('upload_via_api',res.data);
        this.ftpList = this.filterList('upload_via_ftp_server',res.data);
      }
    },(error) =>{
      //debugger
    })
  }

  filterList(key:any,data:any){
    return data.filter(it => it[key] === true);
  }

  selectAPI(id:any){
    let obj = this.apiList.find(it => it.id === id);
    if(obj){
      this.integration.controls.api_client_id.setValue(obj.api_client_id);
      this.integration.controls.api_secret_key.setValue(obj.api_secret_key);
    }
  }

  selectIntegration(id:any){
    let obj = this.ftpList.find(it => it.id === id);
    if(obj){
      this.integration.controls.ftp_server_username.setValue(obj.ftp_server_username);
      this.integration.controls.ftp_server_password.setValue(obj.ftp_server_password);
      this.integration.controls.ftp_server_host.setValue(obj.ftp_server_host);
      this.integration.controls.ftp_server_path_location.setValue(obj.ftp_server_path_location);
    }
  }


}
