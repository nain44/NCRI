import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-assign-target',
  templateUrl: './assign-target.component.html',
  styleUrls: ['./assign-target.component.scss']
})
export class AssignTargetComponent implements OnInit {
  oneLevelUserList: any = [];
  countryList: any;
  selectedCountry: any = [];

  constructor(
    private service: CommissionService,
    private modalService: BsModalService,
    private router: Router
  ) { }
  tab:string = "employee";
  responseText = [];
  target: string = "set";
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  targetDate: any = {
    startDate: new Date(),
    endDate: new Date()
  }
  loader: boolean = false;
  currentUserID: any = "";
  modalRef: BsModalRef;
  splitTargetAmount: any = 0;
  remainingAmount: any = 0;
  ngOnInit(): void {
    // this.getOneLevelUser();

    let data = localStorage.getItem('details');
    if(data){
      let id = JSON.parse(data).user.id;
      this.currentUserID = id;
    }
  }

  setTab(tab: string) {
    this.tab = tab; 

  }

  changeCountry(value:any){
    this.selectedCountry = value;
  }

  nextStep(){
    this.target = "assign";
    setTimeout(() => {
      this.getOneLevelUser();
    }, 100);
  }

  openErrorModal() {
    this.modalRef = this.modalService.show(this.errorModal);
  }

  onValueChange(event){
    if(event){
      this.targetDate.endDate = new Date(new Date().setMonth((this.targetDate.startDate.getMonth() + 1)));
      this.targetDate.endDate.setDate(event.getDate())
    }
  }

  getOneLevelUser(){
    
    let obj = {
      "level_type": "ONE_LEVEL"
    }
      this.service.fetchUserLevel(obj).subscribe((res) => {
        
        if(res.status === "success"){
          this.oneLevelUserList = res.data.users;
          this.oneLevelUserList.map(it => it.amount = "0");
          this.countryList = res.data.country_codes;
          this.selectedCountry = this.countryList[0];
        }
      },(error) =>{
        
      })
  }

  divideAmount(){
    
    let amount = parseFloat(this.splitTargetAmount) / this.oneLevelUserList.length;
    this.oneLevelUserList.map(it => {
      it.amount = amount;
    });

    this.calculateRemainingAmount();
  }

  calculateRemainingAmount(){
    
    let total = this.oneLevelUserList.map(item => item.amount).reduce((prev, next) => parseFloat(prev) + parseFloat(next));
    
    total ? this.remainingAmount = this.splitTargetAmount - parseFloat(total) : this.remainingAmount = this.splitTargetAmount;
  }

  addTarget(){
    this.loader = true;
    // let childList = [];
    // this.filteredList.map(it => {
    //   let amount = document.getElementById(it.id)['value'];
    //   let obj = {
    //     assigned_to_id: it.id,
    //     target_amount: parseFloat(amount)
    //   }
    //   childList.push(obj);
    // })
    let obj = {
      start_date: this.targetDate.startDate.getFullYear() + "-" + (this.targetDate.startDate.getMonth() + 1) + "-" + this.targetDate.startDate.getDate(),
      end_date: this.targetDate.endDate.getFullYear() + "-" + (this.targetDate.endDate.getMonth() + 1) + "-" + this.targetDate.endDate.getDate(),
      target_amount: parseFloat(this.splitTargetAmount),
      child_targets: this.oneLevelUserList.map(it => Object.assign({}, {assigned_to_id: it.id, target_amount: parseFloat(it.amount)})),
      // "child_targets": [
      //   {
      //     "assigned_to_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      //     "target_amount": 0
      //   }
      // ],
      //parent_target_id: this.currentUserID
      parent_target_id: ""
    }
    this.service.addTarget(obj).subscribe((res) => {
      
      this.responseText = [];
      this.loader = false;
      if(res.status === "error"){
        if(res.errors){
          for(var key in res.errors){
            let obj = {name:key, list:res.errors[key].toString()};
            this.responseText.push(obj);
          }
        }else{
          this.responseText.push({name:"Error", list:res.code});
        }

        this.openErrorModal();
      }else{
        this.router.navigate(['/user']);
      }
      
    },(error) =>{
      
      this.responseText = [];
      this.responseText.push({name:"Error", list:"Sorry something went wrong."});
      this.loader = false;
      this.openErrorModal();
    })
  }

}
