import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {
  switchBreakEvenView: string = '';
  breakEvenModel:string = "";
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  commissionType: any = "";
  modalRef: BsModalRef;
  userDetails: any = {
    first_name: "",
    last_name:"",
    employee_type_id: "",
    branch_location_id: "",
    grade:""
  };

  loader: boolean = false;

  currencyCodesList: any = [];
  currencyForm: FormGroup;
  breakEvenPoint: FormGroup;
  compensationID: string = "";
  breakEvenList: any[] = [];
  edit: boolean = false;
  selectedOBJ: any;
  breakEvenCheck:string = "";
  userID: any = "";
  responseText: any = "";
  deleteLoader: boolean = false;
  constructor(
    private service: CommissionService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.userID = params?.userID ? params?.userID : "";
      this.userID === "" ? this.router.navigate(['/user']) : "";
    });


    this.currencyForm = this.fb.group({
      currency_code: ['USD', Validators.required],
      base_salary: [null, Validators.required],
      base_salary_type:['y'],
      salaryOne: [''],
      salaryTwo: [''],
      // commission_rate: [null, Validators.required],
    });

    this.breakEvenPoint = this.fb.group({
      break_even_times: [''],
      mtd_base_target: [""],
      commission_rate: [""],
      break_even_target:[""]
    });
  }

  disableField(){
    
    if(this.currencyForm.controls.salaryOne.value){
      this.currencyForm.controls.base_salary.setValue(this.currencyForm.controls.salaryOne.value);
      this.currencyForm.controls.base_salary_type.setValue('Y');
      // this.currencyForm.controls.salaryTwo.disable();

    }else if(this.currencyForm.controls.salaryTwo.value){
      this.currencyForm.controls.base_salary.setValue(this.currencyForm.controls.salaryTwo.value);
      this.currencyForm.controls.base_salary_type.setValue('M');
      // this.currencyForm.controls.salaryOne.disable();
    }else{
      this.currencyForm.controls.salaryTwo.enable();
      this.currencyForm.controls.salaryOne.enable();
    }
  }

  calculateAmount(){
    if(this.currencyForm.controls.base_salary.value && this.breakEvenPoint.controls.break_even_times.value){
      return parseFloat(this.currencyForm.controls.base_salary.value) * parseFloat(this.breakEvenPoint.controls.break_even_times.value);
    }else{
      return 0
    }
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getCurrencyCodes();
  }

  getUserDetails() {
    this.service.fetchUserDetailsByID({id:this.userID}).subscribe((res) => {
      if(res.status === "success"){
        this.userDetails = res.data;
      }
    },(error) => {

    })
    // let userData: any = localStorage.getItem('details');
    // if (userData !== null) {
    //   userData = JSON.parse(localStorage.getItem('details'));
    //   this.userDetails.name = userData.user.first_name + " " + userData.user.last_name;
    //   this.userDetails.type = userData.user.employee_type_id;
    //   this.userDetails.grade = userData.user.user_role_id;
    //   this.userDetails.branchLocation = userData.user.branch_location_id;
    //   this.userDetails.userID = userData.user.id;
    // }
  }

  getCurrencyCodes() {
    this.service.getCurrencyCode().subscribe((res) => {

      if (res.status === "success") {
        for (var key in res.data) {
          this.currencyCodesList.push(key);
        }
      }
      console.log(this.currencyCodesList);
    }, (error) => {

    })
  }


  addCompensation(type: string) {
    this.breakEvenList = [];
    this.breakEvenPoint.reset();
    this.edit = false;
    this.switchBreakEvenView = "";
    let obj = Object.assign(this.currencyForm.getRawValue(), {});
    obj.base_salary = parseInt(obj.base_salary)
    obj.user_id = this.userDetails.id;
    obj.break_even_type = type.toUpperCase();
    this.service.addCompensation(obj).subscribe((res) => {
      if (res.status === "error") {
        this.switchBreakEvenView = "";
        this.compensationID = "";
        alert("Sorry something wen wrong.");
        this.breakEvenCheck = "";
      } else {
        this.switchBreakEvenView = type;
        // this.breakEvenCheck = type === 'f' ? 'flat' : 'tier';
        this.breakEvenCheck = type;
        this.compensationID = res.data.id;

        //disabling fields
        this.currencyForm.controls.base_salary.disable();
        this.currencyForm.controls.currency_code.disable();
        this.currencyForm.controls.salaryOne.disable();
        this.currencyForm.controls.salaryTwo.disable();
        // this.currencyForm.controls.commission_rate.disable();
      }

    }, (error) => {
      this.compensationID = "";
      this.switchBreakEvenView = '';
    })
  }

  switchView(type){
    this.switchBreakEvenView = type;
    this.breakEvenList = [];
    this.breakEvenPoint.reset();
  }

  onBlur(){
    debugger
    if(this.breakEvenList.length === 0){
      if(this.breakEvenPoint.controls.break_even_times.value && this.breakEvenPoint.controls.commission_rate.value){
        this.addBreakEvenPoint(this.breakEvenPoint.value);
      }
    }
  }

  addBreakEvenPoint(form: any) {
    
    if(this.switchBreakEvenView === "ts"){
      form.mtd_base_target = parseFloat(form.mtd_base_target);
      form.commission_rate = parseFloat(form.commission_rate);
    }else{
      form.mtd_base_target = 0;
    }

    form.break_even_target = 0;
    this.breakEvenList.unshift(form);
    this.breakEvenPoint.reset();
    // this.loader = true;
    // this.responseText = "";
    // form.commission_compensation_id = this.compensationID;
   

    // if(this.switchBreakEvenView === "ts"){
    //   form.mtd_base_target = parseFloat(form.mtd_base_target);
    //   form.commission_rate = parseFloat(form.commission_rate);
    // }else{
    //   form.mtd_base_target = 0;
    // }


    
    // form.break_even_target = 0;
    // // form.mtd_base_target = this.switchBreakEvenView === 't' ? parseInt(form.mtd_base_target) : 0;
    // // form.break_even_target = 0;
    // this.service.addBreakEven(form).subscribe((res) => {
    //   //debugger
    //   if (res.status === "error") {
    //     // alert("Sorry something went wrong");
    //     if(res.errors){
    //       let list = [];
    //       for(var key in res.errors){
    //         list.push({name: key, list:res.errors[key].toString()})
    //       }
    //       this.responseText = list;
    //       this.openModal();
    //     }
        
    //   } else {
    //     // let obj = {
    //     //   id: res.data.id,
    //     //   break_even_times: form.break_even_times,
    //     //   mtd_base_target: form.mtd_base_target
    //     // }
    //     form.id = res.data.id;
    //     this.breakEvenList.unshift(form);
    //     this.breakEvenPoint.reset();
    //     this.breakEvenModel = "";
    //   }
    //   this.loader = false;
    // }, (error) => {
    //   //debugger
    //   this.loader = false;
    // })
  }

  deleteBreakEvenPoint() {
    // let obj = {
    //   id: this.selectedOBJ.id
    // }
    let i = this.breakEvenList.indexOf(this.selectedOBJ);
        i !== -1 ? this.breakEvenList.splice(i, 1) : "";
        this.modalRef.hide();

    // this.deleteLoader = true;
    // this.service.deleteBreakEven(obj).subscribe((res) => {

    //   if (res.status === "error") {
    //     // alert("Could not delete event point");
    //     this.responseText = "Could not delete event point";
    //   } else {
    //     let i = this.breakEvenList.indexOf(this.selectedOBJ);
    //     i !== -1 ? this.breakEvenList.splice(i, 1) : "";
    //     this.modalRef.hide();
    //   }
    //   this.deleteLoader = false;
    // }, (error) => {
    //   this.deleteLoader = false;
    //   this.responseText = "Could not delete event point";
    // })
  }

  // confirmDelete(obj: any, index: any) {
  //   let check = confirm("Are you sure you want to delete this even point");
  //   check === true ? this.deleteBreakEvenPoint(obj.id, index) : "";
  // }

  viewEdit(obj: any) {
    this.edit = true;
    this.selectedOBJ = obj;

    this.breakEvenPoint.controls.break_even_times.setValue(obj.break_even_times);
    this.breakEvenPoint.controls.mtd_base_target.setValue(obj.mtd_base_target);

    this.breakEvenPoint.controls.commission_rate.setValue(obj.commission_rate);
    // this.breakEvenPoint.controls.break_even_target.setValue(obj.break_even_times);
  }

  calculateSalary(type:any){
    if(type === "m"){
      if(this.currencyForm.controls.salaryTwo.value){
        let amount = parseFloat(this.currencyForm.controls.salaryTwo.value) * 12;
        this.currencyForm.controls.salaryOne.setValue(amount)
      }
      
    }else if(type === "y"){
      if(this.currencyForm.controls.salaryOne.value){
        let amount = parseFloat(this.currencyForm.controls.salaryOne.value) / 12
        this.currencyForm.controls.salaryTwo.setValue(amount)
      }
      
    }
  }

  // updateBreakEvenPoint(form: any) {
  //   this.loader = true;
  //   form.commission_compensation_id = this.compensationID;
  //   form.mtd_base_target = parseInt(form.mtd_base_target);
  //   form.break_even_target = 0;
  //   form.id = this.selectedOBJ.id;

  //   this.service.updateBreakEven(form).subscribe((res) => {
  //     if (res.status === "error") {
  //       alert("Sorry something went wrong");
  //     } else {
  //       let i = this.breakEvenList.findIndex(it => it.id === form.id);
  //       i !== -1 ? this.breakEvenList[i] = form : "";
  //       this.breakEvenPoint.reset();
  //     }
  //     this.loader = false;
  //     this.edit = false;
  //   }, (error) => {
  //     this.loader = false;
  //     this.edit = false;
  //   })
  // }

  updateBreakEvenPoint(form: any) {
    // this.loader = true;
    // this.responseText = "";
    // form.commission_compensation_id = this.compensationID;
    
    form.id = this.selectedOBJ.id;

    if(this.switchBreakEvenView === "ts"){
      form.mtd_base_target = parseFloat(form.mtd_base_target);
      form.commission_rate = parseFloat(form.commission_rate);
    }else{
      form.mtd_base_target = 0;
    }
    
    form.break_even_target = 0;

    let i = this.breakEvenList.findIndex(it => it.id === form.id);
        i !== -1 ? this.breakEvenList[i] = form : "";
        this.breakEvenPoint.reset();
        this.edit = false;

    // // form.mtd_base_target = this.switchBreakEvenView === 't' ? parseInt(form.mtd_base_target) : 0;
    // // form.break_even_target = 0;
    // this.service.updateBreakEven(form).subscribe((res) => {
    //   //debugger
    //   if (res.status === "error") {
    //     // alert("Sorry something went wrong");
    //     if(res.errors){
    //       let list = [];
    //       for(var key in res.errors){
    //         list.push({name: key, list:res.errors[key].toString()})
    //       }
    //       this.responseText = list;
    //       this.openModal();
    //     }
        
    //   } else {
    //     // let obj = {
    //     //   id: res.data.id,
    //     //   break_even_times: form.break_even_times,
    //     //   mtd_base_target: form.mtd_base_target
    //     // }
        
    //     let i = this.breakEvenList.findIndex(it => it.id === form.id);
    //     i !== -1 ? this.breakEvenList[i] = form : "";
    //     this.breakEvenPoint.reset();
    //     this.edit = false;
    //   }
    //   this.loader = false;
    // }, (error) => {
    //   //debugger
    //   this.loader = false;
    // })
  }

  addCommissionCompensation(){
    
    let obj = {
      "currency_code": this.currencyForm.controls.currency_code.value,
      "base_salary": parseFloat(this.currencyForm.controls.base_salary.value),
      "base_salary_type": this.currencyForm.controls.base_salary_type.value,
      "break_even_type": this.switchBreakEvenView.toUpperCase(),
      "user_id": this.userID,
      "child_break_even_points": this.breakEvenList
    }
    this.loader = true;
    this.service.addCompensationFlow(obj).subscribe((res) =>{
      debugger
      this.loader = false;
      if(res.status === "success"){
        this.router.navigate(['/commission/detail']);
      }else{
        if (res.errors) {
          let list = [];
          for (var key in res.errors) {
            list.push({ name: key, list: res.errors[key].toString() })
          }
          this.responseText = list;
          
        }else{
          this.responseText = [{name:"Error", list: res.code}];
        }

        this.openModal();
      }
      
    },(error) => {
      debugger
      this.loader = false;
      this.responseText = [{name:"Error", list: "Sorry something went wrong try again later"}];
      this.openModal();
    })
  }

  openDeleteModal(template:any,obj?:any){
    this.selectedOBJ = obj;
    this.modalRef = this.modalService.show(template);
  }

  openModal() {
    this.modalRef = this.modalService.show(this.errorModal);
  }
}
