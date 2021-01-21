import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommissionService } from '../service';


var __this;

@Component({
  selector: 'ncri-assign-multi-target',
  templateUrl: './assign-multi-target.component.html',
  styleUrls: ['./assign-multi-target.component.scss']
})
export class AssignMultiTargetComponent implements OnInit {
  selectedCountry: string = "";
  Collapses: string = "";
  selectedBranch: string = ""
  targetAmount: any = 0;
  remainingAmount: any = 0;
  target: string = "set";
  responseText = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  modalRef: BsModalRef;
  branchList = [];
  treeList: any = [];
  countryList: any = [];
  filteredList: any = [];
  targetDate: any = {
    startDate: new Date(),
    endDate: new Date()
  }
  loader: boolean = false;
  currentUserID: any = "";
  constructor(
    private service: CommissionService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getMultiLevelUser();
    __this = this;
    let data = localStorage.getItem('details');
    if(data){
      let id = JSON.parse(data).user.id;
      this.currentUserID = id;
    }
    
  }
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
  openErrorModal() {
    this.modalRef = this.modalService.show(this.errorModal);
  }

  onValueChange(event){
    if(event){
      this.targetDate.endDate = new Date(new Date().setMonth((this.targetDate.startDate.getMonth() + 1)));
      this.targetDate.endDate.setDate(event.getDate())
    }
  }

  nextStep(){
    this.target = "assign";
    setTimeout(() => {
      this.getMultiLevelUser();
    }, 100);
  }

