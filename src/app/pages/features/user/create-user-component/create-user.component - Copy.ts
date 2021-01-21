import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  confige = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };

  tab: string = 'employee'; 
  modalRef: BsModalRef;
  userData:any={};
  employeeInformation: FormGroup;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  isEmailAvailable: boolean = false;
  contactInformation: FormGroup;
  accessControl: FormGroup;
  subscriptions: Subscription[] = [];
  branchLocations: any[] = [];
  countryCodes: any[] = [];
  departments: any[] = [];
  employeeTypes: any[] = [];
  timeZones: any[] = [];
  userGroups: any[] = [];
  createUserLoader:boolean=false;
  error: boolean = false;
  errorMessage: any = '';
  accOpen = true;
  param: any = {
    id:"",
    type:""
  };
  selectedUser: any;
  reportingList: any = [];
  userID: any = "";
  rangeValue: any = "";
  constructor(
    private fb: FormBuilder,
     private service: UserService,
     private router: Router,
     private route: ActivatedRoute, 
     private modalService: BsModalService,
     ) {


    //getting params from query
    this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.param.type = params['type'];
      this.param.id = params['id'];
    });
    

    this.employeeInformation = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z.]+$/), Validators.maxLength(26), Validators.minLength(1)]],
      password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/),Validators.required]],
      user_role_id: ['', [Validators.required]],
      employee_type_id: ['', [Validators.required]],
      date_of_joining: ['', [Validators.required]],
      termination_date: [''],
      department_id: ['', [Validators.required]],
      use_client_percentage: [false],
      reporting_to_id: ["", Validators.required]
    });
    this.contactInformation = this.fb.group({
      country_code: ['', [Validators.maxLength(2), Validators.minLength(1)]],
      cell_number: ['', [Validators.pattern(/^\+?1?\d{9,15}$/), Validators.maxLength(17), Validators.minLength(1)]],
      phone: ['', [Validators.pattern(/^\+?1?\d{9,15}$/), Validators.maxLength(17), Validators.minLength(1)]],
      branch_location_id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(1)]]
    });
    this.accessControl = this.fb.group({
      system_access_enabled: [false, [Validators.requiredTrue]],
      mobile_access_enabled: [false],
      desktop_access_enabled: [false],
      mobile_access_imei: ['', [Validators.maxLength(15), Validators.minLength(1)]],
      laptop_access_enabled: [true],
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
      system_access_ip_addresses: this.fb.array([], Validators.minLength(1))
    });
    
    if(this.param.id){
      this.employeeInformation.controls.password.disable();
      this.fetchUserDetailsByID();
    }
  }

  ngOnInit(): void {
    this.getReportingList();
    this.userGroupDropdownList();
    this.employeeTypeDropdownList();
    this.branchLocationDropdownList();
    this.timeZoneDropdownList();
    this.departmentDropdownList();
    this.countryCodeDropdownList();
  }
  //set tab
  setTab(tab: string) {
    this.tab = tab; 

  }
  openExport(Export: TemplateRef<any>,data) {
    this.userData = data
    this.modalRef = this.modalService.show(
      Export,
      Object.assign({}, { class: 'uploadFile' }),
      // this.userData
      ); 
    // this.modalRef.content.userActivate = 'Close';

  }
  //set tab
  // Collapses:any ="l1";
  // setCollapse(__Collapses: any){
  //   let id = this.Collapses;  
  //   if(document.getElementById(id).classList.contains('collapsed')){
  //     document.getElementById(id).classList.remove('collapsed');
  //     document.getElementById(id).classList.add('collapse');
  //   }else{
  //     document.getElementById(id).classList.remove('collapse');
  //     document.getElementById(id).classList.add('collapsed');
  //   }
    
  // }
  // on IP access enabled
  onIPAccessEnabled(event: any) {
    //debugger;
    if (event.currentTarget.checked) {
      this.addIPAddresses()
    } else {
      const ips = this.accessControl.get('system_access_ip_addresses') as FormArray;
      ips.clear();
    }
  }
  //add IP Addresses in from array
  addIPAddresses() {
    //debugger;
    const ips = this.accessControl.get('system_access_ip_addresses') as FormArray;
    
    let value = "";
    if(ips.length > 0){
      if(document.getElementById('txtrange')){
        let ip = ips.controls[0].value.ip;
        value = document.getElementById('txtrange')['value'] ? ip + "/" + document.getElementById('txtrange')['value'] : ip;
        this.rangeValue = document.getElementById('txtrange')['value'];
        if(!this.rangeValue)this.rangeValue = '';
      }
    }
    
    // debugger
    ips.push(this.fb.group({
      ip:[value]
    }));
    
  }
  //removed IP Addresses in from array
  removeIPAddresses(index: number) {
   // debugger;
    const ips = this.accessControl.get('system_access_ip_addresses') as FormArray;
    ips.removeAt(index);
  }

  // convenience getter for easy access to form fields
  get f() { 
  //console.log('f called==',this.employeeInformation)
    return this.employeeInformation;
   }
   get g() { 
   
    return this.contactInformation;
   }
   get h() { 
    
    return this.accessControl;
   }
   
  // create user
  createUser(){
   // debugger;
    let form: any = Object.assign({},this.employeeInformation.value, this.contactInformation.value, this.accessControl.value);
    form.system_access_ip_addresses?form.system_access_ip_addresses = form.system_access_ip_addresses.map(it=>it.ip) : '';
    console.log(form); 
    this.subscriptions[this.subscriptions.length] = this.service.createUser(form)
      .subscribe((response) => {
        if (response?.status === 'success') {
          console.log(response);
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
      })
  }
  // branchLocationDropdownList
  branchLocationDropdownList() {
    this.subscriptions[this.subscriptions.length] = this.service.branchLocationDropdownList()
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
    this.subscriptions[this.subscriptions.length] = this.service.countryCodeDropdownList()
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
    this.subscriptions[this.subscriptions.length] = this.service.departmentDropdownList()
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
    this.subscriptions[this.subscriptions.length] = this.service.employeeTypeDropdownList()
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
    this.subscriptions[this.subscriptions.length] = this.service.timeZoneDropdownList()
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
    this.subscriptions[this.subscriptions.length] = this.service.getUserRoles()
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


  ngOnDestroy(){
    this.subscriptions.forEach(subscription => {
      if(subscription)subscription.unsubscribe();
    });
  }
  
  // on access type control
  onAccessType(event:any){
    console.log("called on load")
    if(event.currentTarget.value === 'laptop'){
       this.accessControl.get('laptop_access_enabled').setValue(true);
       this.accessControl.get('mobile_access_enabled').setValue(false);
       this.accessControl.get('desktop_access_enabled').setValue(false);
       this.accessControl.get('mobile_access_imei').reset();
       this.accessControl.get('laptop_access_mac_address').reset();
       this.accessControl.get('desktop_access_mac_address').reset();
    }else if(event.currentTarget.value === 'mobile'){
      this.accessControl.get('laptop_access_enabled').setValue(false);
       this.accessControl.get('mobile_access_enabled').setValue(true);
       this.accessControl.get('desktop_access_enabled').setValue(false);
       this.accessControl.get('mobile_access_imei').reset();
       this.accessControl.get('laptop_access_mac_address').reset();
       this.accessControl.get('desktop_access_mac_address').reset();
    }else if(event.currentTarget.value === 'system'){
      this.accessControl.get('laptop_access_enabled').setValue(false);
      this.accessControl.get('mobile_access_enabled').setValue(false);
      this.accessControl.get('desktop_access_enabled').setValue(true);
      this.accessControl.get('mobile_access_imei').reset();
       this.accessControl.get('laptop_access_mac_address').reset();
       this.accessControl.get('desktop_access_mac_address').reset();
    }
  }
  // on access control
  onAccessHoursControl(event:any){
    console.log("called on load")
    if(event.currentTarget.checked){
       this.enableControls();
    }else{
     this.disableControls();
    }
  }
  // enable access hours controls
  disableControls(){
    this.accessControl.get('access_hours_start_time').disable();
    this.accessControl.get('access_hours_end_time').disable();
    this.accessControl.get('access_hours_timezone').disable();
    this.accessControl.get('access_hours_start_time').reset();
    this.accessControl.get('access_hours_end_time').reset();
    this.accessControl.get('access_hours_timezone').reset();
    this.accessControl.get('weekends_access_blocked').setValue(false);
  }
  // enable access hours controls
  enableControls(){
    this.accessControl.get('access_hours_start_time').enable();
    this.accessControl.get('access_hours_end_time').enable();
    this.accessControl.get('access_hours_timezone').enable();
    this.accessControl.get('access_hours_start_time').reset();
    this.accessControl.get('access_hours_end_time').reset();
    this.accessControl.get('access_hours_timezone').reset();
    this.accessControl.get('weekends_access_blocked').setValue(false);
  }

  submitForm(form:any){
    if(this.employeeInformation.valid && this.contactInformation.valid && this.accessControl.valid){
      this.createUserLoader=true;
    let obj = {...this.employeeInformation.value, ...this.contactInformation.value, ...this.accessControl.value};
    obj.date_of_joining = new Date(obj.date_of_joining);
    obj.termination_date = new Date(obj.termination_date);

    if(obj.date_of_joining)obj.date_of_joining = obj.date_of_joining.getFullYear() + "-"+((obj.date_of_joining.getMonth() + 1) < 10 ? ('0'+(obj.date_of_joining.getMonth() + 1)) : (obj.date_of_joining.getMonth() + 1))+"-"+obj.date_of_joining.getDate();
    if(obj.termination_date && obj.termination_date !== '')obj.termination_date = obj.termination_date.getFullYear() + "-"+((obj.termination_date.getMonth() + 1) < 10 ? ('0'+(obj.termination_date.getMonth() + 1)) : (obj.termination_date.getMonth() + 1))+"-"+obj.termination_date.getDate();
    if(obj.termination_date && isNaN(obj.termination_date))obj.termination_date = null;
    if(obj.system_access_ip_addresses)obj.system_access_ip_addresses = obj.system_access_ip_addresses.map(it => it.ip);
    //obj.mobile_access_imei = "010934006587651";
    if(obj.logout_inactivity_minutes)obj.logout_inactivity_minutes = parseInt(obj.logout_inactivity_minutes);

    if(obj.access_hours_start_time){
      obj.access_hours_start_time = this.getTwentyFourHourTime(obj.access_hours_start_time);
    }else{
      obj.access_hours_start_time = "00:00" ;
    }
    if(obj.access_hours_end_time){
      obj.access_hours_end_time = this.getTwentyFourHourTime(obj.access_hours_end_time);
    }else{
      obj.access_hours_end_time = "00:00" ;
    }
    if(!obj.desktop_access_mac_address)obj.desktop_access_mac_address = '';
    if(!obj.laptop_access_mac_address)obj.laptop_access_mac_address = '';
    if(!obj.mobile_access_imei)obj.mobile_access_imei = '';
    // obj.date_of_joining = "2010-08-05"
    // obj.termination_date = "2010-08-05"
    // this.accessControl
    // this.contactInformation
    // this.employeeInformation
    this.param.id ? this.editUser(obj) : this.addUser(obj);
    }
  }

   getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
}
  addUser(obj:any){
    this.error = false;
    this.service.createUser(obj).subscribe((res) => {
      if(res.status === "success"){
        this.createUserLoader=false;
        this.error = false;
        this.router.navigate(['/user']);
      }else{
        this.createUserLoader=false;
        if(res.message){
          // let list = []
          // for(var key in res.errors){
          //   let error = {name:key,list:res.errors[key].toString()};
          //   list.push(error);
          // }
         // this.errorMessage = list;
          this.errorMessage = res.message;
          this.openErrorModal();
        }else{
          // this.errorMessage = [{name:"Error",list:[res.code]}];
          this.errorMessage = res.code;
          // this.openErrorModal();
          this.openErrorModal();
        }
        this.error = true;
        //console.log("Something went wrong try again");
      }
    },(error)=>{
      this.createUserLoader=false;
      this.errorMessage = 'Something went wrong try again';
      this.error = true;
    })
  }

  editUser(obj:any){
    this.error = false;
    obj.user_id = this.param.id;
    obj.username = obj.email;
    obj.password = "**********";
    this.service.editUser(obj).subscribe((res) => {
      if(res.status === "success"){
        this.createUserLoader=false;
        this.error = false;
        this.router.navigate(['/user']);
      }else{
        this.createUserLoader=false;
        if(res.errors){
          let list = [];
          for(var key in res.errors){
            let error = {name:key,list:res.errors[key].toString()};
            list.push(error);
          }
          this.errorMessage = list;
          this.openErrorModal();
          // res.errors.non_field_errors.length > 0 ? this.errorMessage = res.errors.non_field_errors[0] : this.errorMessage = 'Something went wrong try again';
          
        }else{
          this.errorMessage = [{name:"Error",list:[res.code]}];
          this.openErrorModal();
        }
        this.error = true;
        //console.log("Something went wrong try again");
      }
    },(error)=>{
      this.createUserLoader=false;
      this.errorMessage = 'Something went wrong try again';
      this.error = true;
    })
  }

  test($event){
   // debugger;
    console.log($event)
  }

  validateEmail(){
    this.isEmailAvailable = false;
    let obj = {
      email: this.contactInformation.controls.email.value
    }
    if(!this.contactInformation.controls.email.valid){
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

  fetchUserDetailsByID(){
    let obj = {
      id: this.param.id
    }
    this.service.fetchUserByID(obj).subscribe((res) => {
      
      if(res.status === "success"){
        this.selectedUser = res.data;

        if(this.param.type === "view"){
          this.employeeInformation.disable();
          this.contactInformation.disable();
          this.accessControl.disable();
        }
        
        this.userID = res.data.user_id;
        this.employeeInformation.controls.first_name.setValue(res.data.first_name);
        this.employeeInformation.controls.last_name.setValue(res.data.last_name);
        
        this.employeeInformation.controls.reporting_to_id.setValue(res.data.reporting_to_id);

        this.employeeInformation.controls.password.setValue("********");
        this.employeeInformation.controls.user_role_id.setValue(res.data.user_role_id);
        this.employeeInformation.controls.employee_type_id.setValue(res.data.employee_type_id);

        this.employeeInformation.controls.date_of_joining.setValue(res.data.date_of_joining);

       if(res.data.termination_date)this.employeeInformation.controls.termination_date.setValue(res.data.termination_date);

        this.employeeInformation.controls.department_id.setValue(res.data.department_id);
        this.employeeInformation.controls.use_client_percentage.setValue(res.data.use_client_percentage);


        this.contactInformation.controls.country_code.setValue(res.data.country_code);
        this.contactInformation.controls.cell_number.setValue(res.data.cell_number);
        this.contactInformation.controls.phone.setValue(res.data.phone);
        this.contactInformation.controls.branch_location_id.setValue(res.data.branch_location_id);
        this.contactInformation.controls.email.setValue(res.data.email);

        this.accessControl.controls.system_access_enabled.setValue(res.data.system_access_enabled);

        this.accessControl.controls.mobile_access_enabled.setValue(res.data.mobile_access_enabled);

        this.accessControl.controls.desktop_access_enabled.setValue(res.data.desktop_access_enabled);

        this.accessControl.controls.mobile_access_imei.setValue(res.data.mobile_access_imei);

        this.accessControl.controls.laptop_access_enabled.setValue(res.data.laptop_access_enabled);

       
        
        this.accessControl.controls.desktop_access_mac_address.setValue(res.data.desktop_access_mac_address);

        this.accessControl.controls.laptop_access_mac_address.setValue(res.data.laptop_access_mac_address);

        if(res.data.access_hours_enabled === false){
          this.disableControls();
        }else{
          
          this.enableControls();
        }
        this.accessControl.controls.access_hours_enabled.setValue(res.data.access_hours_enabled);

        this.accessControl.controls.access_hours_start_time.setValue(res.data.access_hours_start_time);

        this.accessControl.controls.access_hours_end_time.setValue(res.data.access_hours_end_time);

        this.accessControl.controls.access_hours_timezone.setValue(res.data.access_hours_timezone);

        this.accessControl.controls.weekends_access_blocked.setValue(res.data.weekends_access_blocked);

        this.accessControl.controls.logout_inactivity_minutes.setValue(res.data.logout_inactivity_minutes);
        this.accessControl.controls.ip_address_access_enabled.setValue(res.data.ip_address_access_enabled);
        if(res.data.system_access_ip_addresses.length > 0){
          for(var i = 0; i<res.data.system_access_ip_addresses.length; i++){
            const ips = this.accessControl.get('system_access_ip_addresses') as FormArray;
            ips.push(this.fb.group({
              ip:[res.data.system_access_ip_addresses[i].ip_address]
            }));
          }
          
        }else{
          this.accessControl.controls.system_access_ip_addresses.setValue([]);   
        }

        if(res.data.mobile_access_enabled === true){
          this.accessControl.controls.access_type.setValue("mobile");
        }else if(res.data.laptop_access_enabled === true){
          this.accessControl.controls.access_type.setValue("laptop");
        }else if(res.data.desktop_access_enabled === true){
          this.accessControl.controls.access_type.setValue("desktop");
        }

      }else{
        alert(res.code);
      }
    },(error)=>{
      
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
    this.modalRef = this.modalService.show(template, this.confige);
  }
}
