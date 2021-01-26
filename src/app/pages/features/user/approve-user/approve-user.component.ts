import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalService, PrivilegesStore } from '../../../../core';

@Component({
  selector: 'ncri-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.scss']
})
export class ApproveUserComponent implements OnInit {

 
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };
  modalRef: BsModalRef;
  @ViewChild('startTime') startTimePicker;
  range: any = "";
  branchLocations: any = [];
  countryCodes: any = [];
  departments: any = [];
  employeeTypes: any = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  timeZones: any = [];
  userGroups: any = [];
  reportingList: any = [];
  userForm: FormGroup;
  loader: boolean = false;
  errors: any[] = [];
  isEmailAvailable: boolean = false;
  id: string;
  approveLoader: boolean = false;
  rejectLoader: boolean = false;
  userDetails: any;
  approverList: any = [];
  constructor(
    private fb: FormBuilder,
     private service: UserService,
     private router: Router,
     private route: ActivatedRoute, 
     public privileges: PrivilegesStore,
     private modalService: BsModalService,
     private global: GlobalService,
     private activatedRoute: ActivatedRoute
     ) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.userForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
      // password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/),Validators.required]],
      password:["******"],
      user_role_id: ['', [Validators.required]],
      employee_type_id: ['', [Validators.required]],
      date_of_joining: ['', [Validators.required]],
      termination_date: [''],
      department_id: ['', [Validators.required]],
      use_client_percentage: [false],
      reporting_to_id: ["", Validators.required],
      country_code: ['', [Validators.maxLength(2), Validators.minLength(1)]],
      cell_number: ['', [Validators.pattern(/^\+?1?\d{9,15}$/), Validators.maxLength(17), Validators.minLength(1)]],
      phone: ['', [Validators.pattern(/^\+?1?\d{9,15}$/), Validators.maxLength(17), Validators.minLength(1)]],
      branch_location_id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(1)]],
      system_access_enabled: [false],
      mobile_access_enabled: [false],
      desktop_access_enabled: [false],
      assigned_approver_id:[''],
      mobile_access_imei: ['', [Validators.maxLength(15), Validators.minLength(1)]],
      laptop_access_enabled: [true],
      device_type:[''],
      //laptop_access_mac_address: ['', [Validators.pattern(/^[0-9a-f]{2}([-:]?)[0-9a-f]{2}(\\1[0-9a-f]{2}){4}$/), Validators.maxLength(17), Validators.minLength(2)]],
      access_type: ['laptop', [Validators.required]],
      desktop_access_mac_address: ['', [Validators.pattern(/(?:[A-Fa-f0-9]{2}[:-]){5}(?:[A-Fa-f0-9]{2})/), Validators.maxLength(17), Validators.minLength(1)]],
      laptop_access_mac_address: ['', [Validators.pattern(/(?:[A-Fa-f0-9]{2}[:-]){5}(?:[A-Fa-f0-9]{2})/), Validators.maxLength(17), Validators.minLength(1)]],
      access_hours_enabled: [true],
      access_hours_start_time: ['',[Validators.required]],
      access_hours_end_time: ['',[Validators.required]],
      access_hours_timezone: ['',[Validators.required]],
      weekends_access_blocked: [false],
      logout_inactivity_minutes: [30,[Validators.required, Validators.pattern(/^[0-9]+$/)]],
      ip_address_access_enabled: [false],
      ext:[''],
      // system_access_ip_addresses: this.fb.array([], Validators.minLength(1)),
      system_access_ip_addresses: new FormArray([
        this.fb.group({
          ip:[(this.range ? this.range : '')],
        })
    ]),
      })
 
  }

  ngOnInit(): void {
    this.getApproverList();
    this.getReportingList();
    this.userGroupDropdownList();
    this.employeeTypeDropdownList();
    this.branchLocationDropdownList();
    this.timeZoneDropdownList();
    this.departmentDropdownList();
    this.countryCodeDropdownList();
    this.getUserByID();
  }

  getUserByID(){
    let obj = {
      id: this.id
    }
    this.service.fetchUserByID(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.userDetails = res.data;
        if(res.data.termination_date)res.data.termination_date = new Date(res.data.date_of_joining)
        if(res.data.date_of_joining)res.data.date_of_joining = new Date(res.data.date_of_joining)
        if(res.data.access_hours_end_time)res.data.access_hours_end_time = res.data.access_hours_end_time.split(':')[0] + ":"+res.data.access_hours_end_time.split(':')[1];
        if(res.data.access_hours_start_time)res.data.access_hours_start_time = res.data.access_hours_start_time.split(':')[0] + ":"+res.data.access_hours_start_time.split(':')[1];
        this.userForm.patchValue(res.data);
        
        //patching ips
        if(res.data.system_access_ip_addresses.length > 0){
          for (let index = 0; index < res.data.system_access_ip_addresses.length; index++) {
            this.patchIPS(res.data.system_access_ip_addresses[index].ip_address);
          }
        }
        // this.userDetails = res.data;

        if(this.privileges.privilegeHash['uam.views.ApproveMultipleUser']['c']
         || this.privileges.privilegeHash['uam.views.CancelMultipleUser']['c']){
          if(!this.privileges.privilegeHash['uam.views.EditUser']['m']){
            this.userForm.disable();
            console.clear()
            console.log(this.userForm.valid)
          }
          
        }

        this.toggleAccessControl();

        this.userForm.controls.first_name.markAsTouched();
        this.userForm.controls.last_name.markAsTouched();
        
      }
    },(error) => {

    })
  }
  // branchLocationDropdownList
  branchLocationDropdownList() {
    this.service.branchLocationDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.branchLocations = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // countryCodeDropdownList
  countryCodeDropdownList() {
    this.service.countryCodeDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.countryCodes = response.data;
          
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // departmentDropdownList
  departmentDropdownList() {
    this.service.departmentDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.departments = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // employeeTypeDropdownList
  employeeTypeDropdownList() {
    this.service.employeeTypeDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.employeeTypes = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // timeZoneDropdownList
  timeZoneDropdownList() {
    this.service.timeZoneDropdownList()
      .subscribe((response) => {
        if (response?.status === 'success') {
          this.timeZones = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // userGroupDropdownList
  userGroupDropdownList() {
    this.service.getUserRoles()
      .subscribe((response:any) => {
        if (response?.status === 'success') {
          this.userGroups = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }

  validateEmail(){
    this.isEmailAvailable = false;
    let obj = {
      email: this.userForm.controls.email.value
    }
    if(!this.userForm.controls.email.valid){
      return
    }
    this.service.validateEmail(obj).subscribe((res:any) => {
      
      if(res.status === "success"){
        if(res.data.is_available){
          this.isEmailAvailable = false;
        }else{
          this.isEmailAvailable = true;
        }
        
      }else{
        this.isEmailAvailable = true;
      }
    }, (error)=>{
      this.isEmailAvailable = true;
    })
  }


  getReportingList(){
    this.service.getReportingList().subscribe((res) => {
      
      if(res.status === "success"){
        this.reportingList = res.data;
      }
    },(error) =>{
      
    })
  }

  openErrorModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }
  openModalEditWidget(template: any): void {
    this.modalRef = this.modalService.show(template, this.config);
  }

  toggleAccessControl(){
    debugger
    let check = this.userForm.controls.access_hours_enabled.value;
    if(check === false){
      this.userForm.controls.access_hours_start_time.clearValidators();
      this.userForm.controls.access_hours_start_time.updateValueAndValidity();

      this.userForm.controls.access_hours_end_time.clearValidators();
      this.userForm.controls.access_hours_end_time.updateValueAndValidity();

      this.userForm.controls.access_hours_timezone.clearValidators();
      this.userForm.controls.access_hours_timezone.updateValueAndValidity();

      this.userForm.controls.logout_inactivity_minutes.clearValidators();
      this.userForm.controls.logout_inactivity_minutes.updateValueAndValidity();
    }else{
      this.userForm.controls.access_hours_start_time.setValidators([Validators.required]);
      this.userForm.controls.access_hours_start_time.updateValueAndValidity();

      this.userForm.controls.access_hours_end_time.setValidators([Validators.required]);
      this.userForm.controls.access_hours_end_time.updateValueAndValidity();

      this.userForm.controls.access_hours_timezone.setValidators([Validators.required]);
      this.userForm.controls.access_hours_timezone.updateValueAndValidity();

      this.userForm.controls.logout_inactivity_minutes.setValidators([Validators.required]);
      this.userForm.controls.logout_inactivity_minutes.updateValueAndValidity();
    }
  }

  addIPAddress() {
    let formArray = this.userForm.controls.system_access_ip_addresses as FormArray;
      formArray.push(this.fb.group({
        ip:[""],
      }));
  }

  patchIPS(ip:any) {
    let formArray = this.userForm.controls.system_access_ip_addresses as FormArray;
      formArray.push(this.fb.group({
        ip:[ip],
      }));
  }

  // dataChanged(){
  //   let formArray = this.userForm.controls.system_access_ip_addresses as FormArray;
  //   for (let index = 0; index < formArray.controls.length; index++) {
  //       let val = formArray.controls[index]['controls'].ip.value
  //       formArray.controls[index]['controls'].ip.setValue(val+this.range)
  //   }
  // }

  changeDevice(){
    let name = this.userForm.controls.device_type.value;
    if(name === "Laptop"){
      this.userForm.controls.mobile_access_enabled.setValue(false)
      this.userForm.controls.desktop_access_enabled.setValue(false)
      this.userForm.controls.laptop_access_enabled.setValue(true)
    }else if(name === "Desktop"){
      this.userForm.controls.mobile_access_enabled.setValue(false)
      this.userForm.controls.desktop_access_enabled.setValue(true)
      this.userForm.controls.laptop_access_enabled.setValue(false)
    }else{
      this.userForm.controls.mobile_access_enabled.setValue(true)
      this.userForm.controls.desktop_access_enabled.setValue(false)
      this.userForm.controls.laptop_access_enabled.setValue(false)
    }
  }

  editUserStatus(){
    // for(var key in this.userForm.controls){
    //   console.log(key + " " + this.userForm.controls[key].valid);
    // }

    // return
    // if(status === "A" || status === "P"){
    //   this.approveLoader = true;
    // }else{
    //   this.rejectLoader = true;
    // }
    let form = Object.assign({}, this.userForm.value);


    this.privileges.privilegeHash['uam.views.EditUser']['m'] &&
      !this.privileges.privilegeHash['uam.views.ApproveMultipleUser']['c'] ? 
      form.edit_and_approve = true : "";


    form.id = this.id;
    form.password = "**********";
     // ip address
     if(form.ip_address_access_enabled){
      form.system_access_ip_addresses.splice(0,1);
      form.system_access_ip_addresses = form.system_access_ip_addresses.map(it => it.ip);
    }else{
      form.system_access_ip_addresses = [];
    }
    //access hours enabled
    if(!form.access_hours_enabled){
      form.access_hours_start_time = null;
      form.access_hours_end_time  = null;
      form.access_hours_timezone  = '';
      form.logout_inactivity_minutes = 30;
    }


    //setting date
    if(form.termination_date){
      form.termination_date = this.global.dateFormat(form.termination_date);
    }else{
      form.termination_date = null;
    }
    form.date_of_joining = this.global.dateFormat(form.date_of_joining);

    // form.status = status;

    this.loader = true;
    this.service.editUser(form).subscribe((res) =>{
      if(res.status === "success"){
        
        this.router.navigate(['/user']);
      }else{
        if(res.errors){
          let arr = [];
          for(var key in res.errors){
            arr.push(key+": " + res.errors[key]);
          }
          this.errors = arr;
        }else{
          this.errors = [res.message]
        }
        this.openErrorModal();
      }
      this.loader = false;
    },(error) =>{
      this.loader = false;
    })
  }

  approveUser(){
    
    this.approveLoader = true;
    let obj = {
      ids: [this.id]
    }
    debugger
    this.service.approveMultiple(obj).subscribe((res) => {
      this.approveLoader = false;
      if(res.status === "success"){
        this.router.navigate(['/user']);
      }else{
        if(res.errors){
          let arr = [];
          for(var key in res.errors){
            arr.push(key+": " + res.errors[key]);
          }
          this.errors = arr;
        }else{
          this.errors = [res.message]
        }
        this.openErrorModal();
      }
    },(error) =>{
      this.approveLoader = false;
    })
  }

  rejectUser(){
    this.rejectLoader = true;
    let obj = {
      ids: [this.id]
    }
    this.service.cancelMultiple(obj).subscribe((res) => {
      this.rejectLoader = false;
      if(res.status === "success"){
        this.router.navigate(['/user']);
      }else{
        if(res.errors){
          let arr = [];
          for(var key in res.errors){
            arr.push(key+": " + res.errors[key]);
          }
          this.errors = arr;
        }else{
          this.errors = [res.message]
        }
        this.openErrorModal();
      }
    },(error) =>{
      this.rejectLoader = false;
    })
  }

  getApproverList() {
    this.service.getApprover()
      .subscribe((response:any) => {
        if (response?.status === 'success') {
          this.approverList = response.data;
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
}