  addTarget(){
    this.loader = true;
    let childList = [];
    this.filteredList.map(it => {
      let amount = document.getElementById(it.id)['value'];
      let obj = {
        assigned_to_id: it.id,
        target_amount: parseFloat(amount)
      }
      childList.push(obj);
    })
    let obj = {
      start_date: this.targetDate.startDate.getFullYear() + "-" + (this.targetDate.startDate.getMonth() + 1) + "-" + this.targetDate.startDate.getDate(),
      end_date: this.targetDate.endDate.getFullYear() + "-" + (this.targetDate.endDate.getMonth() + 1) + "-" + this.targetDate.endDate.getDate(),
      target_amount: parseFloat(this.targetAmount),
      child_targets: childList,
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


  // setTab(tab: string) {
  //   this.tab = tab;
  // }

  getMultiLevelUser() {
    let obj = {
      "level_type": "MULTIPLE_LEVEL"
    }
    this.service.fetchUserLevel(obj).subscribe((res) => {
      
      if (res.status === "success") {
        this.branchList = res.data.branch_location__addresses;
        this.branchList.sort((a, b) =>  a.localeCompare(b));
        this.selectedBranch = this.branchList[0];

        this.countryList = res.data.country_codes;
        this.selectedCountry = this.countryList[0];

        let list = res.data.users;
        // let obj = Object.assign({}, res.data.users[0]);
        // obj.grade = 1;
        // list.unshift(obj);


        // let obj1 = Object.assign({}, res.data.users[0]);
        // obj1.grade = 2;
        // list.unshift(obj1);

        // let objr = Object.assign({}, res.data.users[0]);
        // objr.grade = 2;
        // list.unshift(objr);

        // let obj2 = Object.assign({}, res.data.users[0]);
        // obj2.grade = 3;
        // list.unshift(obj2);

        // let sds = Object.assign({}, res.data.users[0]);
        // sds.grade = 3;
        // list.unshift(sds);

        // let cvcx = Object.assign({}, res.data.users[0]);
        // cvcx.grade = 3;
        // list.unshift(cvcx);

        // let obj3 = Object.assign({}, res.data.users[0]);
        // obj3.grade = 4;
        // list.unshift(obj3);

        // let xcwe = Object.assign({}, res.data.users[0]);
        // xcwe.grade = 5;
        // list.unshift(xcwe);


        list.sort((a, b) => parseFloat(a.grade) - parseFloat(b.grade));

        this.treeList = list;

        this.filterData();
      //  this.renderDOM(this.treeList);

        // let finalList = [];
        // for(var i = 0; i<list.length; i++){
        //   let index = finalList.length - 1;
        //   if(index !== -1){
        //     if(list[i].grade > list[index].grade){
        //       list[index].child = [];
        //       list[index].child.push(list[i]);
        //     }else{
        //       finalList.push(list[i]);
        //     }
        //   }else{
        //     finalList.push(list[i]);
        //   }
        // }
        console.log(list)
      }
    }, (error) => {
      
    })
  }

  modelChanged(event?: any) {
    
    let total = 0;
    __this.filteredList.map(it => {
      let domElement = document.getElementById(it.id);
      domElement['value'] ? total += parseFloat(domElement['value']) : "";
    });

    __this.remainingAmount = (parseFloat(__this.targetAmount) - total);

    if (__this.remainingAmount < 0) {
      __this.changeAmount();
    }

  }

  changeAmount() {
    
    let amount = parseFloat(this.targetAmount) / this.filteredList.length;
    let total = 0;
    this.filteredList.map(it => {
      let domElement = document.getElementById(it.id);
      domElement['value'] = amount;
      total += amount;
    });

    this.remainingAmount = (parseFloat(this.targetAmount) - total);
  }

  renderDOM(list:any){
 // let mainParent = document.getElementById('mainTree');
 
 let lastParent = "mainTree";
 let lastNode = document.getElementById(lastParent).children[1];
 if(lastNode){
   lastNode.remove();
 }
 let lastGrade = 0;
 for (var i = 0; i < list.length; i++) {
   list[i].amount = 0;

   if (list[i].grade === lastGrade) {
     let p = document.getElementById("independent" + (list[i].grade));
     let li = document.createElement("li");
     li.innerHTML = `
       
       <div>
           <div class="row">
               <div class="col-md-11">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group"> 
                              <input type="text" readonly  class="form-control pointer-none" value="Level ${list[i].grade}"> 
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group"> 
                              <input type="text" style="padding-left:calc(2rem - ${(list[i].grade)}rem);" id="${list[i].id}"  class="form-control pointer-none" value="Level ${list[i].grade}" > 
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group"> 
                              <input type="text" style="padding-left:calc(2rem + (${(list[i].grade)}rem - (${(list[i].grade)}rem / 2)));" id="${list[i].id}"  class="form-control pointer-none" value="Level ${list[i].grade}" > 
                          </div>
                      </div>
                  </div> 
               </div>
           </div>
       </div>
   
       `
     //li.innerText = list[i].first_name + " " + list[i].last_name;
     p.append(li);
     document.getElementById(list[i].id).addEventListener('keyup', this.modelChanged);
   } else {

     let html = `<ul class="collapsed in" id=${'independent' + (list[i].grade)}>
       <li class="nested"> 
       <i class="indicator" (click)="setCollaps(${'parent' + (i + 1)})"></i>
           <div class="row">
               <div class="col-md-11">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group"> 
                              <input type="text" readonly class="form-control pointer-none" value="Level ${list[i].grade}" > 
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group"> 
                              <input style="padding-left:calc(2rem - ${(list[i].grade)}rem);" id="${list[i].id}" type="text" class="form-control pointer-none"  value="Level ${list[i].grade}" > 
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group"> 
                              <input style="padding-left:calc(2rem + (${(list[i].grade)}rem - (${(list[i].grade)}rem / 2)));" id="${list[i].id}" type="text" class="form-control pointer-none"  value="Level ${list[i].grade}" > 
                          </div>
                      </div>
                  </div>
               </div>
           </div>
           <ul class="collapsed in" id=${'parent' + (i + 1)}></ul>
       
   </li>
       </ul>`;
     //   let html = `<ul id=${'independent'+ (list[i].grade)}>
     //   <li>
     //     ${list[i].first_name + " " + list[i].last_name}
     //     <ul id=${'parent'+(i + 1)}></ul>
     //   </li>
     // </ul>`;
     let p = document.getElementById(lastParent);
     let tag = document.createElement('div');
     tag.innerHTML = html;
     p.append(tag);
     lastParent = 'parent' + (i + 1);
     lastGrade = list[i].grade;

     document.getElementById(list[i].id).addEventListener('keyup', this.modelChanged);
   }
 }
  }

  filterData(){
    
    let list = this.treeList.filter(it => it.country_code === this.selectedCountry && it.branch_location__address === this.selectedBranch);
    this.filteredList = list;
    this.renderDOM(list);
    // this.changeBranch(this.branchList[0]);
  }

  changeBranch(branch:any){
   this.selectedBranch = branch;
   this.filterData();
  }

  changeCountry(value:any){
    this.selectedCountry = value;
    this.changeBranch(this.selectedBranch);
  }

}
