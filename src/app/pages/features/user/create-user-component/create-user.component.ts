import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalService } from 'src/app/core';

@Component({
  selector: 'ncri-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };
  modalRef: BsModalRef;
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
  approverList: any = [];
  constructor(
    private fb: FormBuilder,
     private service: UserService,
     private router: Router,
     private route: ActivatedRoute, 
     private modalService: BsModalService,
     private global: GlobalService
     ) {
    
      this.userForm = this.fb.group({
        first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
      password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/),Validators.required]],
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
      assigned_approver_id:[''],
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
      this.userForm.controls.access_hours_start_time.disable();
      this.userForm.controls.access_hours_end_time.disable();
      this.userForm.controls.access_hours_timezone.disable();
      this.userForm.controls.logout_inactivity_minutes.disable();
    }else{
      this.userForm.controls.access_hours_start_time.enable();
      this.userForm.controls.access_hours_end_time.enable();
      this.userForm.controls.access_hours_timezone.enable();
      this.userForm.controls.logout_inactivity_minutes.enable();
    }
  }

  addIPAddress() {
    debugger;
    let formArray = this.userForm.controls.system_access_ip_addresses as FormArray;
      formArray.push(this.fb.group({
        ip:[""],
        // ip:[""+(this.range ? this.range : '')],
      }));
  }
  removeIPAddress(index: number){
    debugger
    let formArray = this.userForm.controls.system_access_ip_addresses as FormArray;
    formArray.value.splice(index,1);
    formArray.controls.splice(index,1);
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

  addUser(){
    let form = Object.assign({}, this.userForm.value);
    // ip address
    if(form.ip_address_access_enabled){
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

    this.loader = true;
    this.service.createUser(form).subscribe((res) =>{
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
