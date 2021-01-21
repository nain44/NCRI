import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PrivilegesStore } from 'src/app/core';
import { CommissionService } from '../service';
@Component({
  selector: 'ncri-update-commission',
  templateUrl: './update-commission.component.html',
  styleUrls: ['./update-commission.component.scss']
})
export class UpdateCommissionComponent implements OnInit {

  radioModel = 'salary';
  breakEvenAmount: string = "";
  radioModelDisabled = 'left';
  @ViewChild('historyModal') historyModal: TemplateRef<any>;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
  commissionID: any = "";
  userDetails: any = {
    user__first_name:"",
    user__last_name: ""
  };
  currencyForm: FormGroup;
  breakEvenPoint: FormGroup;
  currencyCodesList: any = [];
  basePlanList: any[] = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  errorModalRef: BsModalRef;
  errors: any[] = [];
  loader: boolean = false;
  historyPage = 1;
  commissionHistory = [];
  loadMoreHistory = true;
  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private service: CommissionService,
    private fb: FormBuilder,
    private router: Router,
    public privileges: PrivilegesStore
  ) { 

    this.route.params.subscribe(params => {
      this.commissionID = params['id'];
    });

    this.currencyForm = this.fb.group({
      currency_code: ['USD', Validators.required],
      base_salary: [null, Validators.required],
      base_salary_type:['y'],
      salaryOne: [''],
      salaryTwo: [''],
      commissionType:"salary",
      break_even_type:['fs'],

      break_even_times: [''],
      mtd_base_target: [""],
      commission_rate: [""],
      break_even_target:[""]
      // commission_rate: [null, Validators.required],
    });
  }
  closeModal(): void {
    this.modalRef.hide();
    this.commissionHistory = [];
    this.historyPage = 1;
  }

  FetchCommissionCompensationHistory(modal): void {
    modal === 'more' ? modal = 'more' : this.openModal(modal);
    this.loader = true;
    const obj = {
      size: 2,
      page: this.historyPage,
      commission_compensation_id: this.commissionID
    };
    this.service.FetchCommissionCompensationHistory(obj).subscribe((res) => {
      this.loader = false;
      debugger
      this.commissionHistory = [...this.commissionHistory, ...res.data.qs];
      res.data.num_pages === this.historyPage ? this.loadMoreHistory = false : this.historyPage++;
    }, (error) => {
      this.loader = false;
      // debugger
    });
  }

  resetForm(){
    
    this.currencyForm.controls.break_even_times.setValue("");
    this.currencyForm.controls.mtd_base_target.setValue("");
    this.currencyForm.controls.commission_rate.setValue("");
    this.currencyForm.controls.break_even_target.setValue("");
    this.breakEvenAmount = "";
    this.basePlanList = [];
    // setTimeout(() => {
      let val = this.currencyForm.controls.break_even_type.value;
      debugger
      if(this.userDetails.break_even_type === (val === false ? 'ft' : val === true ? 'vt' : val)){
        this.patchValues();
      }
    // }, 100);
    
  }

  ngOnInit(): void {
    // this.fetchUserDetails();
    this.getCurrencyCodes();
    this.fetchCommission();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(this.historyModal,this.config);
  }

  fetchCommission(){
    let obj = {
      // id:"8817560f-0e94-448b-9fdb-846aa7b9f502"
      id:this.commissionID
    }
    this.service.FetchCommissionCompensation(obj).subscribe((res) => {
      if(res.status === "success"){
        this.userDetails = res.data[0];
        this.patchValues();
      }
    },(error) =>{

    })
  }

  patchValues(){
    debugger
    this.userDetails.break_even_type = this.userDetails.break_even_type.toLowerCase();
        this.currencyForm.patchValue(this.userDetails);

        if(this.userDetails.break_even_type === 'fs' || this.userDetails.break_even_type === 'ts'){
          if(this.userDetails.break_even_type === 'ts'){
            this.currencyForm.controls.commission_rate.setValue(this.userDetails.child_break_even_points[0].commission_rate);  
          }
          this.currencyForm.controls.commissionType.setValue('salary');
        }else{
          this.currencyForm.controls.commissionType.setValue('target');
        }

        if(this.userDetails.break_even_type === 'ft'){
          this.currencyForm.controls.break_even_type.setValue(false);
        }else if(this.userDetails.break_even_type === 'vt'){
          this.currencyForm.controls.break_even_type.setValue(true);
        }

        if(this.userDetails.base_salary_type === 'Y'){
          this.currencyForm.controls.salaryOne.setValue(this.userDetails.base_salary);
          this.calculateSalary('y');
        }else{
          this.currencyForm.controls.salaryTwo.setValue(this.userDetails.base_salary);
          this.calculateSalary('m');
        }

        if(this.userDetails.break_even_type === 'fs'){
          this.currencyForm.controls.break_even_times.setValue(this.userDetails.child_break_even_points[0].break_even_times);
          this.currencyForm.controls.commission_rate.setValue(this.userDetails.child_break_even_points[0].commission_rate);
          this.calculateAmount();
        }else{
          this.basePlanList = this.userDetails.child_break_even_points;
        }
  }

  fetchUserDetails(){
    let obj = {
      id: this.commissionID
    }
   this.service.fetchUserDetailsByID(obj).subscribe((res) => {
    if(res.status === 'success'){
      this.userDetails = res.data;
    }
   },(error) =>{

   })
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

  //switching salary
  calculateSalary(type:any){
    if(type === "m"){
      if(this.currencyForm.controls.salaryTwo.value){
        let amount = parseFloat((parseFloat(this.currencyForm.controls.salaryTwo.value) * 12).toFixed(2));
        this.currencyForm.controls.salaryOne.setValue(amount)
      }
      
    }else if(type === "y"){
      if(this.currencyForm.controls.salaryOne.value){
        let amount = parseFloat((parseFloat(this.currencyForm.controls.salaryOne.value) / 12).toFixed(2));
        this.currencyForm.controls.salaryTwo.setValue(amount)
      }
      
    }
  }

  disableField(){
    
    if(this.currencyForm.controls.salaryOne.value){
      this.currencyForm.controls.base_salary.setValue(this.currencyForm.controls.salaryOne.value);
      this.currencyForm.controls.base_salary_type.setValue('Y');

    }else if(this.currencyForm.controls.salaryTwo.value){
      this.currencyForm.controls.base_salary.setValue(this.currencyForm.controls.salaryTwo.value);
      this.currencyForm.controls.base_salary_type.setValue('M');
    }
  }

  calculateAmount(){
    if(this.currencyForm.controls.salaryTwo.value){
      let amount = parseFloat(this.currencyForm.controls.salaryTwo.value) * parseFloat(this.currencyForm.controls.break_even_times.value);
      this.breakEvenAmount = amount.toString();
    }
    let obj = {
      break_even_times:this.currencyForm.controls.break_even_times.value,
      commission_rate: this.currencyForm.controls.commission_rate.value,
      break_even_target:"0.0",
      mtd_base_target:0
    }

    this.basePlanList = [obj];
    // if(!this.checkForDuplicateForFS(obj)){
    //   this.basePlanList.push(obj);
    // }
    
  }


  AddToList(){
    if(this.currencyForm.controls.break_even_times.value && this.currencyForm.controls.mtd_base_target.value){
      // this.basePlanList = [];
      let obj = {
        break_even_times:this.currencyForm.controls.break_even_times.value,
        mtd_base_target: parseInt(this.currencyForm.controls.mtd_base_target.value),
        break_even_target:'0.0',
        commission_rate:this.currencyForm.controls.commission_rate.value
      }
      if(!this.checkForDuplicate(obj)){
        this.basePlanList.push(obj)
      }
      
      this.currencyForm.controls.break_even_times.setValue("");
      this.currencyForm.controls.mtd_base_target.setValue("");
      this.currencyForm.controls.commission_rate.setValue("");
    }
  }

  addTargetList(){
    if(this.currencyForm.controls.break_even_target.value && this.currencyForm.controls.commission_rate.value){
      // this.basePlanList = [];
      let obj = {
        break_even_target:this.currencyForm.controls.break_even_target.value,
        commission_rate: this.currencyForm.controls.commission_rate.value,
        mtd_base_target:0,
        break_even_times:0
      }
      if(!this.checkForDuplicateTarget(obj)){
        this.basePlanList.push(obj)
      }
      
      this.currencyForm.controls.break_even_target.setValue("");
      this.currencyForm.controls.commission_rate.setValue("");
    }
  }
  checkForDuplicateTarget(obj:any){
    let check = this.basePlanList.some(it => it.break_even_target === obj.break_even_target && it.commission_rate === obj.commission_rate);
    return check;
}


  changeType(){
    
    if(this.currencyForm.controls.commissionType.value === "salary"){
      this.currencyForm.controls.break_even_type.setValue('fs')
    }else{
      this.currencyForm.controls.break_even_type.setValue(false)
    }
    this.resetForm();
    // this.patchValues();
  }
  checkForDuplicate(obj:any){
      let check = this.basePlanList.some(it => it.break_even_times === obj.break_even_times && it.mtd_base_target === obj.mtd_base_target);
      return check;
  }

  editCommission(){
    
    this.basePlanList
    this.currencyForm.value;

    let obj = Object.assign({}, this.currencyForm.value)
    //changing break_even_type status
    obj.break_even_type === false ?
    obj.break_even_type = 'ft' : obj.break_even_type === true ? obj.break_even_type = 'vt' : ""
    obj.child_break_even_points = this.basePlanList;
    obj.user_id = this.userDetails.user_id;
    obj.base_salary = parseInt(obj.base_salary);

    let h = {
      currency_code:obj.currency_code,
      base_salary: obj.base_salary,
      base_salary_type: obj.base_salary_type,
      break_even_type: obj.break_even_type.toLocaleUpperCase(),
      user_id: obj.user_id,
      child_break_even_points: obj.child_break_even_points,
      id: this.commissionID,
      // edit_and_approve
    }

    this.updateCommission(h);

  }

  updateCommission(obj){
    this.loader = true;
    if(this.privileges.privilegeHash['ccm.views.ApproveMultipleCommissionCompensation']['c'] &&
    this.privileges.privilegeHash['ccm.views.EditCommissionCompensation']['m']){
      obj.edit_and_approve = true;
    }
    
    this.service.updateCommissionCompensation(obj).subscribe((res) => {
      this.loader = false;
      if(res.status === "success"){
        this.router.navigate(['/commission']);
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
      this.loader = false;
    })
  }

  openErrorModal(){
    this.errorModalRef = this.modalService.show(this.errorModal);
  }
}
