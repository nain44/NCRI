import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../user/services/user.service';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.scss']
})
export class CommissionDetailComponent implements OnInit {

  tab: string = 'allUsers'
  userList: any = [];
  selectAll: boolean = false;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  responseText: string = "";
  loader: boolean = false;
  modalRef: BsModalRef;
  showApproveAll: boolean = false;
  paginationConfig = {
    size: 10,
    page: 1,
    filter_by: "ALL",
    count: 0,
    search_text: ""

  }
  lockScreen: boolean = false;
  requestLoader: any = false;
  selectedPageSize: any = 10;
  //set tab
  setTab(tab: string) {
    this.tab = tab;
    if(this.tab === "pendUsers"){
      this.paginationConfig.filter_by = "PENDING";
    }else{
      this.paginationConfig.filter_by = "ALL";
    }
    
    this.userList = [];
    this.paginationConfig.count = 0;
    this.getUserList();
  }

  changePageSize(){
    this.paginationConfig.size = parseInt(this.selectedPageSize);
    this.paginationConfig.page = 1;
    this.getUserList();
  }

  searchUser(){
    this.paginationConfig.page = 1;
    this.getUserList();
  }

  constructor(
    private modalService: BsModalService,
    private service: UserService,
    private commissionService: CommissionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.requestLoader = true;
    this.service.usersList(this.paginationConfig).subscribe((res) => {
      //debugger
      this.requestLoader = false;
      if (res.status === "success") {
        this.userList = res.data.qs;
        this.userList.map(it => {
          it.check = false;
          it.loader = false;
          it.cancelLoader = false;
        });
        
        this.paginationConfig.count = res.data.count;
        this.userList.map(it => it.cc_status === null ? it.cc_status = "a" : '')
        // this.userList = this.userList.filter(it => it.cc_status !== null)
        this.userList.sort((a, b) => b.cc_status ? b.cc_status.toLowerCase().localeCompare(a.cc_status.toLowerCase()) : "");
        // this.userList.sort((a,b) => (b.cc_status.toLowerCase() > a.cc_status.toLowerCase()) ? 1 : ((a.cc_status.toLowerCase() > b.cc_status.toLowerCase()) ? -1 : 0)); 

      }
    }, (error) => {
      this.requestLoader = false;
      //debugger
    })
  }

  selectAllUsers() {
    if (this.selectAll === true) {
      this.showApproveAll = true;
      this.userList.map(it => it.check = true)
    } else {
      this.userList.map(it => it.check = false);
      this.showApproveAll = false;
    }
  }

  checkSelectAll() {
    let check = this.userList.some(it => it.check === false);
    check === true ? this.selectAll = false : this.selectAll = true;

    let list = this.userList.filter(it => it.check === true);
    list.length > 1 ? this.showApproveAll = true : this.showApproveAll = false;
  }

  approveCommission(data?: any) {
    this.lockScreen = true;
    this.responseText = "";
    let obj = {
      ids: data
    }
    if (!data) {
      obj.ids = this.userList.filter(it => it.check === true).map(it => it.cc_id);
      this.loader = true;
    } else {
      data.loader = true;
      obj.ids = [data.cc_id];
    }
    
    this.commissionService.approveCommission(obj).subscribe((res) => {
      //debugger
      if (res.status === "success") {
        this.responseText = "Approved successfully.";
        this.getUserList();
      } else {
        this.responseText = res.code;
        
      }
      this.openModal();
      this.loader = false;
      data.loader = false;
      this.lockScreen = false;
    }, (error) => {
      //debugger
      this.lockScreen = false;
      this.loader = false;
      data.loader = false;
      this.responseText = "Sorry something went wrong, Try again later.";
    })
  }

  cancelCommission(data?:any) {
    this.lockScreen = true;
    this.responseText = "";
    let obj = {
      ids:data
    }
    if(!data){
      this.loader = true;
      obj.ids = this.userList.filter(it => it.check === true).map(it => it.cc_id);
    }else{
      obj.ids = [data.cc_id];
      data.cancelLoader = true;
    }
    this.commissionService.cancelCommission(obj).subscribe((res) => {
      //debugger
      if (res.status === "success") {
        this.responseText = "Cancelled successfully.";
      } else {
        this.responseText = res.code;
        
      }
      this.openModal();
      this.loader = false;
      data.cancelLoader = false;
      this.lockScreen = false;
    }, (error) => {
      //debugger
      this.lockScreen = false;
      data.cancelLoader = false;
      this.loader = false;
      this.responseText = "Sorry something went wrong, Try again later.";
    })
  }

  pageChanged(event:any){
    this.paginationConfig.page = event.page;
    this.getUserList();

  }

  openModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  nevigateToCommission(obj:any){
    this.router.navigate(['/commission'], { queryParams: { userID: obj.id } });
  }

  nevigateToEditCommission(obj:any){
    this.router.navigate(['/commission/edit-commission'], { queryParams: { userID: obj.id, cid:obj.cc_id } });
  }

  nevigateToView(obj:any){
    this.router.navigate(['/commission/edit-commission'], { queryParams: { userID: obj.id, cid:obj.cc_id,type:'view' } });
  }

}
