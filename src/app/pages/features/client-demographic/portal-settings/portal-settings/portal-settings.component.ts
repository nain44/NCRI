import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GlobalService } from 'src/app/core';
import { ClientDemographicService } from '../../services/client-demographic.service';
import { UserDemographicStore } from '../../store';
declare var $;

@Component({
  selector: 'ncri-portal-settings',
  templateUrl: './portal-settings.component.html',
  styleUrls: ['./portal-settings.component.scss']
})
export class PortalSettingsComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment'
  };

  isEdit: boolean = false;
  selectedGroup: any;
  errorList: any = [{ name: 'sdfsd', list: 'dsfsdf' }];
  clientPortalDropdownList: any = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>; 
  loader: boolean = false;
  constructor(
    public store: UserDemographicStore,
    private fb: FormBuilder,
    private service: ClientDemographicService,
    private modalService: BsModalService,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.getClientPortal();
    // setTimeout(() => {
    //   this.openErrorModal();
    // }, 2000);
  }

  submitForm() {
    debugger;
    // this.store.portalSettings.value
    let obj = this.store.mergeFormData();
    obj.default_commission = parseFloat(obj.default_commission);

    //parsing date in api format
    if(obj.date_for_custom_field != undefined){
      obj.date_for_custom_field = this.global.dateFormat(obj.date_for_custom_field);
    } 
    obj.start_date = this.global.dateFormat(obj.start_date);
    obj.last_placement = this.global.dateFormat(obj.last_placement);
    if (obj.is_master_client) {
       obj.master_client_id = '';
    }
    if (obj) {
      // to do: set true false for return_merchandise_rate_type
      obj.return_merchandise_rate_type ? obj.return_merchandise_rate_type = '$' :
      obj.return_merchandise_rate_type = '%';
      this.addUserDemographic(obj);
    }
  }

  addUserDemographic(formData: any) {
    this.loader = true;
    this.errorList = [];
    this.service.addUser(formData).subscribe((res) => {
      this.loader = false;
      if (res.status === 'error') {
        if (res.errors) {
          for (var key in res.errors) {
            this.errorList.push({ name: key, list: res.errors[key].toString() });
          }
        } else {
          this.errorList = [{ name: key, list: res.message }];
        }
        this.openErrorModal();
      }else{
        this.store.isSuccess = true;
      }

    }, (error) => {
      this.loader = false;
    });
  }

  addGroup() {
    if (this.store.portalSettings.controls.group_name.value) {
      let check = this.store.portalSettings.controls.group_list.value.some(it =>
        it.name === this.store.portalSettings.controls.group_name.value);
      if (check === false) {
        let obj = {
          name: this.store.portalSettings.controls.group_name.value,
          is_checked: false
        };
        let formArray = this.store.portalSettings.controls.group_list as FormArray;
        formArray.push(this.fb.group(obj));
      }

      this.store.portalSettings.controls.group_name.setValue('');
    }
  }

  editGroup(obj: any) {
    this.isEdit = true;
    this.store.portalSettings.controls.group_name.setValue(obj.name);
    this.selectedGroup = obj;
  }

  updateGroup() {
    let index = this.store.portalSettings.controls.group_list.value.indexOf(this.selectedGroup);
    if (index !== -1) {
      this.store.portalSettings.controls.group_list.value[index].name = this.store.portalSettings.controls.group_name.value;
      this.store.portalSettings.controls.group_name.setValue('');
    }
    this.isEdit = false;
  }

  deleteGroup(index: any) {
    this.store.portalSettings.controls.group_list.value.splice(index, 1);
    this.store.portalSettings.controls.group_list['controls'].splice(index, 1);
    if (this.store.portalSettings.controls.group_list.value.length === 0) {
      this.store.portalSettings.controls.group_list.setErrors(Validators.required);
      // this.store.portalSettings.controls.group_list = new FormArray([], Validators.required)
    }
  }

  addUser() {
    if (this.store.portalSettings.controls.username.value) {
      let check = this.store.portalSettings.controls.user_list.value.some(it =>
        it.username === this.store.portalSettings.controls.username.value);
      if (check === false) {
        let obj = {
          username: this.store.portalSettings.controls.username.value,
          password: this.store.portalSettings.controls.password.value
        };
        let formArray = this.store.portalSettings.controls.user_list as FormArray;
        formArray.push(this.fb.group(obj));
        this.store.portalSettings.controls.username.setValue('');
        this.store.portalSettings.controls.password.setValue('');
      }
    }
  }

  deleteUser(index: any) {
    this.store.portalSettings.controls.user_list.value.splice(index, 1);
    this.store.portalSettings.controls.user_list['controls'].splice(index, 1);
    if (this.store.portalSettings.controls.user_list.value.length === 0) {
      // this.store.portalSettings.controls.user_list = new FormArray([], Validators.required)
      this.store.portalSettings.controls.user_list.setErrors(Validators.required);
    }
  }

  addDocument() {
    if (this.store.portalSettings.controls.document_name.value) {
      let check = this.store.portalSettings.controls.required_document_list.value.some(it =>
        it.name === this.store.portalSettings.controls.document_name.value);
      if (check === false) {
        let obj = {
          name: this.store.portalSettings.controls.document_name.value
        };
        let formArray = this.store.portalSettings.controls.required_document_list as FormArray;
        formArray.push(this.fb.group(obj));
        this.store.portalSettings.controls.document_name.setValue('');
      }
    }
  }

  deleteDocument(index) {
    if (index !== -1) {
      this.store.portalSettings.controls.required_document_list.value.splice(index, 1);
      this.store.portalSettings.controls.required_document_list['controls'].splice(index, 1);
      if (this.store.portalSettings.controls.required_document_list.value.length === 0) {
        // this.store.portalSettings.controls.required_document_list = new FormArray([], Validators.required);
        this.store.portalSettings.controls.required_document_list.setErrors(Validators.required);
      }
    }

  }

  getClientPortal() {
    this.service.getClientPortalDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.clientPortalDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  openErrorModal() {
    this.modalRef = this.modalService.show(this.errorModal, this.config);
  }
  select2Init(){
  //   $(".selectDropdown").select2({
  //     minimumResultsForSearch: -1
  // });
  // $('.selectDropdown').on('select2:select', function (e) {  
  //   $(e.target).parent().find('.select2-container').addClass('select-valid');
  // });
  // $('.selectDropdown').on('select2:open', function (e) {   
  //   $(e.target).parent().find('.select2-container').addClass('select-valid');
  // });
  $(".input-label").addClass('initail-label');
  $(".selectDropdown").removeClass('ng-valid');
  $('.selectDropdown.valid-check').change(function(){ 
    if(!$(this).val()){
        $(this).removeClass("ng-valid");
    } else{
        $(this).addClass("ng-valid");
    }
  });
  $(".input-label").on('focus',function(){ 
    $(this).removeClass('initail-label');  
  });
  $('.input-label').blur(function(){
    if(!$(this).val()){
        $(this).addClass("initail-label");
    } else{
        $(this).removeClass("initail-label");
    }
  });
  }

  ngAfterViewInit(){
    this.select2Init();
  }
}
