import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-edit-commission',
  templateUrl: './edit-commission.component.html',
  styleUrls: ['./edit-commission.component.scss']
})
export class EditCommissionComponent implements OnInit {

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
  commissionID: any = "";
  isEdit: any = "";
  
  @ViewChild('historyModal') historyModal: TemplateRef<any>;
  historyPage = 1;
  commissionHistory = [];
  loadMoreHistory = true;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
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
      this.commissionID = params?.cid ? params?.cid : "";
      this.isEdit = params?.type ? params?.type : "";
      // if(this.userID === "" || this.commissionID === ""){
      //   this.router.navigate(['/detail'])
      // }
    });


    this.currencyForm = this.fb.group({
      currency_code: ['USD', Validators.required],
      base_salary: [null, Validators.required],
      base_salary_type:['y'],
      salaryOne: [''],
      salaryTwo: [''],
    });

    this.breakEvenPoint = this.fb.group({
      break_even_times: [''],
      mtd_base_target: [""],
      commission_rate: [""],
      break_even_target:[""]
    });
  }
  closeModal(): void {
    this.modalRef.hide();
    this.commissionHistory = [];
    this.historyPage = 1;
  }

  FetchCommissionCompensationHistory(modal): void {
    modal === 'more' ? modal = 'more' : this.openModalHistory();
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

  disableField(){
    
    if(this.currencyForm.controls.salaryOne.value){
      this.currencyForm.controls.base_salary.setValue(this.currencyForm.controls.salaryOne.value);
      this.currencyForm.controls.base_salary_type.setValue('Y');

    }else if(this.currencyForm.controls.salaryTwo.value){
      this.currencyForm.controls.base_salary.setValue(this.currencyForm.controls.salaryTwo.value);
      this.currencyForm.controls.base_salary_type.setValue('M');
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
    this.fetchCommissionDetailByID();
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

  switchView(type){
    this.switchBreakEvenView = type;
    this.breakEvenList = [];
    this.breakEvenPoint.reset();
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
  }

  deleteBreakEvenPoint() {
    let i = this.breakEvenList.indexOf(this.selectedOBJ);
        i !== -1 ? this.breakEvenList.splice(i, 1) : "";
        this.modalRef.hide();
  }

  viewEdit(obj: any) {
    this.edit = true;
    this.selectedOBJ = obj;

    this.breakEvenPoint.controls.break_even_times.setValue(obj.break_even_times);
    this.breakEvenPoint.controls.mtd_base_target.setValue(obj.mtd_base_target);

    this.breakEvenPoint.controls.commission_rate.setValue(obj.commission_rate);
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

  updateBreakEvenPoint(form: any) {
    
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
  }

  updateCommission(){
    
    let obj = {
      "id": this.commissionID,
      "currency_code": this.currencyForm.controls.currency_code.value,
      "base_salary": parseFloat(this.currencyForm.controls.base_salary.value),
      "base_salary_type": this.currencyForm.controls.base_salary_type.value,
      "break_even_type": this.switchBreakEvenView.toUpperCase(),
      "user_id": this.userID,
      "child_break_even_points": this.breakEvenList
    }
    this.loader = true;
    this.service.updateCommissionCompensation(obj).subscribe((res) =>{
      //debugger
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
      //debugger
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
  openModalHistory(): void {
    this.modalRef = this.modalService.show(this.historyModal, this.config);
  }

  fetchCommissionDetailByID(){
    let obj = {
      id: this.commissionID
    }
    this.service.fetchCommissionDetailByID(obj).subscribe((res) => {
      //debugger
      if(res.status === "success"){
        let data = res?.data[0];
        this.breakEvenCheck = data.break_even_type.toLowerCase();
        this.switchView(this.breakEvenCheck);

        this.currencyForm.controls.currency_code.setValue(data.currency_code);
        this.currencyForm.controls.base_salary.setValue(data.base_salary);
        this.currencyForm.controls.base_salary_type.setValue(data.base_salary_type);

        if(data.base_salary_type.toLowerCase() === "y"){
          this.currencyForm.controls.salaryOne.setValue(data.base_salary);
        }else{
          this.currencyForm.controls.salaryTwo.setValue(data.base_salary);
        }

        this.calculateSalary(data.base_salary_type.toLowerCase());

        this.breakEvenList = data.child_break_even_points;
        
        if(this.breakEvenCheck === "fs" || this.breakEvenCheck === "ts"){
          this.commissionType = "salary";
        }else if(this.breakEvenCheck === "ft" || this.breakEvenCheck === "vt"){
          this.commissionType = "target";
        }

        
        

        // this.currencyForm = this.fb.group({
        //   currency_code: ['USD', Validators.required],
        //   base_salary: [null, Validators.required],
        //   base_salary_type:['y'],
        //   salaryOne: [''],
        //   salaryTwo: [''],
        // });
    
        // this.breakEvenPoint = this.fb.group({
        //   break_even_times: [''],
        //   mtd_base_target: [""],
        //   commission_rate: [""],
        //   break_even_target:[""]
        // });
      }
    }, (error) =>{
      //debugger
    })
  }

}
