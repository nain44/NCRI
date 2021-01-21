
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GlobalService, PrivilegesStore } from 'src/app/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'ncri-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrls: ['./fetch-user.component.scss']
})
export class FetchUserComponent implements OnInit {
  id: any;
  userDetails: any;
  modalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
  userForm: FormGroup;
  editLoader: boolean = false;
  range: any;
  errors: any[] = [];
  userGroups: any = [];
  branchLocations: any = [];
  timeZones: any = [];
  countryCodes: any = [];
  isEmailAvailable: boolean = false;
  errorModalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private service: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private global: GlobalService,
    private router: Router,
    public privileges: PrivilegesStore
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // alert(this.id)
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
    last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
    // password: ['**********', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/),Validators.required]],
    password:[''],
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
    assigned_approver_id:[''],
    //laptop_access_mac_address: ['', [Validators.pattern(/^[0-9a-f]{2}([-:]?)[0-9a-f]{2}(\\1[0-9a-f]{2}){4}$/), Validators.maxLength(17), Validators.minLength(2)]],
    access_type: ['laptop', [Validators.required]],
    desktop_access_mac_address: ['', [Validators.pattern(/(?:[A-Fa-f0-9]{2}[:-]){5}(?:[A-Fa-f0-9]{2})/), Validators.maxLength(17), Validators.minLength(1)]],
    laptop_access_mac_address: ['', [Validators.pattern(/(?:[A-Fa-f0-9]{2}[:-]){5}(?:[A-Fa-f0-9]{2})/), Validators.maxLength(17), Validators.minLength(1)]],
    access_hours_enabled: [false],
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
    this.userGroupDropdownList();
this.branchLocationDropdownList();
this.timeZoneDropdownList();
this.countryCodeDropdownList();
    this.getUserByID();
    
  }

  getUserByID(){
    let obj = {
      id: this.id
    }
    this.service.fetchUserByID(obj).subscribe((res) =>{
      if(res.status === "success"){
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
        this.userDetails = res.data;
        this.userForm.patchValue(this.userDetails);

        // this.userForm.controls.access_hours_enabled.setValue(true);
        this.toggleAccessControl();
      }
    },(error) => {

    })
  }

  editUser(){
    debugger
    let form = Object.assign({}, this.userForm.value);
    form.id = this.id;
    form.password = "**********";
    form.status = "P";
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

  

    this.editLoader = true;
    this.service.editUser(form).subscribe((res) =>{
      if(res.status === "success"){
        this.getUserByID();
        // this.router.navigate(['/user']);
        this.modalRef.hide();
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
      this.editLoader = false;
    },(error) =>{
      this.editLoader = false;
    })
  }

  openModal(template:any){
    this.modalRef = this.modalService.show(template,this.config)
  }
  openErrorModal(){
    this.errorModalRef = this.modalService.show(this.errorModal,this.config);
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
}
