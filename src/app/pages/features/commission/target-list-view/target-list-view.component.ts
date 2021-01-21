import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommissionService } from '../service';
var __this;
@Component({
  selector: 'ncri-target-list-view',
  templateUrl: './target-list-view.component.html',
  styleUrls: ['./target-list-view.component.scss']
})
export class TargetListViewComponent implements OnInit {
  loaderText: string = '';
  selectedCountry: string = '';
  selectedBranch: any = [];
  isDisabled: boolean = false;
  targetAmount: any = 0;
  remainingAmount: any = 0;
  target: string = 'assign';
  responseText = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  modalRef: BsModalRef;
  startDate = new Date();
  endDate = new Date();
  branchList = [];
  treeList: any = [];
  countryList: any = [];
  filteredList: any = [];
  targetDate: any = {
    startDate: new Date(),
    endDate: new Date()
  };
  loader: boolean = false;
  currentUserID: any = '';
  userLoader: any;
  copyList: any = [];

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };
  dateRange: Date[];
  constructor(
    private service: CommissionService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.setDate();
  }

  ngOnInit(): void {
    // this.getMultiLevelUser();
    __this = this;
    const data = localStorage.getItem('details');
    if (data) {
      const id = JSON.parse(data).user.id;
      this.currentUserID = id;
    }

    // this.getMultiLevelUser();

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
    this.modalRef = this.modalService.show(this.errorModal,this.config);
  }

  onValueChange(event) {
    if (event) {
      
      // this.targetDate.endDate = new Date(new Date().setMonth((this.targetDate.startDate.getMonth() + 1)));
      // this.targetDate.endDate.setDate(event.getDate());
      this.startDate = this.dateRange[0];
      this.endDate = this.dateRange[1];
      this.getMultiLevelUser();
    }
  }

  nextStep() {
    this.target = 'assign';
    setTimeout(() => {

      this.filterData();
    }, 100);
  }

  addTarget() {
    this.loader = true;
    const childList = [];
    this.filteredList.map(it => {
      const amount = document.getElementById(it.id)['value'];
      const obj = {
        assigned_to_id: it.id,
        target_amount: parseFloat(amount)
      };
      childList.push(obj);
    });
    const obj = {
      start_date: this.targetDate.startDate.getFullYear() + '-' + (this.targetDate.startDate.getMonth() + 1) + '-' + this.targetDate.startDate.getDate(),
      end_date: this.targetDate.endDate.getFullYear() + '-' + (this.targetDate.endDate.getMonth() + 1) + '-' + this.targetDate.endDate.getDate(),
      target_amount: parseFloat(this.targetAmount),
      child_targets: childList,
      // "child_targets": [
      //   {
      //     "assigned_to_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      //     "target_amount": 0
      //   }
      // ],
      //parent_target_id: this.currentUserID
      parent_target_id: ''
    };
    this.service.addTarget(obj).subscribe((res) => {

      this.responseText = [];
      this.loader = false;
      if (res.status === 'error') {
        if (res.errors) {
          for (var key in res.errors) {
            const obj = { name: key, list: res.errors[key].toString() };
            this.responseText.push(obj);
          }
        } else {
          this.responseText.push({ name: 'Error', list: res.code });
        }

        this.openErrorModal();
      } else {
        this.router.navigate(['/user']);
      }

    }, (error) => {

      this.responseText = [];
      this.responseText.push({ name: 'Error', list: 'Sorry something went wrong.' });
      this.loader = false;
      this.openErrorModal();
    });
  }


  setDate() {
    
    const end: any = new Date().setMonth(this.startDate.getMonth() + 1);
    this.endDate = new Date(end);
    this.dateRange = [this.startDate, this.endDate];
  }


  // setTab(tab: string) {
  //   this.tab = tab;
  // }

  getMultiLevelUser(): void {
    
    this.loaderText = '';
    this.userLoader = true;
    const start = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
    const end = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + this.endDate.getDate();
    const obj = {
      start_date: start,
      end_date: end
    };
    this.service.fetchTargetListData(obj).subscribe((res) => {
      this.userLoader = false;
      if (res.status === 'success') {
        this.branchList = res.data.branch_location__addresses;
        this.branchList.sort((a, b) => a.localeCompare(b));
        // this.selectedBranch = this.branchList[0];

        this.countryList = res.data.country_codes;
        // this.selectedCountry = this.countryList[0];

        const list = res.data.users_hierarchy;
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

        this.copyList = list;
        this.treeList = list;
        // this.treeList = [];
        this.treeList.length > 0 ? this.isDisabled = false : this.isDisabled = true;


        // this.renderDOM(this.treeList);

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
        console.log(list);
      } else {
        this.loaderText = 'No Record Found';
      }
    }, (error) => {
      this.loaderText = 'No Record Found';
      this.userLoader = false;
    });
  }

  modelChanged(event?: any) {

    let total = 0;
    __this.filteredList.map(it => {
      const domElement = document.getElementById(it.id);
      domElement['value'] ? total += parseFloat(domElement['value']) : '';
    });

    __this.remainingAmount = (parseFloat(__this.targetAmount) - total);

    if (__this.remainingAmount < 0) {
      __this.changeAmount();
    }

  }

  changeAmount() {

    const amount = parseFloat(this.targetAmount) / this.filteredList.length;
    let total = 0;
    this.filteredList.map(it => {
      const domElement = document.getElementById(it.id);
      domElement['value'] = amount;
      total += amount;
    });

    this.remainingAmount = (parseFloat(this.targetAmount) - total);
  }

  renderDOM(list: any) {
    // let mainParent = document.getElementById('mainTree');

    let lastParent = 'mainTree';
    const lastNode = document.getElementById(lastParent).children[1];
    if (lastNode) {
      lastNode.remove();
    }
    let lastGrade = -1;
    for (var i = 0; i < list.length; i++) {
      list[i].amount = 0;

      if (list[i].grade === lastGrade) {
        const p = document.getElementById('independent' + (list[i].grade));
        const li = document.createElement('li');
        li.innerHTML = `
       
       <div class="row">
       <div class="col-md-11">
       <div class="row">
          
       <div class="col-md-6">
           <div class="form-group">
               
               <input type="text" readonly class="form-control pointer-none" value="${list[i].first_name + ' ' + list[i].last_name}"> 
           </div>
       </div>
       <div class="col-md-3">
       <div class="form-group">
           <input type="text"  style="padding-left:calc(2rem - ${(list[i].grade)}rem);" id="${list[i].id}" readonly id="role${list[i].id}" value="${list[i].user_role__name}" class="form-control" placeholder="Enter Target Amount" > 
       </div>
   </div>
       <div class="col-md-3">
           <div class="form-group">
               <input type="text"style="padding-left:calc(2rem + (${(list[i].grade)}rem - (${(list[i].grade)}rem / 2)));" id="${list[i].id}" readonly id="${list[i].id}" value="${list[i].target_amount}"  class="form-control" placeholder="Enter Target Amount" > 
           </div>
       </div>
   </div>
       </div>
           
       </div>
   
       `;
        //li.innerText = list[i].first_name + " " + list[i].last_name;
        p.append(li);
        document.getElementById(list[i].id).addEventListener('keyup', this.modelChanged);
      } else {

        const html = `<ul class="collapsed in" id=${'independent' + (list[i].grade)}>
       <li class="nested"> 
       <i class="indicator" (click)="setCollaps(${'parent' + (i + 1)})"></i>
       <div class="row">
       <div class="col-md-11">
       <div class="row">
          
       <div class="col-md-6">
           <div class="form-group">
               <input type="text"  readonly class="form-control pointer-none" value="${list[i].first_name + ' ' + list[i].last_name}"> 
           </div>
       </div>
       <div class="col-md-3">
       <div class="form-group">
           <input type="text" style="padding-left:calc(2rem - ${(list[i].grade)}rem);" id="${list[i].id}" readonly id="role${list[i].id}" value="${list[i].user_role__name}" class="form-control" placeholder="Enter Target Amount" > 
       </div>
   </div>
       <div class="col-md-3">
           <div class="form-group"> 
               <input type="text" style="padding-left:calc(2rem + (${(list[i].grade)}rem - (${(list[i].grade)}rem / 2)));" readonly id="${list[i].id}" value="${list[i].target_amount}"  class="form-control" placeholder="Enter Target Amount" > 
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
        const p = document.getElementById(lastParent);
        const tag = document.createElement('div');
        tag.innerHTML = html;
        p.append(tag);
        lastParent = 'parent' + (i + 1);
        lastGrade = list[i].grade;

        document.getElementById(list[i].id).addEventListener('keyup', this.modelChanged);
      }
    }
  }

  filterData() {

    // let list = this.treeList.filter(it => it.country_code === this.selectedCountry && it.branch_location__address === this.selectedBranch);
    // let list = this.copyList.filter(it => it.branch_location__address === this.selectedBranch[0].value);
    // this.treeList = list;
    let list = [];
    if (this.selectedBranch.length === 0) {
      list = this.copyList;
    } else {
      list = this.copyList.filter(it => {
        for (var i = 0; i < this.selectedBranch.length; i++) {
          if (it.branch_location__address === this.selectedBranch[i].value) {
            return true;
          }
        }

        return false;
      });
    }
    this.treeList = list;

    // this.renderDOM(list);
    // this.changeBranch(this.branchList[0]);
  }

  changeBranch(branch: any) {
    // this.selectedBranch = branch;
    console.log(this.selectedBranch);
    this.filterData();
  }

  changeCountry(value: any) {
    this.selectedCountry = value;
    this.changeBranch(this.selectedBranch);
  }

  toggleView(DOM: HTMLElement): void {
    
    if (DOM.classList.contains('inactive')) {
      DOM.classList.remove('inactive');
    } else {
      DOM.classList.add('inactive');
    }
  }

}
